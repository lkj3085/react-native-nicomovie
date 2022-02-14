import React from "react";
import styled from "styled-components/native";
import { FlatList, useColorScheme } from "react-native";
import VMedia from "./VMedia";
import { Movie, TV } from "../api";

const ListContainer = styled.View<{ isDark: boolean }>`
color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
  margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
  font-size:18px
  font-weight:600
  margin-left:30px
  margin-bottom:20px
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <ListContainer isDark={isDark}>
      <ListTitle isDark={isDark}>{title}</ListTitle>
      <FlatList
        //   keyExtractor={(item) => item.id + ""}
        //   data={data}
        //   horizontal
        //   showsHorizontalScrollIndicator={false}
        //   ItemSeparatorComponent={HListSeperator}
        //   contentContainerStyle={{ paddingHorizontal: 30 }}
        //   renderItem={({ item }) => (
        //     <VMedia
        //       posterPath={item.poster_path}
        //       originalTitle={item.original_title ?? item.original_name}
        //       voteAverage={item.vote_average}
        //     />
        //   )}
        // />
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeperator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        keyExtractor={(item: Movie | TV) => item.id + ""}
        renderItem={({ item }: { item: Movie | TV }) => (
          <VMedia
            posterPath={item.poster_path || ""}
            originalTitle={
              "original_title" in item
                ? item.original_title
                : item.original_name
            }
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
