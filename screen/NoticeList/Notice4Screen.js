// Notice4Screen.js
// 공지사항 4 - 개인정보 보호 관련 공지

import {View,
        Text, 
        Button,
        StyleSheet,
        } from 'react-native' 
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Notice4Screen = () => {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
        <View style={styles.titleArea}>
            <Text style={styles.titleText}>개인정보 보호 관련 공지</Text>
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