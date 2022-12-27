import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, useWindowDimensions, Pressable, FlatList, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TabView, SceneMap } from 'react-native-tab-view';



const GetUserList = (props) => {


    const [message, setMessages] = useState([])

    const [currentUser, setcurrentUser] = useState('')
    const [value, setvalue] = useState('')


    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getUserList()
            getcurrentUSer()
        });

        return unsubscribe;

    }, [props.navigation])



    async function getcurrentUSer() {
        AsyncStorage.getItem('user').then(val => {
            setcurrentUser(val)
        })
    }


    function getUserList() {

        const messagesListener = firestore()
            .collection("USERS")
            .onSnapshot((querySnapshot) => {
                if (querySnapshot) {
                    const messages = querySnapshot?.docs.map((doc) => doc.data());
                    console.log("querySnapshot", messages, querySnapshot);
                    setMessages(messages);
                }

            });

        return messagesListener;
    }


    async function Signout() {

        auth()
            .signOut()
            .then(async () => {
                console.log("User signed out!");
                AsyncStorage.removeItem('user')
                props.navigation.navigate('SelectApp')
            });
    }







    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>



                <AntDesign
                    name={'message1'}
                    style={{
                        color: 'black',
                        padding: 20
                    }}
                    size={30}
                    onPress={() => {

                    }}
                />
                <Pressable
                    style={styles.btn2}
                    onPress={() => {
                        Signout();
                    }}
                >
                    <AntDesign
                        name={'logout'}
                        style={{
                            color: 'black',
                            padding: 20
                        }}
                        size={30}
                    />
                </Pressable>

            </View>

            <TextInput
                value={value}
                onChangeText={(value) => {
                    setvalue(value)
                }}
                style={{
                    borderWidth: 1,
                    padding: 10, color: 'black', margin: 10
                }}
                placeholder={'Enter data to show in messager'}
                placeholderTextColor={'grey'}
            />




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
