// Notice4Screen.js
// 공지사항 4 - 개인정보 보호 관련 공지

import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors, width, height } from '../globalStyles'; //width,height 받아오기

const Notice4Screen = () => {
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

    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
                <View style={styles.titleArea}>
                    <Text style={styles.titleText}>개인정보 보호 관련 공지</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { // 전체 컨테이너
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
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    titleArea: {    // 공지사항 title 중앙 처리
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        fontSize: 20,
        color: '#404040',
    },
})

export default Notice4Screen