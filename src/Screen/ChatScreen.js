import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [currentUser, setcurrentUser] = useState('')
  const thread = props.route.params.user;
  const scrollViewRef = useRef();

  useEffect(() => {
    getcurrentUSer()
    getmessages()
  }, []);


  async function getcurrentUSer() {
    AsyncStorage.getItem('user').then(val => {
      setcurrentUser(val)
    })
  }

  // if
  //         request.time < timestamp.date(2022, 11, 29);

  function getmessages() {
    const messagesListener = firestore()
      .collection("THREADS")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const messages = querySnapshot.docs.map((doc) => doc.data().data);
          console.log("querySnapshot===", messages, querySnapshot);
          setMessages(messages);
        }

      });
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 1000);
    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }

  async function handleGroupSend() {
    // console.log("item", props.route.params.data);
    let params = {
      ...props.route.params.data,
      chat: [{
        createdAt: new Date().getTime(),
        email: "m123@yopmail.com",
        message: 'hi'
      }]
    }
    console.log("params", params);
    firestore()
      .collection("GROUP")
      .doc(props.route.params.data?.createdAt)
      .update(params)
      .then(() => console.log('Data updated.'))
      .catch(err => {
        console.log("error", err);
      })
  }

  async function handleSend(messages) {
    firestore().collection("THREADS").doc(thread).collection("MESSAGES").add({
      messages,
      createdAt: new Date().getTime(),
      from: currentUser,
      to: props.route.params.user
    });

    await firestore()
      .collection("THREADS")
      .doc(thread?._id)
      .set(
        {
          data: {
            messages,
            from: currentUser,
            to: props.route.params.user,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );

    setMessage("");
  }

  function renderHeader() {
    return (
      <View style={styles.space}>
        <View style={styles.row}>
          <Pressable onPress={() => props.navigation.pop()}>
            <Ionicons name={"md-arrow-back"} color={"white"} size={30} />
          </Pressable>
          <Text style={styles.btntxtlabel}>{props.route.params?.user}</Text>
        </View>
        <Pressable onPress={() => props.navigation.navigate('GroupDetail', { data: props.route.params.data })}
          style={{ alignSelf: 'center', paddingRight: 20 }}
        >
          <Ionicons name={"information-circle"} color={"white"} size={30}
          />
        </Pressable>
      </View>
    );
  }

  function renderTextInput() {
    return (
      <View style={[styles.row, { position: "absolute", bottom: 0 }]}>
        <TextInput
          value={message}
          style={styles.TextInput}
          onChangeText={(val) => {
            setMessage(val);
          }}
        />
        <Pressable
          onPress={() => {
            if (message.length != 0) {
              console.log("props.route.params.data.group", props.route);
              if (!props.route.params.group) {
                handleSend(message);
              } else {
                handleGroupSend(message)
              }
            }
          }}
          style={{ padding: 15 }}
        >
          <MaterialIcons name={"send"} color={"white"} size={40} />
        </Pressable>
      </View>
    );
  }

  function renderbody() {
    return (
      <FlatList
        data={messages.filter(e => e.to == thread).sort((a, b) => a.createdAt - b.createdAt)}
        ref={scrollViewRef}
        automaticallyAdjustKeyboardInsets
        style={{ height: "auto", marginBottom: 100 }}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        ListEmptyComponent={() => (
          <Text style={styles.btntxtlabel}>No Messages!</Text>
        )}
        renderItem={({ item, index }) => {
          console.log("item", item);
          return (
            <View
              style={
                item?.user == props.route.params?.user
                  ? styles.right
                  : styles.left
              }
            >
              <Text style={styles.btntxt}>{item?.messages}</Text>
              <Text style={styles.smallTxt}>
                {moment(item?.createdAt).format("hh:mm a")}
              </Text>
            </View>
          );
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderbody()}
      {renderTextInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
  },
  space: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  smallTxt: {
    color: "black",
    fontSize: 12,
    alignSelf: "flex-end",
  },
  left: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
    margin: 5,
    paddingHorizontal: 10,
  },
  right: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
    margin: 5,
    paddingHorizontal: 10,
  },
  TextInput: {
    backgroundColor: "white",
    color: "black",
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    width: "85%",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  btntxtlabel: {
    color: "white",
    paddingLeft: 20,
    fontSize: 18,
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
  btntxt: { color: "black", padding: 10, fontSize: 18, fontWeight: "bold" },
});

export default ChatScreen;
