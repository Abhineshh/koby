import { ScrollView, StyleSheet, Text, View ,Alert} from "react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Login() {

  const {setUser, setisLoggedIn} = useGlobalContext();

  const [Form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!Form.email || !Form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      await signIn(Form.email, Form.password);
      const result = await getCurrentUser();

      setUser(result);
      setisLoggedIn(true);

      Alert.alert("Success","User Signed in successfully");
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
          <Text className='text-4xl text-secondary font-bold'>
            KOBY
          </Text>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Koby
          </Text>
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
            title={"Login"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have Account
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href={"/signup"}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
