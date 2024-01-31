// MainScreen.js
// 메인 화면 - 캘린더

import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    Body,
    TouchableOpacity,
} from 'react-native'
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { colors, width, height } from './globalStyles'; //width,height 받아오기
// import {Calendar} from "react-native-calendars"; // 리액트 네이티브에서 제공하는 달력 UI
import Calendar from "./CalendarPage/Calendar";
import { Header } from 'react-native/Libraries/NewAppScreen';

const MainScreen = () => {

    const navigation = useNavigation();

    // BackButton 기능 구현
    const handlePop = () => {
        const previousScreen = navigation?.getState()?.routes[navigation?.getState()?.index - 1];

        if (previousScreen) {
            console.log('이전 스크린:', previousScreen.name);
            // 이전 스크린에 대한 추가 정보를 필요하다면 previousScreen.params 등을 사용할 수 있습니다.

            navigation.pop(); // 이전 스크린으로 돌아가는 함수 호출
        } else {
            console.log('현재 스크린이 root 스크린. 이전 스크린 없음');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
                <View style={styles.titleArea}>
                    <Text style={styles.titleText}>Calendar</Text>
                </View>
                {/* <View style={styles.addButton}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DaySchedule')}>
                        <Image source={require('../assets/icons/AddButton.png')} style={styles.addIconImage} />
                    </TouchableOpacity>
                </View> */}

                <View style={styles.calendarContainer}>
                    <Calendar style={styles.calendar} />
                </View>

                {/** 아이콘 버튼 4개 */}
                <View style={styles.iconButton}>
                    {/** 메인 페이지 (일정) 이동 버튼 */}
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => navigation.navigate('Main')}>
                        <Image style={styles.SelectedIconImage}
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
                {/* IconButton View 끝 */}
            </View>
            {/* BodyContainder View 끝 */}
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
    addIconImage: {
        height: height * 25,
        width: width * 25,
    },
    calendarContainer: {
        backgroundColor: 'white', // white임
        height: '69%',
    },
    container: { // 전체 컨테이너
        flex: 1,
        backgroundColor: 'white', // white임
    },
    BackButton: {      // 뒤로가기 버튼 스타일
        marginTop: height * 60,
        marginLeft: width * 10,
        height: height * 30,
        width: width * 30,
    },
    HeaderContainer: { // header 컨테이너 (뒤로가기 버튼)
        flex: 1,
        // backgroundColor: 'red', // 컨테이너 확인용
    },
    BodyContainer: { // body 컨테이너 (주 내용)
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    titleArea: {
        // alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: height * 20
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
    iconButton: { // 하단 아이콘 버튼 4개
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconImage: { // 하단 아이콘 버튼 4개 개별
        width: width * 65,
        height: height * 65,
        margin: width * 15,
        marginTop: 0,
        opacity: 0.4, // 투명도 조절을 위한 값 (0.5는 반투명)
    },
    SelectedIconImage: { // 하단 아이콘 버튼 4개 개별
        width: width * 65,
        height: height * 65,
        margin: width * 15,
        marginTop: 0,
    },
})
export default MainScreen