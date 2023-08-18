// Notice2Screen.js
// 공지사항 2 - 업데이트 버전 1.1.2v 안내

import {View,
        Text, 
        Button,
        StyleSheet,
} from 'react-native' 
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Notice2Screen = () => {
const navigation = useNavigation();
return (
    <View style={styles.container}>
        <View style={styles.titleArea}>
            <Text style={styles.titleText}>업데이트 버전 1.1.2v 안내</Text>
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

export default Notice2Screen