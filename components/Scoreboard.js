import { Text, View, FlatList } from "react-native";
import styles from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { useFocusEffect } from "@react-navigation/native";

import moment from "moment";

const STORAGE_KEY = "@highscores";

const HighscoreList = ({ highscores }) => {
  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.scoreRow}>
        <Text style={styles.cell}>{highscores.indexOf(item) + 1}</Text>
        <Text style={styles.cell}>{item.player}</Text>
        <Text style={styles.cell}>
          {moment(item.date, "M/D/YYYY, h:mm:ss A").format("D.M.YYYY HH:mm")}
        </Text>
        <Text style={styles.cell}> {item.score}</Text>
      </View>
    </Card>
  );

  return (
    <FlatList
      data={highscores}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Rank</Text>
          <Text style={styles.headerCell}>Player</Text>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Score</Text>
        </View>
      )}
    />
  );
};

export default Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([]);

  const getScoreboard = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const highscores = JSON.parse(jsonValue).sort(
          (a, b) => b.score - a.score
        );
        setScoreboard(highscores);
      }
    } catch (e) {
      console.error("Failed to load highscores", e);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setScoreboard([]);
    } catch (e) {
      console.error("Failed to clear highscores", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getScoreboard();
    }, [])
  );

  useEffect(() => {
    getScoreboard();
  }, []);

  return (
    <>
      <Header />

      <View style={{ backgroundColor: "#FFF3E0" }}>
        <MaterialCommunityIcons
          name="clipboard-list"
          size={70}
          style={{
            color: "#E65100",
            textAlign: "center",
            marginBottom: -25,
            marginTop: 8,
          }}
        />
        <Text style={styles.rulesTitle}>Top 5</Text>
        {scoreboard.length === 0 ? (
          <Text style={styles.noScores}>No scores yet...</Text>
        ) : (
          <>
            <HighscoreList highscores={scoreboard.slice(0, 5)} />
            <Button title="Clear highscores" onPress={clearScoreboard} />
          </>
        )}
      </View>
      <Footer />
    </>
  );
};
