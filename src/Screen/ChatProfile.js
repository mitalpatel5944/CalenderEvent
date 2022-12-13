
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Pressable,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import firestore from "@react-native-firebase/firestore";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatProfile = props => {

    const [members, setmembers] = useState(props.route.params.data)
    const [usersDetail, setUserDetail] = useState(null)
    const [currentUser, setcurrentUser] = useState('')


    useEffect(() => {
        getcurrentUSer()
    }, [])



    async function getcurrentUSer() {
        AsyncStorage.getItem('user').then(async val => {
            setcurrentUser(val)

            firestore()
                .collection("USERS")
                .doc(val)
                .onSnapshot((querySnapshot) => {
                    console.log("aaaa0", querySnapshot.data());
                    setUserDetail(querySnapshot.data()?.data)
                })
        })

    }

    async function blackUserChange() {
        let am = usersDetail.blockUserList.concat(members)
        let params = {
            data: {
                ...usersDetail,
                blockUserList: am
            }

        }
        firestore()
            .collection("USERS")
            .doc(currentUser)
            .update(params)
            .then(() => console.log('Data updated.'))
            .catch(err => {
                console.log("error", err);
            })
    }

    function blockUser() {
        if (usersDetail.blockUserList.filter(e => e == members).length != 0) {
            alert('User is already blocked')
        } else {
            Alert.alert(
                "Alert",
                "Are you sure ?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => blackUserChange() }
                ]
            );
        }


    }

    function renderHeader() {
        return (
            <View style={styles.space}>
                <View style={styles.row}>
                    <Pressable onPress={() => props.navigation.pop()}>
                        <Ionicons name={"md-arrow-back"} color={"white"} size={30} />
                    </Pressable>
                    <Text style={styles.btntxtlabel}>{props.route.params?.data}</Text>
                </View>
            </View>
        );
    }

    function renderBody() {
        return (
            <TouchableOpacity
                onPress={() => {
                    blockUser()
                }}
                style={{ flexDirection: 'row', padding: 5, margin: 10, justifyContent: 'space-between', borderWidth: 1, borderColor: 'white' }}>
                <Text style={styles.btntxtlabel}>Block</Text>
                <Ionicons name={"information-circle-outline"} color={"white"} size={30} />

            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderBody()}
        </View>
    );
};

const styles = StyleSheet.create({
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

});

export default ChatProfile;
