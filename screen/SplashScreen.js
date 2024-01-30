// SplashScreen.js
// 가장 첫 화면으로 보여지는 화면 (삭제)

import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native' // 시간이 지나면 넘어가게 할 화면으로 아마 버튼 없앨 예정
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors, width, height } from './globalStyles'; //width,height 받아오기
import DateTimePicker from "react-native-modal-datetime-picker";

const SplashScreen = () => {
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
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
                <Text>This is First Screen (SplashScreen)</Text>
                <Text></Text>
                <Text></Text>

                <Button title='Go to SetScreen' onPress={() => navigation.navigate('MyPage')} />
                <Text></Text>
                <Button title='Go to LoginScreen' onPress={() => navigation.navigate('Login')} />
                <Text></Text>
                <Button title='Go to MainScreen' onPress={() => navigation.navigate('Main')} />
                <Text></Text>
                <Button title='Go to SignUpScreen' onPress={() => navigation.navigate('SignUp')} />
                <Text></Text>
                <Button title='Go to DayScheduleScreen' onPress={() => navigation.navigate('DaySchedule')} />
                <Text></Text>
                <Button title='Go to MemoScreen' onPress={() => navigation.navigate('Memo')} />
                {/** onPress는 버튼을 누르는 행위의 함수
             *   화면 전환을 위해 useNavigation() 객체 받아서 사용
             *   이를 받은 객체를 Navigation이라 만들었고, 이 객체의 navigate() 함수에 Stack으로 정한 이름 넣어줌
             */}
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
        flex: 9,
        alignItems: 'center',
        marginTop: 33,
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
})

export default SplashScreen