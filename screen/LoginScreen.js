// LoginScreen.js
// 로그인

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { View, 
         Text, 
         TextInput,
         SafeAreaView,
         StyleSheet,
         TouchableOpacity,
         Alert,
         Image,
         Button,
    } from 'react-native'; // 화면 구성에 필요한 것들 import
import React, { Component, useState } from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기


const LoginScreen = () => {
    
    const navigation = useNavigation();
    
    const [id, setId] = useState('');
    const [password, setPw] = useState('');

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
            
            if(response.data["property"]=="200"){
                Alert.alert(
                    response.data["message"],
                    "로그인 성공"
                )
                saveId();       // 로그인 정보 저장 함수
                AsyncStorage.getItem('userId').then(value => {      // 로그인 정보 저장했는지 로그 확인용
                    console.log(value);
               });
                navigation.navigate('Main')
            }
            // 요청 실패한 경우 메세지 출력
            else{
                Alert.alert(
                    response.data["message"],
                    "에러 발생"
                )
            }
        })
        .catch(error => {
            // 요청이 실패한 경우 에러 처리
            console.error('전송 실패: ', error);
        });
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Image style={styles.Logo} source={require('../assets/images/Logo.png')}/>
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
            <View style={styles.tailArea}>
                <CustomButton 
                    title = '로그인'
                    buttonColor = '#85BEFE'
                    onPress={doLogin}
                />
                <CustomButton
                    title='회원가입'
                    buttonColor = '#719DDF'
                    onPress={() => 
                                    Alert.alert('회원가입 화면으로 이동하시겠습니까?',
                                    '', 
                                    [ 
                                        { text: "취소", 
                                          onPress: ()=> console.log("회원가입 취소")}, 
                                        { text: "확인", 
                                          onPress: ()=> navigation.navigate('SignUp')}
                                    ])}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleArea: {

    },
    Logo: {
        height: 150,
        width: 150, 
        justifyContent: 'center',
    },
    formArea: {
    },
    TextForm: {
        marginTop: 10,
        paddingLeft: 20,
        height: 45,
        width: 290,
        backgroundColor: '#F0F0F0',
        fontSize: 17,
    },
    tailArea: {

    }
})
export default LoginScreen