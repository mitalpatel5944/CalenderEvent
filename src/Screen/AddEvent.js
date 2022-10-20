import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import RNCalendarEvents from "react-native-calendar-events";
import DatePicker from "react-native-date-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddEvent = (props) => {
  const [eventTitle, setEventTile] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [dateValue, setDateValue] = React.useState("");
  const [timeValue, setTimeValue] = useState("");

  //Execute when component is loaded
  React.useEffect(() => {
    RNCalendarEvents.requestPermissions()
      .then((res) => {
        console.log("Premission Response", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createEvent = async() => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    RNCalendarEvents.saveEvent(eventTitle, {
      calendarId: "1",
      startDate: date.toISOString(),
      endDate: newDate.toISOString(),
      location: eventLocation,
      eventTitle: eventTitle,
    })
      .then(async(value) => {
        console.log("Event Id--->", value);
        alert("Event created");
        await AsyncStorage.setItem("event", eventTitle);
        props.navigation.pop();
      })
      .catch((error) => {
        console.log(" Did Not work Threw an error --->", error);
      });
  };

  const fetchEvent = (eventId) => {
    RNCalendarEvents.findEventById(eventId).then((data) => {
      console.log("Event Data-->", data);
    });
  };

  const deletEvent = (eventId) => {
    RNCalendarEvents.removeEvent(eventId).then((val) => {
      console.log(val); //returns true if event is delted
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              height: 48,
              width: 48,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#3C3844",
              borderRadius: 50,
            }}
            onPress={() => props.navigation.goBack()}
          >
            <Ionicons name="arrow-back" color="white" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.singleElement}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Event Title"
                placeholderTextColor="white"
                value={eventTitle}
                onChangeText={(value) => {
                  setEventTile(value);
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
            Select date and time
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: "91%",
              backgroundColor: "black",
              height: 80,
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 15,
              flexDirection: "row",
            }}
          >
            {/* <TextInput
              style={styles.textInput}
              placeholder="22/09/2022"
              placeholderTextColor="white"
              value={dateValue}
              onChangeText={(value) => {
                setDateValue(value);
              }}
            /> */}
            <DatePicker
              placeholder="Select Date"
              mode="date"
              placeholderTextColor="red"
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                var currentdate = new Date(date);
                var datetime =
                  +currentdate.getDate() +
                  "/" +
                  (currentdate.getMonth() + 1) +
                  "/" +
                  currentdate.getFullYear();
                setOpen(false);
                setDate(date);
                setDateValue(datetime.toString());
              }}
              minimumDate={new Date()}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{ marginLeft: 300 }}
            >
              <Feather name="calendar" size={30} color="#76A9FF" />
            </TouchableOpacity>
          </View>
          <View style={{ position: "absolute", left: 30 }}>
            <TextInput
              style={styles.textInput}
              value={dateValue ? dateValue : "Select Date"}
              onChangeText={(value) => setDateValue(value)}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: "91%",
              backgroundColor: "black",
              height: 80,
              justifyContent: "space-evenly",
              paddingHorizontal: 20,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "#7A7585", fontSize: 14, fontWeight: "500" }}>
              Time
            </Text>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              onPress={() => setOpen1(true)}
            >
              <Ionicons name="time-outline" size={30} color="#76A9FF" />
            </TouchableOpacity>
            <DatePicker
              placeholder="Select Time"
              modal
              mode="time"
              open={open1}
              date={date}
              onConfirm={(time) => {
                var currentdate = new Date(time);
                var Time = currentdate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                setOpen1(false);
                setDate(time);
                setTimeValue(Time.toString());
              }}
              onCancel={() => {
                setOpen1(false);
              }}
            />
            <View style={{ position: "absolute", top: 30, left: 10 }}>
              <TextInput
                style={styles.textInput}
                value={timeValue ? timeValue : "Select Time"}
                onChangeText={(value) => {
                  setTimeValue(value);
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              height: 56,
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#76A9FF",
              borderRadius: 10,
            }}
            onPress={() => createEvent()}
          >
            <Text style={{ color: "black", fontWeight: "700", fontSize: 24 }}>
              {" "}
              Apply{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  timepickerView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  datepickerView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "#2A2731",
  },
  textInputtitle: {
    color: "#0096FF",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  textInput: {
    color: "white",
    fontSize: 20,
  },
  textInputbtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 100,
    paddingHorizontal: 20,
  },

  singleElement: {
    display: "flex",
    flex: 4,
    flexDirection: "column",
  },

  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    backgroundColor: "black",
    borderRadius: 15,
    marginBottom: 1,
  },

  dateInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 15,
    marginBottom: 1,
    margin: 2,
  },

  dateIcon: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddEvent;
