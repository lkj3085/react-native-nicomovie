import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Image, useColorScheme } from "react-native";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

import { darkTheme, lightTheme } from "./theme";

import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [assets] = useAssets([require("./me.jpg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const [ready, setReady] = useState(false);

  const onFinish = () => setReady(true);

  const startLoading = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    // await Font.loadAsync(Ionicons.font);
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./me.jpg"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);

    await Promise.all([...fonts, ...images]);
  };

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}> */}
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
