// CheckPasswordScreen.js
// 회원탈퇴 비밀번호 확인 페이지

import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    KeyboardAvoidingView // 키보드 때문에 화면 가리는 거 해결
} from 'react-native';
import { Component, useState, useEffect, useAsync } from "react";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import { colors, width, height } from './globalStyles'; //width,height 받아오기
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기


const CheckPasswordScreen = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('userId').then(userId => {
            const parsedUserId = JSON.parse(userId); // 따옴표를 제거하기 위해 JSON 파싱
            setId(parsedUserId);
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

    // 회원 탈퇴 기능 함수
    const deleteAccount = async () => {
        const apiUrlD = 'http://43.201.9.115:3000/delete-user';

        try {
            // 회원 탈퇴 요청 보내기
            const response = await axios.delete(apiUrlD, {
                data: {
                    userId: id,
                    userPw: password,
                },
            });

            // 서버 응답 처리
            if (response.data["property"] == "200") {
                // 회원 탈퇴 성공
                console.log('ID: ', id, '/ 회원 탈퇴 성공: ', response.data);
                Alert.alert('회원 탈퇴 성공', '그동안 이용해주셔서 감사합니다.');
                AsyncStorage.clear();   // 저장된 아이디 정보 삭제
                navigation.navigate('Splash');
            } else {
                console.log('회원 탈퇴 실패: ', response.data);
                Alert.alert('회원 탈퇴 실패', response.data["message"]);
            }
        } catch (error) {
            console.error('회원 탈퇴 오류: ', error);
            Alert.alert("회원 탈퇴 중 오류가 발생하였습니다.", "다시 시도해주세요.");
        }
    };

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
                        <Text style={styles.titleText}>계정 확인을 위한 비밀번호 확인</Text>
                    </View>
                    <Text></Text>
                    <View style={styles.passwordCheck}>
                        <TextInput      // 비밀번호 입력칸
                            title='비밀번호'
                            style={styles.TextForm}
                            placeholder={'PW'}
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true} // 텍스트 마스킹 (보안을 위해)
                            // onChangeText는?
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Text></Text>
                        <CustomButton
                            title='확인'
                            buttonColor='#606060'
                            // onPress={deleteAccount}    // 2중 확인                                   
                            onPress={() =>                // 3중 확인
                                Alert.alert('확인을 누르면 회원 정보가 삭제됩니다.',
                                    '',
                                    [
                                        {
                                            text: "취소",
                                            onPress: () => console.log("회원 탈퇴 취소")
                                        },
                                        {
                                            text: "확인",
                                            onPress: () => { deleteAccount() }
                                        }
                                    ])}
                        />
                    </View>
                    <Text></Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    titleArea: {    // title 중앙 처리
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height*20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#404040',
    },
    passwordCheck: {
    },
    TextForm: {
        marginTop: height*10,
        paddingLeft: width*20,
        height: height*55,
        width: width*340,
        backgroundColor: '#F0F0F0',
        fontSize: 17,
    },
})

export default CheckPasswordScreen