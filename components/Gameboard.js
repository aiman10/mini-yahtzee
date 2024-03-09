import { Pressable, Text, View } from "react-native";
import styles from "../style/style"; // Ensure this is used or remove if unnecessary
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  MIN_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
  MAX_NBR_OF_THROWS,
} from "../constants/Game";
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@highscores";

export default function Gameboard({ navigation, route }) {
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Throw dices");
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const diceCounts = [0, 0, 0, 0, 0, 0];
  const [selectedPointIndexes, setSelectedPointsIndexes] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  const [scores, setScores] = useState(Array(MAX_SPOT).fill(0));
  const [totalScore, setTotalScore] = useState(0);
  const [bonusAchieved, setBonusAchieved] = useState(false);
  const [highscoreSaved, setHighscoreSaved] = useState(false);
  const [totalAmountThrows, setTotalAmountThrows] = useState(0);
  const [bonusStatus, setBonusStatus] = useState(
    `You are ${BONUS_POINTS_LIMIT} points away from bonus`
  );

  useEffect(() => {
    if (route.params?.player) {
      setPlayerName(route.params.player);
    }
    if (nbrOfThrowsLeft === 3) {
      setStatus("Throw 3 times before setting points");
    }
    const allPointsSelected = selectedPointIndexes.every(Boolean);
    if (allPointsSelected || totalAmountThrows >= MAX_NBR_OF_THROWS) {
      setStatus("Game over. Restart to play again.");
      setGameEndStatus(true);
      setNbrOfThrowsLeft(0);
      const newHighscore = {
        player: playerName,
        score: totalScore,
        date: new Date().toLocaleString(),
      };
      storeHighscore(newHighscore);
    }
  }, [route.params, selectedPointIndexes, playerName, totalScore]);

  const storeHighscore = async (newHighscore) => {
    if (highscoreSaved) return;

    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const currentHighscores = jsonValue != null ? JSON.parse(jsonValue) : [];

      const updatedHighscores = [...currentHighscores, newHighscore];

      const updatedJsonValue = JSON.stringify(updatedHighscores);
      await AsyncStorage.setItem(STORAGE_KEY, updatedJsonValue);
      setHighscoreSaved(true);
      console.log("Highscore added successfully");
    } catch (e) {
      console.error("Failed to store highscore", e);
    }
  };

  const staticDices = (
    <View style={styles.staticDicesTopContainer}>
      <MaterialCommunityIcons
        name="dice-5"
        size={70}
        style={{ position: "absolute", top: -200, color: "#E65100" }}
      />
      <MaterialCommunityIcons
        name="dice-3"
        size={70}
        style={{
          position: "absolute",
          top: -170,
          left: 30,
          color: "#E65100",
        }}
      />
    </View>
  );

  const throwDices = () => {
    //disable throw dices button if game is over
    if (gameEndStatus) {
      setStatus("Game over. Restart to play again.");
      return;
    }
    if (nbrOfThrowsLeft > 0 && totalAmountThrows <= MAX_NBR_OF_THROWS) {
      const newDiceSpots = diceSpots.map((spot, index) =>
        selectedDices[index] ? spot : Math.floor(Math.random() * 6) + 1
      );
      setDiceSpots(newDiceSpots);
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setTotalAmountThrows(totalAmountThrows + 1);
      setStatus("Select dices to throw again");
    } else if (nbrOfThrowsLeft === 0) {
      setStatus("Select your points");
    } else {
      setStatus("No throws left");
    }
    if (totalAmountThrows >= 17) {
      setGameEndStatus(true);
      setStatus("Game over. Restart to play again.");
    }
  };

  const handleDiceSelection = (index) => {
    if (gameEndStatus) {
      setStatus("Game over. Restart to play again.");
      return;
    }
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      const newSelectedDices = selectedDices.map((selected, i) =>
        i === index ? !selected : selected
      );
      setSelectedDices(newSelectedDices);
    } else {
      setStatus("You have to throw dices first");
    }
  };

  handlePointSelection = (index) => {
    if (gameEndStatus) {
      setStatus("Game over. Restart to play again.");
      return;
    }
    if (nbrOfThrowsLeft > 0) {
      setStatus("Throw 3 times before setting points");
      return;
    }
    if (selectedPointIndexes[index]) {
      setStatus("You have already selected this point");
      return;
    }
    if (nbrOfThrowsLeft === 0) {
      console.log(gameEndStatus);
      setNbrOfThrowsLeft(3);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    if (!selectedPointIndexes[index]) {
      const spotValue = index + 1;
      const spotCount = diceSpots.filter((spot) => spot === spotValue).length;
      const points = spotValue * spotCount;

      let newScores = [...scores];
      newScores[index] = points;

      let newSelectedPointIndexes = [...selectedPointIndexes];
      newSelectedPointIndexes[index] = true;

      setScores(newScores);
      setSelectedPointsIndexes(newSelectedPointIndexes);

      updateTotalScore(newScores);
    }

    const spotValue = index + 1;
    const spotCount = diceSpots.filter((spot) => spot === spotValue).length;
    const points = spotValue * spotCount;

    let newScores = [...scores];
    newScores[index] = points;

    let newSelectedPointIndexes = [...selectedPointIndexes];
    newSelectedPointIndexes[index] = true;
    setBonusStatus(
      `You are ${BONUS_POINTS_LIMIT - totalScore} points away from bonus`
    );
    setScores(newScores);
    setSelectedPointsIndexes(newSelectedPointIndexes);
    updateTotalScore(newScores);
  };

  const updateTotalScore = (newScores) => {
    const newTotal = newScores.reduce((acc, curr) => acc + curr, 0);
    setTotalScore(newTotal);

    if (!bonusAchieved && newTotal >= BONUS_POINTS_LIMIT) {
      setTotalScore(newTotal + BONUS_POINTS);
      setBonusAchieved(true);
      setBonusStatus(`Bonus achieved! (${BONUS_POINTS}) points added`);
    }
  };
  const calculatePointsForNumber = (number) => {
    const count = diceSpots.filter((spot) => spot === number).length;
    return number * count;
  };

  const circleIconsRow = Array.from({ length: MAX_SPOT }, (_, index) => (
    <View key={index} style={{ alignItems: "center", marginHorizontal: 5 }}>
      {/* Use the scores state to display points */}
      <Text style={{ color: "black" }}>{scores[index]}</Text>
      <Pressable onPress={() => handlePointSelection(index)}>
        <MaterialCommunityIcons
          name={`numeric-${index + 1}-circle`}
          size={40}
          color={selectedPointIndexes[index] ? "black" : "#E65100"}
          style={{ marginTop: 5 }}
        />
      </Pressable>
    </View>
  ));

  const dicesRow = diceSpots.map((spot, index) => (
    <Col
      key={"dice" + index}
      style={{ flexDirection: "row", justifyContent: "center" }}>
      <Pressable onPress={() => handleDiceSelection(index)}>
        <MaterialCommunityIcons
          name={`dice-${spot}`}
          size={70}
          color={selectedDices[index] ? "black" : "#E65100"}
          style={styles.gameDices}
        />
      </Pressable>
    </Col>
  ));
  return (
    <>
      <Header />
      <View style={styles.container}>
        {nbrOfThrowsLeft === NBR_OF_THROWS && totalAmountThrows <= 0 ? (
          staticDices
        ) : (
          <>
            <Container fluid>
              <Row>{dicesRow}</Row>
            </Container>
          </>
        )}
        <Text style={{ marginBottom: 10, fontSize: 18 }}>
          Throws left: {nbrOfThrowsLeft}
        </Text>
        <Text style={{ marginBottom: 5, fontSize: 15 }}>{status}</Text>
        <Pressable style={styles.button} onPress={throwDices}>
          <Text style={styles.buttonText}>Throw Dices</Text>
        </Pressable>
        <Text style={{ marginBottom: 15, fontSize: 30 }}>
          Total: {totalScore}
        </Text>
        <Text style={{ marginBottom: 10 }}>{bonusStatus}</Text>

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginBottom: 20,
            }}>
            {circleIconsRow}
          </View>
        </View>
        <Text style={styles.playerName}>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  );
}
