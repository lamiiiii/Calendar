// ProfileEditScreen.js
// 프로필 편집 화면

import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TextInput,
    Pressable,
    TouchableOpacity,
} from 'react-native'
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import CustomButton from '../CustomButton'; // 커스텀 버튼 가져오기
import * as ImagePicker from 'expo-image-picker'; // 이미지 업로드 패키지

const ProfileEditScreen = () => {

    const navigation = useNavigation();

    const [id, setId] = useState(''); // 로그인된 아이디 정보 저장 변수
    const [nickname, setNickname] = useState(''); // 기존 닉네임 정보 저장 변수
    const [newNickname, setNewNickname] = useState(''); // 새로운 닉네임 정보
    const [profileImage, setProfileImage] = useState(''); // 기존 프로필 이미지
    const [newProfileImage, setNewProfileImage] = useState(''); // 새로운 프로필 이미지


    useEffect(() => {  // 컴포넌트가 처음 렌더링될 때 실행되는 부분
        const fetchData = async () => {
            try {
                // AsyncStorage에서 userId 가져오기
                const userId = await AsyncStorage.getItem('userId');
                const parsedUserId = JSON.parse(userId);

                // userId 설정
                setId(parsedUserId);

                // 기존 닉네임과 프로필 정보 가져오기
                await returnNickname(parsedUserId);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        // 처음 렌더링 시 데이터 가져오기
        fetchData();
    }, []); // 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 함


// 기존 닉네임 반환 함수
    const returnNickname = async (userId) => {
        const apiUrlNickname = 'http://43.201.9.115:3000/my-info';  // 닉네임 반환 API URL
        // Axios를 이용하여 POST 요청 보내기
        try {
            const response = await axios.post(apiUrlNickname, {
                userId: userId,
            });

            console.log("닉네임 반환 응답: ", response.data);

            if (response.data["property"] == "200") {
                console.log("기존 닉네임: ", response.data["nickname"]);
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


    // 현재 이미지 주소
    const [imageUrl, setImageUrl] = useState('');
    // 라이브러리 접근 권한 요청을 위한 hooks
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

// 프로필 편집 - 이미지 업로드 
    const uploadImage = async () => {
        // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }

        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // 업로드 파일 타입 설정
            allowsEditing: false, // 이미지 업로드 전 자르기 등의 추가 편집 가능 여부 - false
            quality: 1, // 이미지 압축 여부 - 1로 설정하면 가장 높은 품질
            aspect: [1, 1] // 이미지 비율 설정 값
        });
        if (result.cancelled) { // 이미지 업로드 취소한 경우
            return null;
        }

        // 이미지 업로드 결과 및 이미지 경로 업데이트
        console.log(result);
        setImageUrl(result.uri);

        // 서버에 요청 보내기
        const localUri = result.assets[0].uri;
        const photoFile = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(photoFile ?? '');
        const type = match ? 'image/${match[1]}' : 'image';

        // formdata 객체 생성
        const formData = new FormData();
        formData.append('image', {
            uri: localUri,
            name: photoFile,
            type: type
        });

        // put 요청 보내기
        await axios.put('http://43.201.9.115:3000/edit-mypage', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
            params: {
                "userId": id,
            }
        });
    };


// 프로필 변경 함수
    const profileChange = async (photoFile, nickname, userId) => {
        try {
            // FormData 객체 생성
            const formData = new FormData();

            // 이미지 파일 추가
            formData.append('image', {
                uri: photoFile.uri,
                name: 'photo.jpg', // 파일 이름 지정
                type: 'image/jpeg', // 파일 타입 지정
            });

            // 텍스트 데이터 추가
            formData.append('nickname', nickname);
            formData.append('userId', userId);

            // PUT 요청 보내기
            const response = await axios.put('http://43.201.9.115:3000/edit-mypage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 필수: Content-Type 설정
                },
            });

            console.log('프로필 편집 성공: ', response.data);
        } catch (error) {
            console.error('프로필 편집 실패:', error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.profileImageEdit}>
                <Pressable onPress={() => uploadImage()}>
                    <Image style={styles.profileImage}
                        source={require('../assets/images/MyProfile.png')}
                    /></Pressable>
            </View>
            <Text style={styles.id}>ID: {id}</Text>
            <View style={styles.nicknameEdit}>
                <TextInput      // 닉네임 입력칸
                    title='닉네임'
                    style={styles.TextForm}
                    placeholder={nickname}
                    value={newNickname}
                    autoCapitalize="none"
                    autoCorrect={false}
                    // onChangeText는?
                    onChangeText={(text) => setNewNickname(text)}
                />
            </View>
            <Text></Text>
            <View style={styles.nicknameButton}>
                <CustomButton
                    title='변경 완료'
                    buttonColor='#719DDF'
                    onPress={() => profileChange("", newNickname, id)}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 130,
    },
    seperator: {            // 구분자
        height: 1,
        backgroundColor: 'black',
    },
    profileImageEdit: {     // 프로필 이미지 변경 뷰

    },
    profileImage: {     // 프로필 이미지 크기
        width: 150,
        height: 150,
    },
    id: {
        color: '#404040',
        marginBottom: 20,
    },
    nicknameEdit: {     // 닉네임 변경 뷰

    },
    TextForm: {
        marginTop: 10,
        paddingLeft: 20,
        height: 45,
        width: 290,
        backgroundColor: '#F0F0F0',
        fontSize: 17,
    },
    nicknameButton: {

    },
})
export default ProfileEditScreen