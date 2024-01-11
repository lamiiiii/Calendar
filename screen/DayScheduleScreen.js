// DayScheduleScreen.js
// 특정날짜 스케줄 페이지

import {View,
        Text, 
        Button,
        StyleSheet,
        Image,
        TouchableOpacity,
    } from 'react-native' // 시간이 지나면 넘어가게 할 화면으로 아마 버튼 없앨 예정
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장

const DayScheduleScreen = () => {

    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const [ScheduleId, setScheduleId] = useState('');
    const [ScheduleName, setScheduleName] = useState('');
    const [SchedulesList, setSchedulesList] = useState('');
    const [LabelColor, setLabelColor] = useState('');
    const [StartAmPm, setStartAmPm] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [EndYear, setEndYear] = useState('');
    const [EndMonth, setEndMonth] = useState('');
    const [EndDay, setEndDay] = useState('');
    const [EndAmPm, setEndAmPm] = useState('');
    const [EndTime, setEndTime] = useState('');

    // AsyncStorage로부터 userId 정보 가져오기
    useEffect(()=>{
        AsyncStorage.getItem('userId').then(userId => {
            const parsedUserId = JSON.parse(userId); // 따옴표를 제거하기 위해 JSON 파싱
            setId(parsedUserId);
       });
    }, []);

    // AsyncStorage로부터 연도 정보 가져오기
    useEffect(()=>{
        AsyncStorage.getItem('todayYear').then(todayYear => {
            const parsedTodayYear = JSON.parse(todayYear); // 따옴표를 제거하기 위해 JSON 파싱
            setYear(parsedTodayYear);
        });
    }, []);

    // AsyncStorage로부터 달 정보 가져오기
    useEffect(()=>{
        AsyncStorage.getItem('todayMonth').then(todayMonth => {
            const parsedTodayMonth = JSON.parse(todayMonth); // 따옴표를 제거하기 위해 JSON 파싱
            setMonth(parsedTodayMonth);
        });
    }, []);

    // AsyncStorage로부터 날짜 정보 가져오기
    useEffect(()=>{
        AsyncStorage.getItem('todayDay').then(todayDay => {
            const parsedTodayDay = JSON.parse(todayDay); // 따옴표를 제거하기 위해 JSON 파싱
            setDay(parsedTodayDay);
        });
    }, []);

// 선택 날짜 스케줄 반환
    const returnSchedule = () => {
        // 보낼 데이터
        const requestData = {        
            userId: id,
            year: year,        
            month: month,        
            day: day,
        };
        const apiUrlS = 'http://43.201.9.115:3000/day-schedule';
        axios.post(apiUrlS, requestData)
        .then(response => {
            const scheduleList = response.data;
            setScheduleId(scheduleList.data[0]["scheduleId"]);
            setScheduleName(scheduleList.data[0]["scheduleName"]);
            setLabelColor(scheduleList.data[0]["labelColor"]);
            setYear(scheduleList.data[0]["year"]);
            setMonth(scheduleList.data[0]["month"]);
            setDay(scheduleList.data[0]["day"]);
            setStartAmPm(scheduleList.data[0]["startAmPm"]);
            setStartTime(scheduleList.data[0]["startTime"]);
            setEndYear(scheduleList.data[0]["endYear"]);
            setEndMonth(scheduleList.data[0]["endMonth"]);
            setEndDay(scheduleList.data[0]["endDay"]);
            setEndAmPm(scheduleList.data[0]["endAmPm"]);
            setEndTime(scheduleList.data[0]["endTime"]);
        })
        .catch(error => {
            console.error(error);
        })
    };

    returnSchedule();

    return (
        <View style={styles.container}>
            <View style={styles.date}>
                <Text style={styles.titleText}>{year}년 {month}월 {day}일 </Text>
            </View>
            <View style={styles.subseperator}/>
            <View style={styles.addButton}><Image source={require('../assets/icons/AddButton.png')} style={styles.addIconImage}/></View>
            <View style={styles.schedules}>
                <Text style={styles.subTitle}>등록된 일정</Text>
                <View style={styles.scheduleContainer}>
                    <View style={{ height: 45,
                                   backgroundColor: LabelColor,
                                   width: 5,
                                }}/>
                    <View style={styles.scheduleContent}>
                        <Text style={styles.scheduleNameSt}>{ScheduleName}</Text>
                        <Text style={styles.scheduleTimeSt}>{StartAmPm} {StartTime} ~ {EndAmPm} {EndTime}</Text>
                    </View>
                    <Image source={require('../assets/icons/ThreeDot.png')} style={styles.editButton}/>
                </View>
            </View>
            <View style={styles.memos}>
                <Text style={styles.subTitle}>간단 메모</Text>
            </View>
            <View style={styles.todo}>
                <Text style={styles.subTitle}>이날의 To-Do!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    date: {
        alignContent: "center",
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#303030',
        margin: 30,
        marginBottom: 0,

    },
    seperator: {            // 구분자
        height: 1,
        backgroundColor: 'black',
        marginTop: 15,
        marginBottom: 15,
        margin: 28,
    },
    subseperator: {         // 서브 구분자
        height: 1,
        backgroundColor: 'black',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 15,
    },
    addButton: {
        alignItems: "flex-end",
        marginRight: 20,
        marginTop: 10,
    },
    addIconImage:{
        height: 30,
        width: 30,
    },
    editButton:{
        height: 25,
        width: 25,
        marginLeft: "37%"
    },
    subTitle: {
        marginHorizontal: 40,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#303030',
    },
    schedules: {

    },
    scheduleContainer:{
        flexDirection: "row",
        marginVertical: 15,
        marginHorizontal: "9%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#BCBCBC",
        padding: 10,
    },
    scheduleContent:{
        marginLeft: 10,
    },
    scheduleNameSt:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    scheduleTimeSt: {
        fontSize: 12,
    },
    memos: {

    },
    todo: {

    },
})

export default DayScheduleScreen