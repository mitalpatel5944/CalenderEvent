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
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import ImagePicker from 'react-native-image-crop-picker';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [groupList, setgroupList] = useState([]);
  const [message, setMessage] = useState([]);
  const [currentUser, setcurrentUser] = useState('')
  const [usersDetail, setUserDetail] = useState(null)
  const [backgroundColor, setgestureName] = useState('#000000')
  const thread = props.route.params.user;
  const scrollViewRef = useRef();
  const [swipeValue, setswipeValue] = useState('')

  useEffect(() => {
    getcurrentUSer()
    if (!props.route.params.group) {
      getmessages()

    } else {
      getmessagesGROUP()

    }
  }, []);


  async function getcurrentUSer() {
    AsyncStorage.getItem('user').then(val => {
      setcurrentUser(val)
      firestore()
        .collection("USERS")
        .doc(val)
        .onSnapshot((querySnapshot) => {
          setUserDetail(querySnapshot.data()?.data)
        })
    })
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
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 1000);
    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }

  function getmessagesGROUP() {
    const messagesListener = firestore()
      .collection("GROUP")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const messages = querySnapshot.docs.map((doc) => doc.data());
          let a = messages.find(e => e.name == props.route.params.data?.name)
          setgroupList(a?.chat);
        }
      });
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 1000);
    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }

  async function handleGroupSend(message) {

    let params = {
      ...props.route.params.data,
      chat: [...groupList, {
        createdAt: new Date().getTime(),
        email: currentUser,
        message: message
      }]
    }
    firestore()
      .collection("GROUP")
      .doc(props.route.params.data?.createdAt)
      .update(params)
      .then(() => console.log('Data updated.'))
      .catch(err => {
        console.log("error", err);
      })
    setMessage("")
  }

  async function handleSend(messages) {

    let t = new Date().getTime()
    let params = {
      messages,
      from: currentUser,
      to: props.route.params.user,
      createdAt: t,
      swipeText: swipeValue
    }
    firestore()
      .collection("THREADS")
      .doc(t.toString())
      .set(params)
      .then(() => console.log('message sent'))
      .catch(err => {
        console.log("error", err);
      })
    setMessage("");
    setswipeValue('')
  }

  function openImagePicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
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
        <Pressable onPress={() => {
          openImagePicker()

        }}
          style={{ alignSelf: 'center', paddingRight: 20 }}
        >
          <Entypo name={"attachment"} color={"white"} size={30}
          />
        </Pressable>

        <Pressable onPress={() => {
          if (!props.route.params.group) {
            props.navigation.navigate('ChatProfile', { data: props.route.params?.user })

          } else {
            props.navigation.navigate('GroupDetail', { data: props.route.params.data })
          }

        }}
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
      <View style={{ position: "absolute", bottom: 0, width: '100%' }}>

        {swipeValue.length != 0 && <View
          style={[styles.TextInput, { flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginLeft: 30, marginBottom: -15 }]}
        >
          <Text style={{ color: 'black' }}>{swipeValue}</Text>
          <Pressable onPress={() => setswipeValue('')}>
            <Ionicons name={"close"} color={"black"} size={30} />
          </Pressable>
        </View>}
        <View style={[styles.row]}>
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
      </View>
    );
  }

  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    setgestureName(gestureName)
    switch (gestureName) {
      case SWIPE_UP:
        setgestureName('red')

        break;
      case SWIPE_DOWN:
        setgestureName('green')

        break;
      case SWIPE_LEFT:
        setgestureName('blue')

        break;
      case SWIPE_RIGHT:
        setgestureName('yellow')

        break;
    }
  }

  function onSwipeLeft(gestureState) {
    console.log('You swiped left!');
    setswipeValue(gestureState)
  }

  function onSwipeRight(gestureState) {
    console.log('You swiped right!');
    setswipeValue(gestureState)

  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  function renderbody() {
    return (
      <FlatList
        data={messages.sort((a, b) => a.createdAt - b.createdAt)}
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
                item?.to == props.route.params?.user
                  ? styles.right
                  : styles.left
              }
            >
              <GestureRecognizer
                onSwipe={(direction, state) => onSwipe(direction, state)}
                onSwipeLeft={(state) => onSwipeLeft(item?.messages)}
                onSwipeRight={(state) => onSwipeRight(item?.messages)}
                config={config}

              >
                {item?.swipeText && <View style={{ backgroundColor: "grey", borderTopRightRadius: 5, borderTopLeftRadius: 5, padding: 5 }}>
                  <Text style={styles.btntxt2}>{item?.swipeText}</Text>
                </View>}
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={styles.btntxt}>{item?.messages}</Text>
                  <Text style={styles.smallTxt}>
                    {moment(item?.createdAt).format("hh:mm a")}
                  </Text>
                </View>
              </GestureRecognizer>
            </View>

          );
        }}
      />
    );
  }

  function renderGroupBody() {
    return (
      <FlatList
        data={groupList.sort((a, b) => a.createdAt - b.createdAt)}
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
                item?.email == currentUser
                  ? styles.right
                  : styles.left
              }
            >
              <GestureRecognizer
                onSwipe={(direction, state) => onSwipe(direction, state)}
                onSwipeLeft={(state) => onSwipeLeft(item?.message)}
                onSwipeRight={(state) => onSwipeRight(item?.message)}
                config={config}

              >
                <Text style={styles.user}>{item.email}</Text>

                {item?.swipeText && <View style={{ backgroundColor: "grey", borderTopRightRadius: 5, borderTopLeftRadius: 5, padding: 5 }}>
                  <Text style={styles.btntxt2}>{item?.swipeText}</Text>
                </View>}
                <View style={{ paddingHorizontal: 10 }}>

                  <Text style={styles.btntxt}>{item?.message}</Text>
                  <Text style={styles.smallTxt}>
                    {moment(item?.createdAt).format("hh:mm a")}
                  </Text>
                </View>
              </GestureRecognizer>


            </View>
          );
        }}
      />
    )
  }

  function renderBlock() {
    return (
      <Text style={styles.btntxtlabel}>USER BLOCKED</Text>

    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {!props.route.params.group ? renderbody() : renderGroupBody()}
      {usersDetail && usersDetail?.blockUserList.filter(e => e == props.route.params?.user).length == 0 ?
        renderTextInput() :
        renderBlock()}
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
    // padding: 2,
    margin: 5,
    // paddingHorizontal: 10,
  },
  right: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 2,
    margin: 5,
    // paddingHorizontal: 10,

  },
  TextInput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
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
  user: {
    color: 'purple',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  btn2: {
    backgroundColor: "white",
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btntxt: {
    color: "black", fontSize: 18,
    paddingHorizontal: 4,
    fontWeight: "bold"
  },
  btntxt2: {
    color: "black", fontSize: 16,
    paddingHorizontal: 4,
  },

});

export default ChatScreen;
