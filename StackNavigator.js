// StackNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "./screen/SignUpScreen";
import LoginScreen from './screen/LoginScreen';
import SplashScreen from './screen/SplashScreen';
import MainScreen from './screen/MainScreen';
import MyPageScreen from "./screen/MyPageScreen";
import ProfileEditScreen from "./screen/ProfileEditScreen";
import CheckPasswordScreen from "./screen/CheckPasswordScreen";
import NoticeScreen from "./screen/NoticeScreen";
import Notice1Screen from "./screen/NoticeList/Notice1Screen";
import Notice2Screen from "./screen/NoticeList/Notice2Screen";
import Notice3Screen from "./screen/NoticeList/Notice3Screen";
import Notice4Screen from "./screen/NoticeList/Notice4Screen";
import FAQScreen from "./screen/FAQScreen";
import FAQ1Screen from "./screen/FAQList/FAQ1Screen";
import FAQ2Screen from "./screen/FAQList/FAQ2Screen";
import FAQ3Screen from "./screen/FAQList/FAQ3Screen";
import FAQ4Screen from "./screen/FAQList/FAQ4Screen";
import SuggestionScreen from "./screen/SuggestionScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="MyPage" component={MyPageScreen}/>
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}/>
            <Stack.Screen name="CheckPassword" component={CheckPasswordScreen}/>
            <Stack.Screen name="Notice" component={NoticeScreen}/>
            <Stack.Screen name="Notice1" component={Notice1Screen}/>
            <Stack.Screen name="Notice2" component={Notice2Screen}/>
            <Stack.Screen name="Notice3" component={Notice3Screen}/>
            <Stack.Screen name="Notice4" component={Notice4Screen}/>
            <Stack.Screen name="FAQ" component={FAQScreen}/>
            <Stack.Screen name="FAQ1" component={FAQ1Screen}/>
            <Stack.Screen name="FAQ2" component={FAQ2Screen}/>
            <Stack.Screen name="FAQ3" component={FAQ3Screen}/>
            <Stack.Screen name="FAQ4" component={FAQ4Screen}/>
            <Stack.Screen name="Suggestion" component={SuggestionScreen}/>
        </Stack.Navigator>
        // Stack.Navigator.StackScreen을 통해서 네비게이션 등록
    )
}

export default StackNavigator