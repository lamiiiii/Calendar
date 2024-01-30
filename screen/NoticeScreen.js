// NoticeScreen.js
// 공지사항 페이지

import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { colors, width, height } from './globalStyles'; //width,height 받아오기

const NoticeScreen = () => {

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

    // API URL 설정
    const apiUrl = 'http://43.201.9.115:3000/announcement';

    /*   const [notices, setNotices] = useState([]);
    
        useEffect(() => {
            // 공지사항 데이터 가져오는 API 호출
            axios.get(apiUrl)
            .then(response => {
                setNotices(response.data);
            })
            .catch(error => {
                console.error('API 호출 에러: ', error);
            });
        }, []);
        axios.get(apiUrl)
        .then(response => {
            // 공지사항 Data가 null이 아니면 반환
            if(response.data["data"]!= null){
    
            }
        })
        .catch(error => {
            console.log(error);
        });
    */
    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
                <View style={styles.titleArea}>
                    <Text style={styles.titleText}>공지사항</Text>
                </View>

                <View style={styles.contentArea}>
                    {/* 공지사항 1*/}
                    <TouchableOpacity
                        style={styles.contentAreaButton}
                        onPress={() => navigation.navigate('Notice1')}>
                        <Text style={styles.contentTitle}>앱 개발 개요</Text>
                    </TouchableOpacity>
                    <View style={styles.subseperator} />
                    {/* 공지사항 2*/}
                    <TouchableOpacity
                        style={styles.contentAreaButton}
                        onPress={() => navigation.navigate('Notice2')}>
                        <Text style={styles.contentTitle}>업데이트 버전 1.1.2v 안내</Text>
                    </TouchableOpacity>
                    <View style={styles.subseperator} />
                    {/* 공지사항 3*/}
                    <TouchableOpacity
                        style={styles.contentAreaButton}
                        onPress={() => navigation.navigate('Notice3')}>
                        <Text style={styles.contentTitle}>사용 제제 안내</Text>
                    </TouchableOpacity>
                    <View style={styles.subseperator} />
                    {/* 공지사항 4*/}
                    <TouchableOpacity
                        style={styles.contentAreaButton}
                        onPress={() => navigation.navigate('Notice4')}>
                        <Text style={styles.contentTitle}>개인정보 보호 관련 공지</Text>
                    </TouchableOpacity>
                    <View style={styles.subseperator} />
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
    seperator: {            // 구분자
        height: height*1,
        backgroundColor: 'black',
        marginTop: height*15,
        margin: width*20,
    },
    subseperator: {         // 서브 구분자
        height: height*1,
        backgroundColor: '#DADADA',
        margin: width*25,
        marginTop: height*0,
        marginBottom: height*0,
    },
    titleArea: {    // 공지사항 title 중앙 처리
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        color: '#404040',
        margin: width*30,
        fontWeight: 'bold',
    },
    contentArea: {

    },
    contentAreaButton: {

    },
    contentTitle: {
        marginLeft: width*35,
        margin: width*16,
        fontSize: 18,
        color: '#202020',
    },
})

export default NoticeScreen