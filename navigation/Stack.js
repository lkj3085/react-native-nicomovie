import React from "react";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Detail from "../screens/Detail";
import { YELLOW_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY } from "../colors";

// const ScreenOne = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate("Two")}>
//     <Text>One</Text>
//   </TouchableOpacity>
// );
// const ScreenTwo = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate("Three")}>
//     <Text>Two</Text>
//   </TouchableOpacity>
// );
// const ScreenThree = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
//     <Text>Going To Search</Text>
//   </TouchableOpacity>
// );

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        presentation: "modal",
        animation: "fade",
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        headerTitleAlign: "center",
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
      {/* <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} /> */}
    </NativeStack.Navigator>
  );
};

export default Stack;
