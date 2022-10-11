import moment from 'moment';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import RNCalendarEvents from 'react-native-calendar-events';
import AntDesign from 'react-native-vector-icons/AntDesign'

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalenderView = props => {
  const [items, setItems] = React.useState({});

  const [dateSelected, setdateSelected] = React.useState(
    moment().format('YYYY-MM-DD'),
  );

  useEffect(() => {
    props.props.navigation.addListener('focus', () => {
      fetchEvent();
    });
    fetchEvent();
  }, []);

  function fetchEvent() {
    RNCalendarEvents.fetchAllEvents().then(data => {
      console.log('Event Data-->here', data);
      const newItems = {};
      data.forEach(key => {
        let datehere = timeToString(key?.endDate);
        console.log("key value ", key)
        let item = [];
        if (newItems[datehere] == undefined) {
          item = [
            {
              name: key?.title,
              title: key?.endDate,
              day: timeToString(key?.endDate),
            },
          ];
        } else {
          item = newItems[datehere].concat([
            {
              name: key?.title,
              title: key?.endDate,
              day: timeToString(key?.endDate),
            },
          ]);
        }
        newItems[datehere] = item;
      });

      console.log('newItems', newItems);
      setItems(newItems);
    });
  }

  const loadItems = day => {
    setTimeout(() => {
      fetchEvent();
    }, 1000);
  };

  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={{color: 'black'}}>{item.day}</Text>
          <Text style={{color: 'black'}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderEmptyDate = (date) => {
    return <View style={{height:20, width:'100%', justifyContent:'center', alignItems:'center'}}>
      <Text>No Event</Text>

    </View>;
  };

  return (
    <View style={styles.container}>
      <Pressable
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
        dayLoading={false} 
        refreshing={false}
        renderItem={renderItem}
        renderEmptyData={_renderEmptyDate}
        markingType={'custom'}
        onDayPress={day => {
          setdateSelected(day?.dateString);
        }}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: 'skyblue',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 5,
  },
});

export default CalenderView;
