import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";

const HomeScreen = (props) => {
  function Signout() {
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        props.navigation.navigate('SelectApp')
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.btntxtlabel}>Select User</Text>

      <Pressable
        style={styles.btn}
        onPress={() => {
          props.navigation.navigate("ChatScreen", { user: "USER 1" });
        }}
      >
        <Text style={styles.btntxt}>USER 1</Text>
      </Pressable>

      <Pressable
        style={styles.btn2}
        onPress={() => {
          props.navigation.navigate("ChatScreen", { user: "USER 2" })
        }}
      >
        <Text style={styles.btntxt}>USER 2</Text>
      </Pressable>

      <Pressable
        style={styles.btn2}
        onPress={() => {
          Signout();
        }}
      >
        <Text style={styles.btntxt}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  btntxtlabel: {
    color: "white",
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "white",
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btn2: {
    backgroundColor: "white",
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btntxt: { color: "black", padding: 20, fontSize: 18, fontWeight: "bold" },
});

export default HomeScreen;
