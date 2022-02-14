import React, { useState } from "react";
import styled from "styled-components/native";
import { useColorScheme } from "react-native";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.View``;

const SearchBar = styled.TextInput<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "white" : "grey")};
  padding: 10px 15px;
  border-radius: 15px;
  width:90%
  margin: 10px auto
  margin-bottom: 40px
`;

const Search = () => {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  // console.log(isLoading, data);

  return (
    <Container>
      <SearchBar
        isDark={isDark}
        autoCorrect={true}
        placeholder="Search Movie Or Tv"
        placeholderTextColor={isDark ? "black" : "white"}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? <HList title="Movie" data={moviesData.results} /> : null}
      {tvData ? <HList title="Tv" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
