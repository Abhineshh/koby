import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useEffect } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, searchPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";

export default function Profile() {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => {
    return getUserPosts(user.$id);
  });

  const logout = async () => {
    await signOut();
    setUser(null);
    setisLoggedIn(false);

    router.replace("/login");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                onPress={logout}
                className="w-full items-end mb-10"
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-3xl"
              />
              <View className="mt-5 justify-center items-center">
                <InfoBox
                  title={posts.length || 0}
                  subtitle="Posts"
                  containerStyles="flex-row gap-2 justify-center text-center items-center"
                  titleStyles="text-2xl"
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos found"
              subtitle="No Videos found for this search query"
            />
          );
        }}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
