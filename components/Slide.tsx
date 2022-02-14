import React from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../api";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px
  font-weight:600
  color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
`;

const Wrapper = styled.View<{ isDark: boolean }>`
color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
  flex-direction: row;
  height: 100%
  justify-content: center
  align-items: center
`;
const Column = styled.View<{ isDark: boolean }>`
color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled(Overview)<{ isDark: boolean }>`
color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          tint={isDark ? "dark" : "light"}
          intensity={95}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper isDark={isDark}>
            <Poster path={posterPath} />
            <Column isDark={isDark}>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteAverage > 0 ? (
                <Votes isDark={isDark}>⭐️ {voteAverage} / 10</Votes>
              ) : null}
              <Overview isDark={isDark}>{overview.slice(0, 110)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;