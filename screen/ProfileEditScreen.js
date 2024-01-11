// ProfileEditScreen.js
// 프로필 편집 화면

import {View, 
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

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [newNickname, setNewNickname] = useState('');

    useEffect(()=>{
        AsyncStorage.getItem('userId').then(userId => {
            const parsedUserId = JSON.parse(userId); // 따옴표를 제거하기 위해 JSON 파싱
            setId(parsedUserId);
       });
    }, []);

    // 닉네임 반환 함수
    const returnNickname = () => {
        const apiUrlN = 'http://43.201.9.115:3000/my-info';  // 닉네임 반환 API URL
        const requestData = {
            userId: id,
        };
        // Axios를 이용하여 POST 요청 보내기
        axios.post(apiUrlN, requestData)
        .then(response => {
            if(response.data["property"]=="200"){
                setNickname(response.data["nickname"]);
            }
            // 요청이 실패한 경우 메세지 출력
            else{
                setNickname("닉네임 반환");
            }
        })
        .catch(error => {
            // 요청이 실패한 경우 에러 처리
            console.error('닉네임 반환 실패: ', error);
        })
    }

    
    // 현재 이미지 주소
    const [imageUrl, setImageUrl] = useState('');
    // 라이브러리 접근 권한 요청을 위한 hooks
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

// 프로필 편집 - 이미지 업로드 
    const uploadImage = async () => {
        // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if(!status?.granted) {
            const permission = await requestPermission();
            if(!permission.granted){
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
        if(result.canceled){ // 이미지 업로드 취소한 경우
            return null;
        }

        // 이미지 업로드 결과 및 이미지 경로 업데이트
        console.log(result);
        setImageUrl(result.uri);

        // 서버에 요청 보내기
        const localUri = result.uri;
        const photoFile = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(photoFile ?? '');
        const type = match ? 'image/${match[1]}' : 'image';
        const formData = new FormData();
        formData.append('image', {uri: localUri, name: photoFile, type});

        await axios ({
            method: 'put',
            apiUrl: 'http://43.200.179.53:3000/edit-mypage',
            headers: {
                'content-type': 'multipart/form-data',
            },  
            data: {
                "photoFile": formData,
                "nickname": newNickname,
                "userId": id,
            }
        })
    };


/*
    // 프로필 편집 함수
    const profileChange = async () => {
        try{
            const apiUrl = 'http://43.200.179.53:3000/edit-mypage'; // 프로필 편집 apiUrl
            const requestData = {
                userId: id,
            };
        } catch (error) {
            console.error('닉네임 변경 실패: ', error);
        }
    }
*/
    returnNickname(); // 닉네임 반환

    return (
        <View style={styles.container}>
            <View style={styles.profileImageEdit}>
                <Pressable onPress={uploadImage}>
                    <Image style={styles.profileImage} 
                       source={require('../assets/images/MyProfile.png')}
                    /></Pressable>
            </View>
            <Text style = {styles.id}>ID: {id}</Text>
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
                    buttonColor = '#719DDF'
                    onPress={() => {uploadImage}}
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
        justifyContent: 'center',
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