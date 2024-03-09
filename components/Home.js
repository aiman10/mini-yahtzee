import {
  Pressable,
  Text,
  TextInput,
  View,
  Keyboard,
  Button,
} from "react-native";
import { useState } from "react";
import style from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  MIN_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
} from "../constants/Game";

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@player";

export default Home = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = () => {
    if (playerName.trim().length > 0) {
      setPlayerName(playerName.trim());
      setHasPlayerName(true);
      storePlayerName(playerName);
      Keyboard.dismiss();
    }
  };

  const storePlayerName = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log("Player name stored successfully");
    } catch (e) {
      console.error("Failed to store player name");
    }
  };

  return (
    <>
      <Header />

      <View style={style.container}>
        {!hasPlayerName ? (
          <>
            <TextInput
              style={style.textInput}
              onChangeText={setPlayerName}
              autoFocus={true}
              value={playerName}
              placeholder="Enter your name for scoreboard..."
              placeholderTextColor="#FF8A65"
            />

            <Pressable style={style.button} onPress={handlePlayerName}>
              <Text style={style.buttonText}>OK </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={style.rulesTitle}>Rules of the game...</Text>
            <Text style={style.gameinfo} multiline="true">
              THE GAME: Upper section of the classic Yahtzee dice game. You have{" "}
              {NBR_OF_DICES} dices and for the every dice you have{" "}
              {NBR_OF_THROWS}
              throws. After each throw you can keep dices in order to get same
              dice spot counts as many as possible. In the end of the turn you
              must select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends
              when all points have been selected. The order for selecting those
              is free.
            </Text>
            <Text style={style.gameinfo} multiline="true">
              POINTS: After each turn game calculates the sum for the dices you
              selected. Only the dices having the same spot count are
              calculated. Inside the game you can not select same points from
              {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text
              style={[style.gameinfo, { marginBottom: -10 }]}
              multiline={true}>
              GOAL: To get points as much as possible.
              {BONUS_POINTS_LIMIT} points is the limit of getting bonus which
              gives you {BONUS_POINTS}
              points more.
            </Text>
            <Text style={style.rulesTitle} multiline="true">
              Good Luck, {playerName}!
            </Text>
            <Pressable
              style={style.button}
              onPress={() =>
                navigation.navigate("Gameboard", { player: playerName })
              }>
              <Text style={style.buttonText}>PLAY</Text>
            </Pressable>
          </>
        )}
      </View>
      <Footer />
    </>
  );
};
