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
import DayScheduleScreen from "./screen/DayScheduleScreen";
import MemoScreen from "./screen/MemoScreen";
import MemoFolder from "./screen/MemoPage/MemoFolderScreen";
import MemoFile from "./screen/MemoPage/MemoFileScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator
        >
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false }}/>
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false }}/>
            <Stack.Screen name="MyPage" component={MyPageScreen} options={{headerShown: false }}/>
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{headerShown: false }}/>
            <Stack.Screen name="CheckPassword" component={CheckPasswordScreen} options={{headerShown: false }}/>
            <Stack.Screen name="Notice" component={NoticeScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Notice1" component={Notice1Screen} options={{headerShown: false }}/>
                <Stack.Screen name="Notice2" component={Notice2Screen} options={{headerShown: false }}/>
                <Stack.Screen name="Notice3" component={Notice3Screen} options={{headerShown: false }}/>
                <Stack.Screen name="Notice4" component={Notice4Screen} options={{headerShown: false }}/>
            <Stack.Screen name="FAQ" component={FAQScreen} options={{headerShown: false }}/>
                <Stack.Screen name="FAQ1" component={FAQ1Screen} options={{headerShown: false }}/>
                <Stack.Screen name="FAQ2" component={FAQ2Screen} options={{headerShown: false }}/>
                <Stack.Screen name="FAQ3" component={FAQ3Screen} options={{headerShown: false }}/>
                <Stack.Screen name="FAQ4" component={FAQ4Screen} options={{headerShown: false }}/>
            <Stack.Screen name="Suggestion" component={SuggestionScreen} options={{headerShown: false }}/>
            <Stack.Screen name="DaySchedule" component={DayScheduleScreen} options={{headerShown: false }}/>
            <Stack.Screen name="Memo" component={MemoScreen} options={{headerShown: false }}/>
            <Stack.Screen name="MemoFolder" component={MemoFolder} options={{headerShown: false }}/>
            <Stack.Screen name="MemoFile" component={MemoFile} options={{headerShown: false }}/>
        </Stack.Navigator>
        // Stack.Navigator.StackScreen을 통해서 네비게이션 등록
    )
}

export default StackNavigator