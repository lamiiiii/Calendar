// FAQScreen.js
// 자주 묻는 질문 페이지

// 카테고리 필요 - 베스트, 사용법, 어쩌고..

import {View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Button
    } from 'react-native' 
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const FAQScreen = () => {

    const navigation = useNavigation();

    // API URL 설정
    const apiUrl = 'http://43.200.179.53:3000/question'

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>자주 묻는 질문</Text>
            </View>
            <View style={styles.contentArea}>
 {/* 질문 1*/}
                <TouchableOpacity 
                    style={styles.contentAreaEdit}
                    onPress={() => navigation.navigate('FAQ1')}>
                        <Text style={styles.contentTitle}>회원 탈퇴 방법</Text>
                </TouchableOpacity>
                <View style={styles.subseperator}/>
 {/* 질문 2*/}
                <TouchableOpacity 
                    style={styles.contentAreaEdit}
                    onPress={() => navigation.navigate('FAQ2')}>
                        <Text style={styles.contentTitle}>달력 사용 방법</Text>
                </TouchableOpacity>
                <View style={styles.subseperator}/>
 {/* 질문 3*/}
                <TouchableOpacity 
                    style={styles.contentAreaEdit}
                    onPress={() => navigation.navigate('FAQ3')}>
                        <Text style={styles.contentTitle}>메모 사용 방법</Text>
                </TouchableOpacity>
                <View style={styles.subseperator}/>
 {/* 질문 4*/}
                <TouchableOpacity 
                    style={styles.contentAreaEdit}
                    onPress={() => navigation.navigate('FAQ4')}>
                        <Text style={styles.contentTitle}>To-do 사용 방법</Text>
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
        margin: 15,
    },
    subseperator: {         // 서브 구분자
        height: 1,
        backgroundColor: '#DADADA',
        margin: 20,
        marginTop: 0,
        marginBottom: 0
    },
    titleArea: {    // 공지사항 중앙 처리
        alignItems: 'center',
    },
    titleText: {    // 타이틀 
        fontSize: 28,
        color: '#404040',
        margin: 30,
        fontWeight: 'bold',
    },
    contentArea: {

    }, 
    contentAreaEdit: {

    },
    contentTitle: {
        marginLeft: 30,
        margin: 13,
        fontSize: 18,
        color: '#202020',
    },
})

export default FAQScreen