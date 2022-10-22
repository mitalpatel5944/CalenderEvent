import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NativeBaseProvider, VStack, Avatar } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalenderView = (props) => {
  let [Data, setData] = useState([]);

  useEffect(() => {
    getListdate(moment().format("DD/MM/YYYY"));
  }, []);

  async function getListdate(date) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let finalData = [];
      keys.map((e) => {
        AsyncStorage.getItem(e).then((response) => {
          console.log("response", response);

          if (response) {
            let res = JSON.parse(response);

            if (res.date === date) {
              finalData = finalData.concat([res]);
              setData(finalData);
            }
          }
        });
        if(finalData.length == 0){
          setData([]);
        }
        // .catch((err) => {
        //   console.log("erer", err);
        // });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
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
            onPress={() => props.props.navigation.navigate("AddEvent")}
          >
            <AntDesign name="pluscircleo" color="white" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.calenderView}>
          <Calendar
            style={{
              borderColor: "gray",

              borderRadius: 20,
            }}
            theme={{
              backgroundColor: "#000000",
              calendarBackground: "#000000",
              textSectionTitleColor: "#b6c1cd",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "orange",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "#ffffff",
              indicatorColor: "#ffffff",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            onDayPress={(day) => {
              console.log("selected day", day);
              getListdate(moment(day?.dateString).format("DD/MM/YYYY"));
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {
              console.log("selected day", day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"yyyy MM"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={true}
            // Disable right arrow. Default = false
            disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={(date) => {
              /*Return JSX*/
            }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </View>

        <FlatList
          data={Data}
          renderItem={({ item, index }) => {
            // console.log("item", item);
            return (
              <View style={styles.eventView}>
                <Text
                  style={{ color: "#9590A0", fontWeight: "500", fontSize: 16 }}
                >
                  {item?.time}
                </Text>

                <Text
                  style={{ color: "white", fontSize: 24, fontWeight: "500" }}
                >
                  {item?.event}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </NativeBaseProvider>
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
    // alignItems: "center",
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

export default CalenderView;
