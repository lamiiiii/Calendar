// MyPageScreen.js
// 마이페이지 (설정 페이지)

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Button,
} from 'react-native' // 화면 구성에 필요한 것들 import
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import * as ImagePicker from 'expo-image-picker'; // 이미지 업로드 패키지
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기

const MyPageScreen = () => {
    const navigation = useNavigation();
    const [nickname, setNickname] = useState('');
    const [id, setId] = useState('');
    const [profileImage, setProfileImage] = useState("");   // 프로필 이미지 반환

    useEffect(() => { 
        const fetchData = async () => {
            try {
                // AsyncStorage에서 userId 가져오기
                const userId = await AsyncStorage.getItem('userId');
                const parsedUserId = JSON.parse(userId);
    
                // userId 설정
                setId(parsedUserId);
    
                // 기존 닉네임과 프로필 정보 가져오기
                await returnNickname(parsedUserId);
                await returnProfile(parsedUserId);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
    
        // 처음 렌더링 시 데이터 가져오기
        fetchData();
    
        // 일정 시간마다 새로고침
        const refreshInterval = 5 * 60 * 1000; // 5분을 밀리초로 변환
        const intervalId = setInterval(fetchData, refreshInterval);
    
        // 컴포넌트 언마운트 시 clearInterval을 호출하여 간격 함수를 정리
        return () => clearInterval(intervalId);
    }, []);
    
    

// 닉네임 반환 함수
    const returnNickname = async (userId) => {
        const apiUrlNickname = 'http://43.201.9.115:3000/my-info';  // 닉네임 반환 API URL
        // Axios를 이용하여 POST 요청 보내기
        try {
            const response = await axios.post(apiUrlNickname, {
                userId: userId,
            });

            console.log("닉네임 반환 응답: ", response.data);

            if (response.data["property"] == "200") {
                setNickname(response.data["nickname"]);
            }
            // 요청이 실패한 경우 메세지 출력
            else {
                setNickname("");
            }
        } catch (error) {
            // 요청이 실패한 경우 에러 처리
            console.error('닉네임 반환 오류 발생: ', error);
        }
    };

// 프로필 사진 반환 함수
    const returnProfile = async (userId) => {
        // // const [profileImage, setProfileImage] = useState("");   // 프로필 이미지 반환
        // const apiUrlProfile = 'http://43.201.9.115:3000/my-photo';   // 프로필 사진 반환 API URL
        // // Axios를 이용하여 POST 요청 보내기
        // try {
        //     const response = await axios.post(apiUrlProfile, {
        //         userId: userId,
        //     });

        //     if (response.data["property"] == "300" || response.data["property"] == "404") {
        //         console.log("프로필 이미지 반환 응답: ", response.data);
        //     } else {
        //         setProfileImage(response.data);
        //         console.log("프로필 이미지 반환 성공!!!!!!!!!!");
        //     }
        // } catch (error) {
        //     console.error('프로필 이미지 반환 오류: ', error);
        // }
        
    };

    // 로그인 확인 IsLogin -> 추후 로그인 확인 조건 추가 예정
    /*    const [isLogin, setIsLogin] = useState(false);
        const getLogin = async () =>{
            if(await AsyncStorage.getItem('user_id')!== null){
                setIsLogin(true);
            }
        }
        useEffect(() => {
            getLogin();
        });*/



// 로그아웃 구현 함수
    const doLogout = () => {
        try {
            console.log(id, "회원 로그아웃 성공");
            AsyncStorage.clear();       // AsyncStorage에 있는 아이디 정보 지우기
            AsyncStorage.getItem('value').then(value => console.log("로그인 정보 없음: ", value));
            navigation.navigate('Splash')        // 로그아웃 후 화면 이동
        } catch (error) {
            console.log(error);
        }
    };

    // 로그아웃 버튼 함수 --> 수정 필요 (IsLogin을 False로 바꿔야 함)
    const logout = () => {
        Alert.alert(
            "접속 중인 기기에서 로그아웃 하시겠습니까?",                   // 첫번째 text: 타이틀 제목
            "",
            [
                {
                    text: "취소",                     // 취소 버튼 
                    onPress: () => console.log("로그아웃 취소")
                },
                {
                    text: "확인",                     // 확인 버튼
                    onPress: () => doLogout()
                },
            ],
        );
    };

    // 회원 탈퇴 실행 함수
    const doDeleteAccount = () => {
        Alert.alert(
            "회원 탈퇴를 진행하시겠습니까?",            // 첫번째 text: 타이틀 제목            
            '',
            [ // 버튼 배열
                {
                    text: "취소",                 // 버튼 제목          
                    onPress: () => console.log(id, "회원 탈퇴 취소")
                },    //onPress 이벤트시 콘솔창에 로그를 찍는다                                     
                {
                    text: "확인",                 //버튼 제목
                    onPress: () => {
                        console.log("회원 탈퇴를 위해 비밀번호 확인 페이지로 이동. ID:", id);
                        navigation.navigate('CheckPassword');
                    }
                }       // 이벤트 발생시 함수 실행            
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>My Page</Text>
            </View>
            <View style={styles.mainArea}>
                {profileImage ? (
                    <Image
                        source={profileImage}
                        style={styles.profileImage}
                    />
                ) : (
                    <Image
                        source={require('../assets/images/MyProfile.png')}
                        style={styles.profileImage}
                    />
                )}
                <Text style={styles.myNickname}>{nickname}</Text>
            </View>
            <View style={styles.seperator} />
            <Text></Text>
            <View style={styles.tailArea}>
                <View style={styles.settingArea}>
                    <Text style={styles.subtitle}>환경 설정</Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={() => navigation.navigate('ProfileEdit')}>
                            <Text style={styles.buttonTitle}>프로필 편집</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subseperator} />
                </View>
                <View style={styles.helpArea}>
                    <Text style={styles.subtitle}>도움말</Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={() => navigation.navigate('Notice')}>
                            <Text style={styles.buttonTitle}>공지사항</Text>
                        </TouchableOpacity>
                    </View>
                    <Text></Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={() => navigation.navigate('FAQ')}>
                            <Text style={styles.buttonTitle}>자주 묻는 질문</Text>
                        </TouchableOpacity>
                    </View>
                    <Text></Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={() => navigation.navigate('Suggestion')}>
                            <Text style={styles.buttonTitle}>건의사항</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subseperator} />
                </View>
                <View style={styles.accountArea}>
                    <Text style={styles.subtitle}>계정</Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={logout}>
                            <Text style={styles.buttonTitle}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                    <Text></Text>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={doDeleteAccount}>
                            <Text style={styles.buttonTitle}>회원 탈퇴</Text>
                        </TouchableOpacity>
                    </View>
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
    seperator: {            // 구분자
        height: 1,
        backgroundColor: 'black',
        marginTop: 15,
        marginBottom: 15,
        margin: 28,
    },
    subseperator: {         // 서브 구분자
        height: 1,
        backgroundColor: '#DADADA',
        marginTop: 12,
        marginBottom: 5,
        margin: 30,
    },
    titleArea: {    // MY Page 중앙 처리
        alignItems: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#404040',
        margin: 30,
    },
    mainArea: {                        // 프로필 부분
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {     // 프로필 이미지 
        marginLeft: 45,
        width: 70,
        height: 70,
    },
    myNickname: {       // 닉네임 텍스트
        marginLeft: 35,
        marginTop: 15,
        fontSize: 25,
    },
    tailArea: {},                      // 설정 선택 부분
    settingArea: {},                   // 환경 설정 부분
    helpArea: {},                      // 도움말 부분
    accountArea: {},                   // 계정 부분
    subtitle: {
        color: '#575757',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 35,
        marginTop: 25,
        marginBottom: 10,
    },
    buttonArea: {
        width: '100%',
    },
    buttonEdit: {
        backgroundColor: "white",
        justifyContent: 'center',
    },
    buttonTitle: {
        marginLeft: 36,
        fontSize: 20,
        color: '#404040',
    }
})

export default MyPageScreen