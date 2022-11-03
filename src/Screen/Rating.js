import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Rating, AirbnbRating } from "react-native-ratings";
import { NativeBaseProvider, Divider, Input, Box, TextArea } from "native-base";

const RatingScreen = (props) => {
  const [isActive, setIsActive] = React.useState(true);
  const [isActiveOne, setIsActiveOne] = React.useState(true);
  const [isActiveTwo, setIsActiveTwo] = React.useState(true);
  const [isActiveThree, setIsActiveThree] = React.useState(true);
  const [isActiveFour, setIsActiveFour] = React.useState(true);
  const [isActiveFive, setIsActiveFive] = React.useState(true);

  const handleClick = () => {
    setIsActive((current) => !current);
  };
  const handleClickOne = () => {
    setIsActiveOne((current) => !current);
  };
  const handleClickTWo = () => {
    setIsActiveTwo((current) => !current);
  };
  const handleClickThree = () => {
    setIsActiveThree((current) => !current);
  };
  const handleClickFour = () => {
    setIsActiveFour((current) => !current);
  };
  const handleClickFive = () => {
    setIsActiveFive((current) => !current);
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "white",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <Pressable
            onPress={() => {
              props.props.navigation.pop();
            }}
          >
            <AntDesign name="arrowleft" size={20} color={"black"} />
          </Pressable>
          <Text
            style={{
              paddingStart: 20,
              color: "black",
              fontWeight: "500",
              fontSize: 20,
            }}
          >
            Rating Feedback
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 25, color: "black", fontWeight: "700" }}>
            Rate Your experience
          </Text>
          <Text style={{ paddingTop: 20, color: "black" }}>
            Are you staisfied with the service
          </Text>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 20,
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Rating
              onFinishRating={this.ratingCompleted}
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
            />
          </View>
        </View>
        <Divider />
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontWeight: "700", color: "black" }}>
            Tell Us what can be imporved?
          </Text>

          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={handleClick}
              style={{
                backgroundColor: isActive ? "#E22014" : "#EAEAEA",

                borderRadius: 45,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                width: "40%",
                marginStart: 20,
              }}
            >
              <Text style={{ color: isActive ? "white" : "black" }}>
                Overall Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClickOne}
              style={{
                backgroundColor: isActiveOne ? "#EAEAEA" : "#E22014",

                borderRadius: 45,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                width: "40%",
                marginStart: 20,
              }}
            >
              <Text style={{ color: isActiveOne ? "black" : "white" }}>
                Customer Support
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={handleClickTWo}
              style={{
                backgroundColor: isActiveTwo ? "#EAEAEA" : "#E22014",
                borderRadius: 45,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                width: "55%",
              }}
            >
              <Text style={{ color: isActiveTwo ? "black" : "white" }}>
                Speed and Efficency
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClickThree}
              style={{
                backgroundColor: isActiveThree ? "#EAEAEA" : "#E22014",
                borderRadius: 45,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                width: "35%",
              }}
            >
              <Text style={{ color: isActiveThree ? "black" : "white" }}>
                Repair Quality
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={handleClickFour}
              style={{
                backgroundColor: isActiveFour ? "#EAEAEA" : "#E22014",
                borderRadius: 45,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
              }}
            >
              <Text style={{ color: isActiveFour ? "black" : "white" }}>
                Pickup and delivery Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClickFive}
              style={{
                backgroundColor: isActiveFive ? "#EAEAEA" : "#E22014",
                borderRadius: 45,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                width: "35%",
              }}
            >
              <Text style={{ color: isActiveFive ? "black" : "white" }}>
                Transperancy
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <Box alignItems="center" w="100%">
              <TextArea
                h={250}
                placeholder="Tell us about how can we improve"
                w="100%"
                color={"black"}
              />
            </Box>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: 80,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              backgroundColor: "#E5494A",
              height: 45,
            }}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnNormal: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: "blue",
    borderWidth: 1,
    height: 30,
    width: 100,
  },
});

export default (props) => {
  return (
    <NativeBaseProvider>
      <RatingScreen props={props} />
    </NativeBaseProvider>
  );
};
