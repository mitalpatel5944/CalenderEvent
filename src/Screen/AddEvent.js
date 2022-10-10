import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import DatePicker from 'react-native-date-picker';

const AddEvent = props => {
  const [eventTitle, setEventTile] = React.useState('');
  const [eventLocation, setEventLocation] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dateValue, setdateValue] = React.useState(props.route.params.time);
  console.log('dateValue', dateValue);
  //Execute when component is loaded
  React.useEffect(() => {
    RNCalendarEvents.requestPermissions()
      .then(res => {
        console.log('Premission Response', res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const createEvent = () => {
    const newDate = new Date(dateValue);
    newDate.setHours(newDate.getHours() + 2);
console.log("newDate",newDate);
    RNCalendarEvents.saveEvent(eventTitle, {
      calendarId: props.route.time,
      startDate: date.toISOString(),
      endDate: newDate.toISOString(),
      location: dateValue,
    })
      .then(value => {
        console.log('Event Id--->', value);
        alert('Event created');
        props.navigation.pop();
      })
      .catch(error => {
        console.log(' Did Not work Threw an error --->', error);
      });
  };

 

  const deletEvent = eventId => {
    RNCalendarEvents.removeEvent(eventId).then(val => {
      console.log(val); //returns true if event is delted
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.textInputtitle}> {props.route.params.time} </Text>

        <View style={styles.mainContainer}>
          <View style={styles.singleElement}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Event Title"
                placeholderTextColor={'grey'}
                value={eventTitle}
                onChangeText={value => {
                  setEventTile(value);
                }}
              />
            </View>
          </View>
        </View>

    

        <TouchableOpacity
          style={{
            flex: 2,
            padding: 25,
            height: 72,
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor : '#088F8F',
            borderRadius :5
          }}
          onPress={() => createEvent()}>
          <Text style={styles.textInputbtn}> Save Event </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4fc',
    marginTop: 50,
  },
  textInputtitle :{
    color: '#0096FF',
    fontSize: 20,
    fontWeight : 'bold',
    alignSelf: 'center',
  },
  textInput: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
  textInputbtn: {
    color: 'white',
    fontWeight :'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  singleElement: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
  },

  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 1,
  },

  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 1,
    margin: 2,
  },

  dateIcon: {
    padding: 10,
  },
});

export default AddEvent;
