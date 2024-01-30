// LoginScreen.js
// 로그인

import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Alert,
    Image,
    Button,
    KeyboardAvoidingView // 키보드 때문에 화면 가리는 거 해결
} from 'react-native'; // 화면 구성에 필요한 것들 import
import React, { Component, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import { colors, width, height } from './globalStyles'; //width,height 받아오기
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기


const LoginScreen = () => {

    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [password, setPw] = useState('');

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

    // AsyncStorage에 로그인 정보 저장
    const saveId = async () => {
        try {
            await AsyncStorage.setItem("userId", JSON.stringify(id));
            console.log('로그인 정보 저장 성공'); // 확인용    
        } catch (e) {
            console.error(e);
        }
    }

    const doLogin = () => {
        const requestData = {
            userId: id,
            userPw: password,
        };

        // API URL 설정
        const apiUrl = 'http://43.201.9.115:3000/login';

        // Axios를 이용하여 POST 요청 보내기
        axios.post(apiUrl, requestData)
            .then(response => {
                // 요청이 성공한 경우 응답 데이터 처리
                console.log('전송 성공: ', response.data);

                if (response.data["property"] == "200") {
                    Alert.alert(
                        response.data["message"],
                        "로그인 성공"
                    )
                    saveId();       // 로그인 정보 저장 함수
                    AsyncStorage.getItem('userId').then(value => {      // 로그인 정보 저장했는지 로그 확인용
                        console.log("로그인 아이디: ", value);
                    });
                    navigation.navigate('Main')
                }
                // 요청 실패한 경우 메세지 출력
                else {
                    Alert.alert(
                        response.data["message"],
                        "로그인 정보를 다시 입력해주세요."
                    )
                }
            })
            .catch(error => {
                // 요청이 실패한 경우 에러 처리
                console.error('전송 실패: ', error);
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
                        <Image style={styles.Logo} source={require('../assets/images/Logo.png')} />
                    </View>
                    <View style={styles.formArea}>
                        <TextInput      // 아이디 입력칸
                            title='아이디'
                            style={styles.TextForm}
                            placeholder={'ID'}
                            value={id}
                            autoCapitalize="none"
                            autoCorrect={false}
                            // onChangeText는?
                            onChangeText={(text) => setId(text)}
                        />
                        <TextInput      // 패스워드 입력칸
                            title='패스워드'
                            style={styles.TextForm}
                            placeholder={'PW'}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={password}
                            // onChangeText는?
                            onChangeText={(text) => setPw(text)}
                        />
                    </View>
                    <Text></Text>
                    <View style={styles.buttonArea}>
                        <CustomButton
                            title='로그인'
                            buttonColor='#85BEFE'
                            onPress={doLogin}
                        />
                        <CustomButton
                            title='회원가입'
                            buttonColor='#719DDF'
                            onPress={() =>
                                Alert.alert('회원가입 화면으로 이동하시겠습니까?',
                                    '',
                                    [
                                        {
                                            text: "취소",
                                            onPress: () => console.log("회원가입 취소")
                                        },
                                        {
                                            text: "확인",
                                            onPress: () => navigation.navigate('SignUp')
                                        }
                                    ])}
                        />
                    </View>
                    {/* buttonArea view 끝*/}
                </View>
                {/* BodyContainer view 끝*/}
            </View>
            {/* Container view 끝*/}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { // 전체 컨테이너
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
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    titleArea: {

    },
    Logo: {                     // [수정?] 로고 사이즈 %로 바꿔야 하나? (%로 하면 center정렬때문에 사이즈 조절 안되는디)
        height: height*180,
        width: width*180,
        justifyContent: 'center',
    },
    formArea: { // 아이디, 패스워드 입력 칸(TextForm) 컨테이너
        marginTop: height*10,
    },
    TextForm: {
        marginTop: height*10,
        paddingLeft: width*20,
        height: height*55,
        width: width*340,
        backgroundColor: '#F0F0F0',
        fontSize: 17,
    },
    buttonArea: { // 로그인, 회원가입 버튼 (CustomButton) 컨테이너
        marginTop: height*5,
    }
})
export default LoginScreen