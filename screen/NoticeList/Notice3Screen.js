// Notice3Screen.js
// 공지사항 3 - 사용 제제 안내

import {View,
        Text, 
        Button,
        StyleSheet,
} from 'react-native' 
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Notice3Screen = () => {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
        <View style={styles.titleArea}>
            <Text style={styles.titleText}>사용 제제 안내</Text>
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

export default Notice3Screen