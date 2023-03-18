import { StyleSheet } from "react-native";

export default StyleSheet.create({
  welcomecontainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputBox: {
    height: 40,
    width: "80%",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginTop: "5%",
  },
  btn: {
    height: 40,
    width: "80%",
    backgroundColor: "#fb5b5a",
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 40,
  },
  btnText: {
    textAlign: "center",
    color: "white",
  },
  headerContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignItems: "flex-end",
    marginRight: 16,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
  },
  appcontainer: {
    backgroundColor: "white",
    height: "100%",
  },
  singlecontainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    marginTop: 10,
  },
  singlecontainerContent: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  singlecontainerRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  btnDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
    height: 40,
    width: "80%",
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 40,
  },
  signupText: {
    textAlign: "center",
    color: "black",
  },
});
