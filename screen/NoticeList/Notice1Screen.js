// Notice1Screen.js
// 공지사항 1 - 앱 개발 개요

import {View,
        Text, 
        Button,
        StyleSheet,
    } from 'react-native' 
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Notice1Screen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>앱 개발 개요</Text>
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

export default Notice1Screen