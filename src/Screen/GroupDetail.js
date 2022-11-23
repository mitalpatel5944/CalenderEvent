
import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Pressable,
    Text
} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";

const GroupDetail = props => {
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

    function renderList() {
        return (
            <View>
                <Pressable
                    onPress={() => {

                    }}
                    style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{props.route.params.data.adminEmail}</Text>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Admin</Text>
                </Pressable>

                <FlatList
                    data={props.route.params.data.members}
                    renderItem={({ item }) => {
                        return (
                            <View

                                style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', alignSelf: 'center' }}>{item}</Text>
                                <Pressable onPress={() => {
                                    alert('in progresss')
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
