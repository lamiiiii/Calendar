// MainScreen.js
// 메인 화면 - 캘린더

import {View, 
        Text, 
        Button,
        StyleSheet,
        Image,
        TouchableOpacity,
    } from 'react-native' 
import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {Calendar} from "react-native-calendars";

const MainScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.titleText}>일정</Text>
            </View>

            <Calendar style={styles.calendar}/>

{/** 아이콘 버튼 4개 */}           
            <View style={styles.iconButton}>
                {/** 메인 페이지 (일정) 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('Main')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/Calendar_icon.png')} />
                </TouchableOpacity>
                {/** To-do 리스트 페이지 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('Splash')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/Todo_icon.png')} />
                </TouchableOpacity>
                {/** To-do 리스트 페이지 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('Splash')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/Memo_icon.png')} />
                </TouchableOpacity>
                {/** 마이페이지 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('MyPage')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/MyPage_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    calendar:{
        borderWidth: 1,
        borderColor: '#b0b0b0',
        borderRadius: 12,
        marginLeft: 30,
        marginRight: 30,
        height: 400,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleArea: {
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#404040',
        margin: 30,
    },
    buttonIcon: {

    },
    iconButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 110,
    },
    IconImage: {
        width: 55,
        height: 55,
        margin: 12,
    },
})
export default MainScreen