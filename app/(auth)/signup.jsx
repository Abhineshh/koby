import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, router, Stack } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
export default function SignUp() {

  const {setUser, setisLoggedIn} = useGlobalContext();

  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!Form.username || !Form.email || !Form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(Form.email, Form.password, Form.username);

      setUser(result)
      setisLoggedIn(true);

      router.replace('/home')
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          {/* <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          /> */}
          <Text className="text-4xl text-secondary font-bold">KOBY</Text>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up to Koby
          </Text>
          <FormField
            title={"Username"}
            value={Form.username}
            handleChangeText={(e) => {
              setForm({ ...Form, username: e });
            }}
            otherStyles="mt-10"
          />
          <FormField
            title={"Email"}
            value={Form.email}
            handleChangeText={(e) => {
              setForm({ ...Form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title={"Password"}
            value={Form.password}
            handleChangeText={(e) => {
              setForm({ ...Form, password: e });
            }}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an Account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href={"/login"}
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
