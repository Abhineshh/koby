import { ScrollView, Image, View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import 'react-native-url-polyfill/auto';
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {

  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href={'/home'} />


  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          {/* <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          /> */}
          <Text className="text-4xl text-secondary font-bold">KOBY</Text>
          <Image
            source={images.cards} 
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with
            </Text>
            <Text className=" text-secondary-200 text-3xl font-bold text-center">
              Koby
            </Text>
            <Image
              source={images.path}
              className="w-[75px] h-[15px] absolute -bottom-2 right-20"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity meets innovation: Embark on a journey of limitless
            exploration
          </Text>
          <CustomButton
            title={"Continue with Email"}
            handlePress={() => {
              router.push("/login");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
