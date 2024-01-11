import React, {useState} from 'react';
import {SafeAreaView, Button, Text, View, Modal} from 'react-native';

function DaySchedulModal(){
  // Modal을 표시하거나 숨기기 위한 변수
  const [visibleMoal, setVisibleModal] = useState(false);

  return (
    <SafeAreaView style={{flex:1}}>
      {/* Modal 구현 */}
      <Modal animationType="slide"
        transparent={true}
        visible={visibleMoal}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'}}>
          <View style={{
            flex: 0.5,
            borderRadius : 5,
            borderColor : '#cccccc',
            borderWidth : 1,
            backgroundColor : '#ffffff',
            padding: 5,
          }}>
            <Text style={{fontSize:20}}>Modal 화면입니다.</Text>
            {/* Modal 다이얼로그 숨기기 */}
            <Button title='닫기' onPress={() => setVisibleModal(false)}/>
          </View>
        </View>
      </Modal>

      <View style={{justifyContent: 'flex-end', flex:1,  alignItems: 'center'}}>
        <View style={{width : 150, marginBottom : 200}}>
          <Text style={{fontSize:15, marginBottom:5}}>Modal 화면 예제입니다.</Text>
          {/* Modal 다이얼그 표시 */}
          <Button onPress={() => setVisibleModal(true)} title='Modal 열기'/>
        </View>
      </View>

    </SafeAreaView>
  );
}