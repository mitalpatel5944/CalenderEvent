/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function SelectCountry() {
  const [data, setData] = useState();
  const [active, setActive] = useState(false);
  const [list, setlist] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getTotal();
    getList();
  }, []);

  function getTotal() {
    setLoader(true)
    fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c4d1e38833msh119b9edb42ea937p1a6fb6jsn3896efb86de7",
        "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      },
      //   body: JSON.stringify({ country: "India" }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Res", res);
        setLoader(false)
        if (res.statusCode == 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        setLoader(false)
        console.log("err", err);
      });
  }

  function getList() {
    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=India`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c4d1e38833msh119b9edb42ea937p1a6fb6jsn3896efb86de7",
          "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        },
        //   body: JSON.stringify({ country: "India" }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Res===", res);
        if (res.statusCode == 200) {
          setlist(res.data?.covid19Stats);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#2C2778",
          padding: 10,
          paddingHorizontal: 30,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setActive(false);
          }}
        >
          <Fontisto
            name={"earth"}
            size={30}
            style={{ alignSelf: "center", padding: 10, color : !active ?   'white' :   "grey"  , }}
          />
          <Text
            style={{
                color : !active ?   'white' :   "grey" ,
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
            }}
          >
            Global
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActive(true);
          }}
        >
          <Entypo
            name={"location"}
            size={30}
            style={{ alignSelf: "center", padding: 10, color : active ?   'white' :   "grey" }}
          />
          <Text
            style={{
                color : active ?   'white' :   "grey" ,
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
            }}
          >
            India
          </Text>
        </TouchableOpacity>
      </View>

      { loader ?
      <ActivityIndicator color={'#2C2778'} size={'large'} />
      : active ? (
      
          <FlatList
            data={list}
            renderItem={({ item }) => {
              console.log("item", item);
              return (
                <View
                  style={{
                    backgroundColor: "#FFE6BE",
                    padding: 10,
                    paddingHorizontal: 10,
                    margin: 5,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Entypo
                      name={"location-pin"}
                      size={20}
                      style={{
                        alignSelf: "center",
                        padding: 10,
                        color: "#2C2778",
                      }}
                    />
                    <Text
                      style={{
                        color: "#2C2778",
                        fontSize: 18,
                        alignSelf: "center",
                      }}
                    >
                      {item?.keyId}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#FF983B",
                        padding: 10,
                        paddingHorizontal: 10,
                        width :'50%',
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          alignSelf: "center",
                        }}
                      >
                        Confirmed
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "white",
                          alignSelf: "center",
                        }}
                      >
                        {item?.confirmed}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#FF3B3C",
                        padding: 10,
                        paddingHorizontal: 10,
                        width :'50%',
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          alignSelf: "center",
                        }}
                      >
                        Deaths
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "white",
                          alignSelf: "center",
                        }}
                      >
                        {data?.deaths}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                    <MaterialIcons
                      name={"update"}
                      size={20}
                      style={{
                        alignSelf: "center",
                        padding: 10,
                        color: "black",
                      }}
                    />
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        alignSelf: "center",
                      }}
                    >
                      {moment(item?.lastUpdate).format("MMMM Do YYYY, h:mm:ss a")}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#FF983B",
                padding: 10,
                paddingHorizontal: 10,
                margin: 20,
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, alignSelf: "center" }}
              >
                Confirmed
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {data?.confirmed}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FF3B3C",
                padding: 10,
                paddingHorizontal: 10,
                margin: 20,
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, alignSelf: "center" }}
              >
                Deaths
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {data?.deaths}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#A150FF",
              padding: 10,
              paddingHorizontal: 30,
              margin: 20,
              width: "80%",
              borderRadius: 10,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={"clockcircle"}
              size={30}
              style={{ alignSelf: "center", padding: 10, color: "white" }}
            />
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                Last Checked
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                {moment(data?.lastChecked).format("MMMM Do YYYY, h:mm:ss a")}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#309AFE",
              padding: 10,
              paddingHorizontal: 30,
              margin: 20,
              width: "80%",
              borderRadius: 10,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <MaterialIcons
              name={"report"}
              size={30}
              style={{ alignSelf: "center", padding: 10, color: "white" }}
            />
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                Last Reported
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                {moment(data?.lastReported).format("MMMM Do YYYY, h:mm:ss a")}
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
