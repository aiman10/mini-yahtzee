import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  header: {
    backgroundColor: "#FFA726",
    flexDirection: "row",
    borderColor: "#DD6E42",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: "#FFA726",
    flexDirection: "row",
    borderColor: "#DD6E42",
    borderWidth: 2,
  },
  title: {
    color: "#FFF3E0",
    fontWeight: "bold",
    flex: 1,
    fontSize: 23,
    textAlign: "center",
    margin: 10,
  },
  author: {
    color: "#5D4037",
    fontWeight: "bold",
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  gameboard: {
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },
  gameinfo: {
    color: "#5D4037",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
    marginHorizontal: 20,
    backgroundColor: "#FFF3E0",
    padding: 10,
    borderRadius: 5,
  },

  noScores: {
    color: "#5D4037",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
    marginHorizontal: 20,
    backgroundColor: "#FFF3E0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 403,
  },
  rulesTitle: {
    color: "#FF6F00",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    marginTop: 20,
  },
  row: {
    marginTop: 20,
    padding: 10,
    borderColor: "#FFB74D",
    borderWidth: 1,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    marginTop: 15,
    marginBottom: 30,
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FB8C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#EF6C00",
    borderWidth: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FFB74D",
    backgroundColor: "#FFF3E0",
    color: "#FF6F00",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  staticDicesTopContainer: {
    justifyContent: "center",
    marginTop: 220,
    marginLeft: -100,
    marginBottom: -80,
  },
  gameDices: {
    marginHorizontal: -10,
    marginBottom: 25,
    marginTop: 25,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  text: {
    textAlign: "center",
    fontWeight: "200",
  },
  row: {
    height: 28,
    backgroundColor: "#E7E6E1",
  },

  cardContainer: {
    padding: 0,
    margin: 0,
    borderWidth: 0, // Remove card border
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: "gray", // Add border to each row
  },
  cell: {
    fontSize: 18,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "lightgray", // Different background for header
  },
  headerCell: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  scoreHeaderCell: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
});
