import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import DatePicker from 'react-native-date-picker';
import {LocaleConfig} from 'react-native-calendars';
import CalendarView from '../component/CalenderView';

LocaleConfig.locales['en'] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
};
LocaleConfig.defaultLocale = 'en';

const CalendarScreen = props => {

  useEffect(() => {
    fetchEvent('3')
  },[])
  const fetchEvent = eventId => {
    RNCalendarEvents.findEventById(eventId).then(data => {
      console.log('Event Data-->', data);
    });
  };

  return (
    <View style={styles.container}>
     
      <CalendarView props={props}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4fc',
  },
  
});

export default CalendarScreen;
