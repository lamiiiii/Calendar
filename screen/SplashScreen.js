// SplashScreen.js
// 가장 첫 화면으로 보여지는 화면

import {View,
        Text, 
        Button,
        StyleSheet,
    } from 'react-native' // 시간이 지나면 넘어가게 할 화면으로 아마 버튼 없앨 예정
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>This is First Screen (SplashScreen)</Text>
            <Text></Text>
            <Text></Text>

            <Button title='Go to SetScreen' onPress={() => navigation.navigate('MyPage')}/>
            <Text></Text>
            <Button title='Go to LoginScreen' onPress={() => navigation.navigate('Login')}/>
            <Text></Text>
            <Button title='Go to MainScreen' onPress={() => navigation.navigate('Main')}/>
            <Text></Text>
            <Button title='Go to SignUpScreen' onPress={() => navigation.navigate('SignUp')}/>
            {/** onPress는 버튼을 누르는 행위의 함수
             *   화면 전환을 위해 useNavigation() 객체 받아서 사용
             *   이를 받은 객체를 Navigation이라 만들었고, 이 객체의 navigate() 함수에 Stack으로 정한 이름 넣어줌
             */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 33,
    },
})

export default SplashScreen