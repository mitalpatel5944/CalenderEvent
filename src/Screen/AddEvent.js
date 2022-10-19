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
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddEvent = (props) => {
  const [eventTitle, setEventTile] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
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

  const createEvent = () => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    RNCalendarEvents.saveEvent(eventTitle, {
      calendarId: "3",
      startDate: date.toISOString(),
      endDate: newDate.toISOString(),
      location: eventLocation,
    })
      .then((value) => {
        console.log("Event Id--->", value);
        alert("Event created");
        AsyncStorage.setItem("event", JSON.stringify(value));
        props.navigation.navigate("CalenderView");

        props.navigation.pop();
      })
      .catch((error) => {
        console.log(" Did Not work Threw an error --->", error);
      });

    // }).then((value) => {
    //   console.log('Event Id--->', value);
    // }).catch((error) => {
    //   console.log(' Did Not work Threw an error --->', error)
    // })
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

  // const storeData = async () => {
  //   try {

  //     const jsonValue = JSON.stringify(createEvent)
  //     await AsyncStorage.setItem('@storage_key',jsonValue )
  //     console.log("event save in asyncStorage", jsonValue);

  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     console.log('json value get', jsonValue)
  //     if (value !== null) {
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text style={styles.textInputtitle}> {props.route.params.time} </Text> */}

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
          >
            <Ionicons name="arrow-back" color="white" size={20} />
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
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 15,
              flexDirection: "row",
            }}
          >
            <TextInput
              style={styles.textInput}
              placeholder="22/09/2022"
              placeholderTextColor="white"
              value={dateValue}
              onChangeText={(value) => {
                setDateValue(value);
              }}

            />

            <FontAwesome name="calendar" size={25} color="#76A9FF" />
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
            <TextInput
              style={styles.textInput}
              placeholder="12:00 AM"
              placeholderTextColor="white"
              value={timeValue}
              onChangeText={(value) => {
                setTimeValue(value)
              }}
            />
          </View>
        </View>

        {/* <View style={styles.mainContainer}>
          <View style={styles.singleElement}>
            <View style={styles.dateInputContainer}>
              <TextInput value={dateValue} style={{color:'white'}} />

              <TouchableOpacity
                style={styles.dateIcon}
                onPress={() => setOpen(true)}>
                <Text style={{color:'white'}}> Select Date/Time </Text>
              </TouchableOpacity>

              <DatePicker

                placeholderTextColor="White"
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  var currentdate = new Date(date);
                  var datetime =
                    +currentdate.getDate() +
                    '/' +
                    (currentdate.getMonth() + 1) +
                    '/' +
                    currentdate.getFullYear() +
                    ' - ' +
                    currentdate.getHours() +
                    ':' +
                    currentdate.getMinutes();

                  setOpen(false);
                  setDate(date);
                  setdateValue(datetime.toString());
                }}
                minimumDate={new Date()}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
        </View> */}
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

    //     <View style={styles.container}>
    //       <ScrollView>
    //         <Text style={styles.textInputtitle}> {props.route.params.time} </Text>

    //         <View style={styles.mainContainer}>
    //           <View style={styles.singleElement}>
    //             <View style={styles.textInputContainer}>
    //               <TextInput
    //                 style={styles.textInput}
    //                 placeholder="Enter Event Title"
    //                 placeholderTextColor={'grey'}
    //                 value={eventTitle}
    //                 onChangeText={value => {
    //                   setEventTile(value);
    //                 }}
    //               />
    //             </View>
    //           </View>
    //         </View>

    //         <View style={styles.datepickerView}>

    //         </View>

    //         <View style={styles.datepickerView}>
    //           <Button title="Show Date Picker" onPress={showDatePicker} />
    //           <DateTimePickerModal
    //             isVisible={isDatePickerVisible}
    //             mode="date"
    //             onConfirm={handleConfirm}
    //             onCancel={hideDatePicker}
    //             value={dateValue}

    //           // onChange={date}
    //           />
    //         </View>

    //         <View style={styles.timepickerView}>

    //           <DatePicker
    //             mode="time"
    //             locale="en_GB" // Use "en_GB" here
    //             date={new Date()}
    //             onDateChange={(e) => {
    //               console.log("E : ", e);
    //             }}
    //             value={time}

    //           />
    //         </View>

    //         {/* <View style={styles.timepickerView}>
    //           <Button onPress={displayTimepicker} title="Your Time Picker" />
    //         </View>
    //         {isDisplayDate && (
    //           <DateTimePicker
    //             value={mytime}
    //             mode={displaymode}

    //             display="default"
    //             onChange={changeSelectedDate}
    //           />
    //         )} */}

    //         {/* <View style={styles.timepickerView}>

    //           <Button title="show time picker" onPress={showTimePicker} />

    //           <RNDateTimePicker

    //             isVisible={isTimePickerVisible}
    //             onConfirm={handleConfirmTime}
    //             onCancel={hideTimePicker}

    //             value={new Date()} mode="time" />

    //         </View>

    //  */}

    //         <TouchableOpacity
    //           style={{
    //             flex: 2,
    //             padding: 25,
    //             height: 72,
    //             justifyContent: 'center',
    //             alignSelf: 'center',
    //             backgroundColor: '#088F8F',
    //             borderRadius: 5
    //           }}
    //           onPress={() => { createEvent(setDate()), setTime() }}>
    //           <Text style={styles.textInputbtn}> Save Event </Text>
    //         </TouchableOpacity>
    //       </ScrollView>
    //     </View>
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
