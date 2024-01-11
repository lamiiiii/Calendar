// SuggestionScreen.js
// 건의사항 보내기 페이지

import {View,
        Text,
        TextInput,
        Button,
        StyleSheet,
        TouchableOpacity,
        Alert,
    } from 'react-native'    
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기

const SuggestionScreen = () => {

    const navigation = useNavigation();
    const [suggestion, setSuggestion] = useState('');

    // 건의사항 전송 함수
    const submitSuggestion = () => {
        const apiUrl = 'http://43.201.9.115:3000/suggest'; // 건의사항 API URL

        const suggestionData = {    // 보낼 데이터
            "suggestion": suggestion
        };
    
        // 건의사항 axios로 POST 요청 보내기
        axios.post(apiUrl, suggestionData)
        .then(response => {
            console.log("건의사항 전송 성공: ", response.data);
            console.log("건의사항 내용: ", suggestion);
            Alert.alert("건의사항이 전송되었습니다.");
            navigation.navigate('MyPage');
        })
        .catch(error => {
            console.error("에러: ", error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>건의사항 작성</Text>
            </View>
            <View style={styles.suggestionContent}>
                <TextInput      // 건의사항 내용 작성칸
                    title='건의사항'
                    style={styles.TextForm}
                    placeholder={'건의사항 내용 작성'}
                    value={suggestion}
                    autoCapitalize="none"
                    autoCorrect={false}
                    // onChangeText는?
                    onChangeText={(text) => setSuggestion(text)}
                />
            </View>
            <View style={styles.seperator}/>
            <Text></Text>
            <View style={styles.suggestionButton}>
            <TouchableOpacity 
                style={styles.sbuttonEdit}
                onPress={() => 
                    Alert.alert('건의사항을 전송하시겠습니까?',
                    '', 
                    [ 
                        { text: "취소", 
                          onPress: ()=> console.log("건의사항 전송 취소")}, 
                        { text: "확인", 
                          onPress: ()=> {submitSuggestion()}
                        }
                    ])}>
                    <Text style={styles.sbuttonTitle}>작성 완료</Text>
            </TouchableOpacity>
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
        marginTop: 5,
        marginBottom: 0,
        margin: 20,
    },
    titleArea: {    // 건의사항 작성 title 뷰
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        color: '#404040',
        margin: 40,
        fontWeight: 'bold',
    },
    suggestionContent: {    // 건의사항 내용 작성 뷰
        alignItems: 'center',
                                                                                    // 작성 내용 줄바꿈 가능하도록 수정 필요
    },
    TextForm: {
        marginTop: 210,
        fontSize: 18,
        color: '#909090',
    },
    sbuttonEdit: {
        alignItems: 'flex-end',
        marginRight: 24,
    },
    sbuttonTitle: {
        fontWeight: 'bold',
    },

})

export default SuggestionScreen