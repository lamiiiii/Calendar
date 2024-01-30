// SuggestionScreen.js
// 건의사항 보내기 페이지

import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView // 키보드 때문에 화면 가리는 거 해결
} from 'react-native'
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import { colors, width, height } from './globalStyles'; //width,height 받아오기
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기

const SuggestionScreen = () => {

    const navigation = useNavigation();
    const [suggestion, setSuggestion] = useState('');

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
        <KeyboardAvoidingView // 키보드 때문에 화면 가리는 거 해결
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.HeaderContainer}>
                    {/* 뒤로가기 버튼 */}
                    <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../assets/icons/BackToPage.png')} /></TouchableOpacity>
                </View>
                {/* HeaderContainer view 끝 */}
                <View style={styles.BodyContainer}>
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
                    <View style={styles.seperator} />
                    <Text></Text>
                    <View style={styles.suggestionButton}>
                        <TouchableOpacity
                            style={styles.sbuttonEdit}
                            onPress={() =>
                                Alert.alert('건의사항을 전송하시겠습니까?',
                                    '',
                                    [
                                        {
                                            text: "취소",
                                            onPress: () => console.log("건의사항 전송 취소")
                                        },
                                        {
                                            text: "확인",
                                            onPress: () => { submitSuggestion() }
                                        }
                                    ])}>
                            <Text style={styles.sbuttonTitle}>작성 완료</Text>
                        </TouchableOpacity>
                    </View>
                    {/* suggestionButton view 끝*/}
                </View>
                {/* BodyContainer view 끝*/}
            </View>
            {/* Container view 끝*/}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        flex: 6,
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    seperator: {            // 구분자
        height: height * 1,
        backgroundColor: 'black',
        marginTop: height * 5,
        marginBottom: height * 0,
        margin: width * 20,
    },
    titleArea: {    // 건의사항 작성 title 뷰
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        color: '#404040',
        margin: width*40,
        marginBottom: width*0,
        fontWeight: 'bold',
    },
    suggestionContent: {    // 건의사항 내용 작성 뷰
        alignItems: 'center',
        // 작성 내용 줄바꿈 가능하도록 수정 필요
    },
    TextForm: {
        marginTop: height*250,
        fontSize: 20,
        color: '#909090',
    },
    sbuttonEdit: {
        alignItems: 'flex-end',
        marginRight: width*30,
    },
    sbuttonTitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },

})

export default SuggestionScreen