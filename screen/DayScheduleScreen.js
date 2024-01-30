// DayScheduleScreen.js
// 특정날짜 스케줄 페이지

import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native' // 시간이 지나면 넘어가게 할 화면으로 아마 버튼 없앨 예정
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import { colors, width, height } from './globalStyles'; //width,height 받아오기

const DayScheduleScreen = () => {

    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const [ScheduleId, setScheduleId] = useState();
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

    useEffect(() => {
        // AsyncStorage로부터 userId 정보 가져오기
        AsyncStorage.getItem('userId').then(userId => {
            const parsedUserId = JSON.parse(userId); // 따옴표를 제거하기 위해 JSON 파싱
            setId(parsedUserId);
        });

        // AsyncStorage로부터 연도 정보 가져오기
        AsyncStorage.getItem('todayYear').then(todayYear => {
            const parsedTodayYear = JSON.parse(todayYear); // 따옴표를 제거하기 위해 JSON 파싱
            setYear(parsedTodayYear);
        });

        // AsyncStorage로부터 달 정보 가져오기
        AsyncStorage.getItem('todayMonth').then(todayMonth => {
            const parsedTodayMonth = JSON.parse(todayMonth); // 따옴표를 제거하기 위해 JSON 파싱
            setMonth(parsedTodayMonth);
        });

        // AsyncStorage로부터 날짜 정보 가져오기
        AsyncStorage.getItem('todayDay').then(todayDay => {
            const parsedTodayDay = JSON.parse(todayDay); // 따옴표를 제거하기 위해 JSON 파싱
            setDay(parsedTodayDay);
        });
    }, []);


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

    /*
        const fetchData = async () => {
            try{
                const requestData = {
                    userId: id,
                    year: year,        
                    month: month,        
                    day: day,
                };
    
                const response = await axios.post('http://43.201.9.115:3000/day-schedule', requestData);
                const scheduleList = response.data.data;
    
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    */

    // 선택 날짜 스케줄 반환
    const returnSchedule = () => {
        // Modal을 표시하거나 숨기기 위한 변수

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

                // console.log(scheduleList.data[0]["scheduleId"]);

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
    const [visibleMoal, setVisibleModal] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
            <Modal animationType="none"
                transparent={true}
                visible={visibleMoal}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 290,
                }}>
                    <View style={{
                        flex: 0.13,
                        borderRadius: 5,
                        borderColor: '#cccccc',
                        borderWidth: 1,
                        backgroundColor: '#ffffff',
                    }}>
                        <Button style={styles.editButtonD} title='삭제' onPress={() => setVisibleModal(false)} />
                        <View style={styles.seperator} />
                        <Button style={styles.editButtonD} title='편집' onPress={() => setVisibleModal(false)} />
                    </View>
                </View>
            </Modal>


            <View style={styles.date}>
                <Text style={styles.titleText}>{year}년 {month}월 {day}일 </Text>
            </View>
            <View style={styles.subseperator} />
            <View style={styles.addButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Splash')}>
                    <Image source={require('../assets/icons/AddButton.png')} style={styles.addIconImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.schedules}>
                <Text style={styles.subTitle}>등록된 일정</Text>
                <View style={styles.scheduleContainer}>
                    <View style={styles.scheduleContent0}>
                        <View style={{
                            height: "100%",
                            backgroundColor: LabelColor,
                            width: 5,
                        }} />
                        <View style={styles.scheduleContent}>
                            <Text style={styles.scheduleNameSt}>{ScheduleName}</Text>
                            <Text style={styles.scheduleTimeSt}>{StartAmPm} {StartTime} ~ {EndAmPm} {EndTime}</Text>
                        </View>
                    </View>
                    <View style={styles.editButtonV}>
                        <Pressable
                            onPress={() => setVisibleModal(true)}>
                            <Image source={require('../assets/icons/ThreeDot.png')} style={styles.editButton} />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.memos}>
                <Text style={styles.subTitle}>간단 메모</Text>
            </View>
            <View style={styles.todo}>
                <Text style={styles.subTitle}>이날의 To-Do!</Text>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    BackButton: {      // 뒤로가기 버튼 스타일
        marginTop: height*60,
        marginLeft: width*10,
        height: height*30,
        width: width*30,
    },
    HeaderContainer: { // header 컨테이너 (뒤로가기 버튼)
        flex: 1,
        // backgroundColor: 'red', // 컨테이너 확인용
    },
    BodyContainer: { // body 컨테이너 (주 내용)
        flex: 9,
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    date: {
        alignContent: "center",
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#303030',
        margin: width*35,
        marginBottom: height*0,

    },
    seperator: {            // 구분자
        height: height*1,
        backgroundColor: '#cccccc',
    },
    subseperator: {         // 서브 구분자
        height: height*1,
        backgroundColor: 'black',
        marginTop: height*10,
        marginBottom: height*5,
        marginHorizontal: width*20,
    },
    addButton: {
        alignItems: "flex-end",
        marginRight: width*25,
        marginTop: height*13,
    },
    addIconImage: {
        height: height*30,
        width: width*30,
    },
    editButton: {
        height: height*25,
        width: width*25,
    },
    editButtonD: {
        fontSize: 5,
    },
    editButtonV: {

    },
    subTitle: {
        marginHorizontal: height*45,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#303030',
    },
    schedules: {

    },
    scheduleContainer: {
        flexDirection: "row",
        width: '80%',
        marginVertical: width*17,
        marginHorizontal: "9%",
        borderWidth: width*1,
        borderRadius: 5,
        borderColor: "#BCBCBC",
        padding: width*15,
    },
    scheduleContent0: {
        flexDirection: "row",
        width: '93%',
    },
    scheduleContent: {
        marginLeft: 10,
    },
    scheduleNameSt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: height*5,
    },
    scheduleTimeSt: {
        fontSize: 13,
    },
    memos: {

    },
    todo: {

    },
})

export default DayScheduleScreen