import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const SelectApp = (props) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          props.navigation.navigate("Login");
        }}
      >
        <Text style={styles.btntxt}>Chat App</Text>
      </Pressable>

      <Pressable
        style={styles.btn2}
        onPress={() => {
          props.navigation.navigate("CalendarScreen");
        }}
      >
        <Text style={styles.btntxt}>Calender Event App</Text>
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

export default SelectApp;
