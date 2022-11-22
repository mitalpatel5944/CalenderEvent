import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const [payload, setPayload] = useState({
    email: "",
    pswd: "",
  });

  const [loading, setloading] = useState(false);

  async function oldLoginCall() {
    auth()
      .signInWithEmailAndPassword(payload.email, payload.pswd)
      .then(async (response) => {
        setloading(false);
        console.log("User account signed in!", response);
        if (!response?.additionalUserInfo?.isNewUser) {
          AsyncStorage.setItem('user', payload.email)
          props.navigation.navigate("GetUserList");
        } else {
          alert("Something Went Wrong!");
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          // loginCall();
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.log(error);
      });
  }

  async function addUser() {
    firestore().collection("USERS").doc().collection("INFO").add({
      email: payload.email,
      createdAt: new Date().getTime()
    });

    await firestore()
      .collection("USERS")
      .doc()
      .set(
        {
          data: {
            email: payload.email,
            createdAt: new Date().getTime()
          },
        },
        { merge: true }
      );

  }

  async function loginCall() {
    if (payload.email.length == 0 || payload.pswd.length == 0) {
      return alert("Please fill all the detail!");
    }
    setloading(true);
    auth()
      .createUserWithEmailAndPassword(payload.email, payload.pswd)
      .then(async (response) => {
        setloading(false);
        console.log("User account created & signed in!", response);
        if (response?.additionalUserInfo?.isNewUser) {
          alert("New user Register Successfully!");
          addUser()
          AsyncStorage.setItem('user', payload.email)
          props.navigation.navigate("GetUserList");
        } else {
          alert("Something Went Wrong!");
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          oldLoginCall();
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.btntxtlabel}>Chat App</Text>

      <TextInput
        style={styles.TextInput}
        placeholder={"Enter Email"}
        placeholderTextColor={"black"}
        value={payload?.email}
        onChangeText={(val) => {
          setPayload({
            ...payload,
            email: val,
          });
        }}
      />

      <TextInput
        style={styles.TextInput}
        placeholder={"Enter Password"}
        secureTextEntry={true}
        placeholderTextColor={"black"}
        value={payload?.pswd}
        onChangeText={(val) => {
          setPayload({
            ...payload,
            pswd: val,
          });
        }}
      />

      {loading ? (
        <ActivityIndicator size={"large"} color={"white"} />
      ) : (
        <Pressable
          style={styles.btn}
          onPress={() => {
            loginCall();
          }}
        >
          <Text style={styles.btntxt}>Login</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  TextInput: {
    backgroundColor: "white",
    color: "black",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "white",
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  btn2: {
    backgroundColor: "white",
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btntxt: { color: "black", padding: 20, fontSize: 18, fontWeight: "bold" },
  btntxtlabel: {
    color: "white",
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Login;
