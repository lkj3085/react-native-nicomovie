import React, { useState } from "react";
import { ScrollView, FlatList, RefreshControl } from "react-native";
import { tvApi } from "../api";
import HList, { HListSeperator } from "../components/HList";
import Loader from "../components/Loader";
import { useQuery, useQueryClient } from "react-query";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="지금 Hot" data={trendingData.results} />

      <HList title="오늘 OnAir" data={todayData.results} />

      <HList title="평점 최고봉" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
