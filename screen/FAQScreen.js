// FAQScreen.js
// 자주 묻는 질문 페이지

// 카테고리 필요 - 베스트, 사용법, 어쩌고..

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button
} from 'react-native'
import React from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { colors, width, height } from './globalStyles'; //width,height 받아오기


const FAQScreen = () => {

    const navigation = useNavigation();

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

    // // API URL 설정
    // const apiUrl = 'http://43.201.9.115:3000/question'

    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
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
                        <View style={styles.subseperator} />
{/* 질문 2*/}
                    <TouchableOpacity
                        style={styles.contentAreaEdit}
                        onPress={() => navigation.navigate('FAQ2')}>
                        <Text style={styles.contentTitle}>달력 사용 방법</Text>
                    </TouchableOpacity>
                        <View style={styles.subseperator} />
{/* 질문 3*/}
                    <TouchableOpacity
                        style={styles.contentAreaEdit}
                        onPress={() => navigation.navigate('FAQ3')}>
                        <Text style={styles.contentTitle}>메모 사용 방법</Text>
                    </TouchableOpacity>
                        <View style={styles.subseperator} />
{/* 질문 4*/}
                    <TouchableOpacity
                        style={styles.contentAreaEdit}
                        onPress={() => navigation.navigate('FAQ4')}>
                        <Text style={styles.contentTitle}>To-do 사용 방법</Text>
                    </TouchableOpacity>
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
        flex: 9,
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    seperator: {            // 구분자
        height: height*1,
        backgroundColor: 'black',
        marginTop: height*15,
        margin: width*20,
    },
    subseperator: {         // 서브 구분자
        height: height*1,
        backgroundColor: '#DADADA',
        margin: width*25,
        marginTop: height*0,
        marginBottom: height*0,
    },
    titleArea: {    // 공지사항 중앙 처리
        alignItems: 'center',
    },
    titleText: { // 타이틀
        fontSize: 30,
        color: '#404040',
        margin: width*30,
        fontWeight: 'bold',
    },
    contentArea: {

    },
    contentAreaEdit: {

    },
    contentTitle: {
        marginLeft: width*35,
        margin: width*16,
        fontSize: 18,
        color: '#202020',
    },
})

export default FAQScreen