// FAQ4Screen.js
// 자주 묻는 질문 4 - To-do 사용 방법

import {View,
    Text, 
    Button,
    StyleSheet,
} from 'react-native' 
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const FAQ4Screen = () => {
const navigation = useNavigation();
return (
    <View style={styles.container}>
        <View style={styles.titleArea}>
            <Text style={styles.titleText}>To-do 사용 방법</Text>
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

export default FAQ4Screen