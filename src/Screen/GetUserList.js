import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TabView, SceneMap } from "react-native-tab-view";

const GetUserList = (props) => {
  const [message, setMessages] = useState([]);

  const [currentUser, setcurrentUser] = useState("");

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getcurrentUSer();
      getmessages();
    });

    return unsubscribe;
  }, [props.navigation]);

  async function getcurrentUSer() {
    AsyncStorage.getItem("user").then((val) => {
      setcurrentUser(val);
    });
  }

  function getmessages() {
    const messagesListener = firestore()
      .collection("THREADS")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const messages = querySnapshot.docs.map((doc) => doc.data());
          console.log("querySnapshot===", messages, querySnapshot);
          setMessages(messages);
        }
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }

  async function Signout() {
    auth()
      .signOut()
      .then(async () => {
        console.log("User signed out!");
        AsyncStorage.removeItem("user");
        props.navigation.navigate("SelectApp");
      });
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Pressable
          style={styles.btn2}
          onPress={() => {
            Signout();
          }}
        >
          <Text style={styles.btntxtlabel}>LOGOUT</Text>
        </Pressable>
      </View>

      <FlatList
        data={message.sort((a, b) => a.createdAt - b.createdAt)}
        style={{ height: "auto", marginBottom: 100 }}
        ListEmptyComponent={() => (
          <Text style={styles.btntxtlabel}>No Messages!</Text>
        )}
        renderItem={({ item, index }) => {
          console.log("item", item);
          return (
            <View style={{ borderWidth: 1, margin: 10, padding: 10 }}>
              <Text style={{ color: "black" }}>{item?.messages}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btntxtlabel: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "black",
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btn2: {
    alignItems: "flex-end",
    borderRadius: 10,
  },
  btntxt: { color: "black", padding: 20, fontSize: 18, fontWeight: "bold" },
});

export default GetUserList;
