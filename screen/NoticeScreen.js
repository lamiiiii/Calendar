// NoticeScreen.js
// 공지사항 페이지

import {View,
        Text,
        StyleSheet,
        Button,
        FlatList,
        TouchableOpacity,
    } from 'react-native' 
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const NoticeScreen = () => {

    const navigation = useNavigation();

    // API URL 설정
    const apiUrl = 'http://43.200.179.53:3000/announcement';

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
                <View style={styles.subseperator}/>
 {/* 공지사항 2*/}
                <TouchableOpacity 
                    style={styles.contentAreaButton}
                    onPress={() => navigation.navigate('Notice2')}>
                        <Text style={styles.contentTitle}>업데이트 버전 1.1.2v 안내</Text>
                </TouchableOpacity>
                <View style={styles.subseperator}/>
{/* 공지사항 3*/}
                <TouchableOpacity 
                    style={styles.contentAreaButton}
                    onPress={() => navigation.navigate('Notice3')}>
                        <Text style={styles.contentTitle}>사용 제제 안내</Text>
                </TouchableOpacity>
                <View style={styles.subseperator}/>
{/* 공지사항 4*/}
                <TouchableOpacity 
                    style={styles.contentAreaButton}
                    onPress={() => navigation.navigate('Notice4')}>
                        <Text style={styles.contentTitle}>개인정보 보호 관련 공지</Text>
                </TouchableOpacity>
                <View style={styles.subseperator}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    seperator: {            // 구분자
        height: 1,
        backgroundColor: 'black',
        marginTop: 15,
        margin: 20,
    },
    subseperator: {         // 서브 구분자
        height: 1,
        backgroundColor: '#DADADA',
        margin: 20,
        marginTop: 0,
        marginBottom: 0,
    },
    titleArea: {    // 공지사항 title 중앙 처리
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        color: '#404040',
        margin: 30,
        fontWeight: 'bold',
    },
    contentArea: {

    }, 
    contentAreaButton: {

    },
    contentTitle: {
        marginLeft: 30,
        margin: 13,
        fontSize: 18,
        color: '#202020',
    },
})

export default NoticeScreen