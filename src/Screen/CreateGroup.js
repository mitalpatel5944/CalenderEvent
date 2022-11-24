import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons'

import firestore from "@react-native-firebase/firestore";
import GetUserList from "./GetUserList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateGroup = (props) => {
    const [message, setMessages] = useState([])
    const [currentUser, setcurrentUser] = useState('')

    const [groupName, setgroupName] = useState('')

    const [selected, setSelected] = useState([])

    useEffect(() => {
        GetUserList()
        getcurrentUSer()
    }, [])

    function GetUserList() {
        const messagesListener = firestore()
            .collection("USERS")
            .onSnapshot((querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => doc.data().data);
                console.log("querySnapshot", messages);

                setMessages(messages);
            });

        return messagesListener;
    }

    function validate() {
        if (groupName.length == 0) {
            alert('Enter group name')
        } else if (selected.length <= 1) {
            alert('At least 2 group member required!')
        } else {
            addGroup()
        }
    }


    async function getcurrentUSer() {
        AsyncStorage.getItem('user').then(val => {
            setcurrentUser(val)
        })
    }

    async function addGroup() {

        // firestore().collection("GROUP").add({
        //     adminEmail: currentUser,
        //     createdAt: new Date().getTime(),
        //     members: selected,
        //     name: groupName,
        //     chat: []
        // });

        await firestore()
            .collection("GROUP")
            .doc(new Date().getTime() + 'group')
            .set(
                {
                    adminEmail: currentUser,
                    createdAt: new Date().getTime(),
                    members: selected,
                    name: groupName,
                    chat: []
                },
                { merge: true }
            );
        props.navigation.pop()
        alert('Group has been created!')


    }


    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                paddingRight: 10, paddingLeft: 10, justifyContent: 'space-between'
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <Pressable
                        style={styles.btn2}
                        onPress={() => {
                            props.navigation.pop()
                        }}
                    >
                        <Ionicons
                            name="chevron-back-outline"

                            size={30}
                        />
                    </Pressable>
                    <Text style={styles.btntxtlabel}>Create Group</Text>
                </View>
                <Pressable
                    onPress={() => {
                        validate()
                    }}
                    style={{ alignSelf: 'center', flexDirection: 'row' }}>

                    <Text style={styles.btntxtlabel2}>Done</Text>
                    <Pressable
                        style={styles.btn2}

                    >
                        <Ionicons
                            name="checkmark-sharp"
                            color={'green'}
                            size={30}
                        />
                    </Pressable>
                </Pressable>
            </View>

            <Text style={styles.btntxtlabel}>Group Name</Text>


            <TextInput
                style={styles.TextInput}
                placeholder={"Enter Group Name"}
                placeholderTextColor={"black"}
                value={groupName}
                onChangeText={(val) => {
                    setgroupName(val)
                }}
            />

            <Text style={styles.btntxtlabel}>Select Group member</Text>

            <FlatList
                data={message.filter(e => e?.email != currentUser)}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: 'grey' }} />
                )}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() => {
                                if (selected.includes(item.email)) {
                                    let data = selected
                                    data = data.filter(res => res != item.email)
                                    setSelected(data)


                                } else {
                                    setSelected([...selected, item?.email])

                                }
                            }}
                            style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', alignSelf: 'center' }}>{item.email}</Text>

                            {selected.includes(item.email) && <Ionicons
                                name="checkmark-sharp"
                                color={'green'}
                                size={20}
                            />}
                        </Pressable>

                    )
                }}
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
        fontSize: 18,
        fontWeight: "bold",
        // textAlign: 'center',
        alignSelf: "center",
    },
    btntxtlabel2: {
        color: "green",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: "center",
    },
    btn: {
        backgroundColor: "black",
        marginHorizontal: 30,
        alignItems: "center",
        borderRadius: 10,
    },
    TextInput: {
        backgroundColor: "white",
        color: "black",
        padding: 10,
        borderRadius: 0,
        borderWidth: 1,
        margin: 10,
        fontSize: 20,
    },
    btn2: {
        alignItems: "flex-end",
        borderRadius: 10,
        padding: 10
    },
    btntxt: { color: "black", padding: 20, fontSize: 18, fontWeight: "bold" },
});

export default CreateGroup;
