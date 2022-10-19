import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import { Agenda } from "react-native-calendars";
import RNCalendarEvents from "react-native-calendar-events";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NativeBaseProvider, VStack, Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const timeToString = time => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

const CalenderView = (props) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  //   const [items, setItems] = React.useState({});

  //   const [dateSelected, setdateSelected] = React.useState(
  //     moment().format('YYYY-MM-DD'),
  //   );

  //   useEffect(() => {
  //     props.props.navigation.addListener('focus', () => {
  //       fetchEvent();
  //     });
  //     fetchEvent();
  //   }, []);

  // function fetchEvent() {
  //   RNCalendarEvents.fetchAllEvents().then(data => {
  //     console.log('Event Data-->here', data);
  //     const newItems = {};
  //     data.forEach(key => {
  //       let datehere = timeToString(key?.endDate);
  //       console.log("key value ", key)
  //       let item = [];
  //       if (newItems[datehere] == undefined) {
  //         item = [
  //           {
  //             name: key?.title,
  //             title: key?.endDate,
  //             day: timeToString(key?.endDate),
  //           },
  //         ];
  //       } else {
  //         item = newItems[datehere].concat([
  //           {
  //             name: key?.title,
  //             title: key?.endDate,
  //             day: timeToString(key?.endDate),
  //           },
  //         ]);
  //       }
  //       newItems[datehere] = item;
  //     });

  //     console.log('newItems', newItems);
  //     setItems(newItems);
  //   });
  // }

  // const loadItems = day => {
  //   // setTimeout(() => {
  //     fetchEvent();
  //   // }, 1000);
  // };

  // const renderItem = item => {
  //   return (
  //     <TouchableOpacity style={styles.item}>
  //       <View>
  //         <Text style={{color: 'black'}}>{item.day}</Text>
  //         <Text style={{color: 'black'}}>{item.name}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const _renderEmptyDate = (date) => {
  //   return <View style={{height:20, width:'100%', justifyContent:'center', alignItems:'center'}}>
  //     <Text>No event</Text>

  //   </View>
  // };
  useEffect(() => {
    AsyncStorage.getItem("event").then((data) => {
      console.log("data", data);
      setData(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Pressable
        onPress={() => {
          props.props.navigation.navigate('AddEvent', {time: dateSelected});
        }}
        style={styles.btn}>
       <AntDesign name="plus" size={15} color="black" />
      </Pressable>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={dateSelected}
        refreshControl={null}
        showClosingKnob={true}
        scrollEnabled
        dayLoading={true}
        refreshing={false}
        renderItem={renderItem}
        renderEmptyData={_renderEmptyDate}
        markingType={'custom'}
        onDayPress={day => {
          setdateSelected(day?.dateString);
        }}
      /> */}
      <StatusBar />

      <View style={styles.headerView}>
        <Text style={{ fontWeight: "700", fontSize: 24, color: "#9590A0" }}>
          Calender Event
        </Text>
        <VStack space={2} alignItems="center">
          <Avatar
            bg="lightBlue.400"
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
            size="md"
          >
            NB
            <Avatar.Badge bg="green.500" />
          </Avatar>
        </VStack>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            width: 60,
            borderWidth: 1,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("AddEvent")}
        >
          <AntDesign name="pluscircleo" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.calenderView}>
        <Text style={{ color: "white" }}>Calender</Text>
      </View>

      {/* <View style={styles.eventView}>
        <Text style={{ color: "#9590A0", fontWeight: "500", fontSize: 16 }}>
          8:30 AM
        </Text>

        <Text style={{ color: "white", fontSize: 24, fontFamily: "500" }}>
          Take Ellie for walk
        </Text>
      </View>

      <View style={styles.eventView}>
        <Text style={{ color: "#9590A0", fontWeight: "500", fontSize: 16 }}>
          8:30 AM
        </Text>

        <Text style={{ color: "white", fontSize: 24, fontFamily: "500" }}>
          Take Ellie for walk
        </Text>
      </View> */}
{/* {data} */}
      {
        data?.map((item, index) => {
          return (
            <View key={index} style={styles.eventView}>
              <Text style={{ color: "#9590A0", fontWeight: "500", fontSize: 16 }}>
                {item?.time}
              </Text>

              <Text style={{ color: "white", fontSize: 24, fontFamily: "500" }}>
                {item?.title}
              </Text>
            </View>
          );
        })
      }

    </View>
  );
};

const styles = StyleSheet.create({
  eventView: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  calenderView: {
    width: "92%",
    height: 316,
    backgroundColor: "#000000",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#2A2731",
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "skyblue",
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 5,
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <CalenderView />
    </NativeBaseProvider>
  );
};
