// MainScreen.js
// 메인 화면 - 캘린더


import { View,
    Text, 
    Button,
    StyleSheet,
    Image,
    Body,
    TouchableOpacity,
} from 'react-native' 
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
// import {Calendar} from "react-native-calendars";
import Calendar from "./CalendarPage/Calendar";
import { Header } from 'react-native/Libraries/NewAppScreen';

const MainScreen = () => {

const navigation = useNavigation();

return (
    <View style={styles.container}>
        <View style={styles.titleArea}>
            <Text style={styles.titleText}>Calendar</Text>
        </View>
        {/* <View style={styles.addButton}>
        <TouchableOpacity 
            onPress={() => navigation.navigate('DaySchedule')}>
                <Image source={require('../assets/icons/AddButton.png')} style={styles.addIconImage}/>
        </TouchableOpacity>
        </View> */}
        <View style={styles.calendarContainer}>
            <Calendar style={styles.calendar}/>
        </View>

{/** 아이콘 버튼 4개 */}           
        <View style={styles.iconButton}>
            {/** 메인 페이지 (일정) 이동 버튼 */}
            <TouchableOpacity 
                style={styles.buttonIcon}
                onPress={() => navigation.navigate('Main')}>
                    <Image style={styles.IconImage} 
                           source={require('../assets/icons/Calendar_icon.png')} />
            </TouchableOpacity>
            {/** To-do 리스트 페이지 이동 버튼 */}
            <TouchableOpacity 
                style={styles.buttonIcon}
                onPress={() => navigation.navigate('Splash')}>
                    <Image style={styles.IconImage} 
                           source={require('../assets/icons/Todo_icon.png')} />
            </TouchableOpacity>
            {/** 메모 페이지 이동 버튼 */}
            <TouchableOpacity 
                style={styles.buttonIcon}
                onPress={() => navigation.navigate('Memo')}>
                    <Image style={styles.IconImage} 
                           source={require('../assets/icons/Memo_icon.png')} />
            </TouchableOpacity>
            {/** 마이페이지 이동 버튼 */}
            <TouchableOpacity 
                style={styles.buttonIcon}
                onPress={() => navigation.navigate('MyPage')}>
                    <Image style={styles.IconImage} 
                           source={require('../assets/icons/MyPage_icon.png')} />
            </TouchableOpacity>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
edit: {
    fontSize: 12,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 300,
    opacity: 0.7,
},
addButton: {
    alignItems: "flex-end",
    marginRight: 20,
},
addIconImage:{
    height: 25,
    width: 25,
},
calendarContainer:{
    backgroundColor: 'white', // white임
    height: '69%',
},
container: {
    flex: 1,
    backgroundColor: 'white', // white임
},
titleArea: {
    alignItems: 'center',
    backgroundColor: "white",
    margin: 30,
    marginBottom: 5,
},
titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#404040',
},
calendar: { // CalendarPage/Calendar.js 스타일 적용

},
buttonIcon: {

},
iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
IconImage: {
    width: 55,
    height: 55,
    margin: 12,
},
})
export default MainScreen