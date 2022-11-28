
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Pressable,
    Text
} from 'react-native';
import firestore from "@react-native-firebase/firestore";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupDetail = props => {

    const [members, setmembers] = useState(props.route.params.data.members)
    const [currentUser, setcurrentUser] = useState('')


    useEffect(() => {
        getcurrentUSer()
    }, [])

    async function getcurrentUSer() {
        AsyncStorage.getItem('user').then(val => {
            setcurrentUser(val)
        })
    }

    async function removeUser(m) {


        let params = {
            ...props.route.params.data,
            members: m
        }

        console.log("item===", params);

        let data = firestore()
            .collection("GROUP")
            .doc(props.route.params.data?.createdAt + 'group')

        console.log("data", data);
        // .update(params)
        // .then(() => console.log('Data updated.'));
    }

    function renderHeader() {
        return (
            <View style={styles.space}>
                <View style={styles.row}>
                    <Pressable onPress={() => props.navigation.pop()}>
                        <Ionicons name={"md-arrow-back"} color={"white"} size={30} />
                    </Pressable>
                    <Text style={styles.btntxtlabel}>{props.route.params?.data.name}</Text>
                </View>
            </View>
        );
    }


    const remove = (item) => {
        console.log("item", item);
        if (props.route.params.data.adminEmail == currentUser) {
            if (members.length != 1) {
                const index = members.indexOf(item);

                const x = members.splice(index, 1);

                console.log("members", index, x, members);

                setmembers(x)
                removeUser(x)
            } else {
                alert('minimum 1 member required in group')
            }
        } else {
            alert('Only admin make these action!')
        }

    }

    function renderList() {
        return (
            <View>
                <Pressable

                    style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{props.route.params.data.adminEmail}</Text>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Admin</Text>
                </Pressable>

                <FlatList
                    data={members}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', alignSelf: 'center' }}>{item}</Text>
                                <Pressable onPress={() => {
                                    remove(item)
                                }}>
                                    <Ionicons name={"close-circle"} color={"white"} size={30} />
                                </Pressable>
                            </View>
                        )
                    }}
                />
            </View>

        );
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderList()}
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

export default GroupDetail;
