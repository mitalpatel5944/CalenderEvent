import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, useWindowDimensions, Pressable, FlatList } from "react-native";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TabView, SceneMap } from 'react-native-tab-view';




const GetUserList = (props) => {


    const [message, setMessages] = useState([])

    const [groups, setgroups] = useState([])

    const layout = useWindowDimensions();
    const [currentUser, setcurrentUser] = useState('')

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Chat' },
        { key: 'second', title: 'Groups' },
    ]);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getUserList()
            getGroups()
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


    function getGroups() {
        const messagesListener = firestore()
            .collection("GROUP")
            .onSnapshot((querySnapshot) => {
                if (querySnapshot) {
                    const messages = querySnapshot?.docs.map((doc) => doc.data());
                    console.log("getGroups", querySnapshot);

                    setgroups(messages);
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

    const FirstRoute = () => (

        <FlatList
            data={message.filter(e => e?.data?.email != currentUser)}
            ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: 'grey' }} />
            )}
            ListEmptyComponent={() => (<Text style={{ color: 'black', alignSelf: 'center' }}>No users Found!</Text>)}
            renderItem={({ item }) => {
                console.log("item", item);
                return (
                    <Pressable
                        onPress={() => {
                            props.navigation.navigate("ChatScreen", { user: item.data.email, group: false, data: item.data });
                        }}
                        style={{ padding: 10 }}>
                        <Text style={{ color: 'black' }}>{item.data.email}</Text>
                    </Pressable>
                )
            }}
        />

    );

    const SecondRoute = () => (
        <FlatList
            data={groups.filter(e => e.adminEmail == currentUser || e.members.includes(currentUser)) || []}
            ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: 'grey' }} />
            )}
            ListEmptyComponent={() => (<Text style={{ color: 'black', alignSelf: 'center' }}>No Groups Found!</Text>)}
            renderItem={({ item }) => {
                console.log("item", item);
                return (
                    <Pressable
                        onPress={() => {
                            props.navigation.navigate("ChatScreen", {
                                user: item.name, group: true,
                                data: item
                            });
                            // alert('working on that')
                        }}
                        style={{ padding: 10 }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>{item.name}</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>{item.members.length} - members</Text>
                    </Pressable>
                )
            }}
        />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });


    return (
        <View style={styles.container}>
            <Pressable
                style={styles.btn2}
                onPress={() => {
                    Signout();
                }}
            >
                <Text style={styles.btntxt}>Logout</Text>
            </Pressable>

            <Pressable
                style={{ flexDirection: 'row', alignSelf: 'flex-end' }} onPress={() => {
                    props.navigation.navigate('CreateGroup')

                }}>
                <MaterialIcons
                    name={'group-add'}
                    color={'darkblue'}
                    size={30}
                />
                <Text style={{ color: 'darkblue', alignSelf: 'center', paddingLeft: 10 }}>Create Group</Text>
            </Pressable>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
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
