import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';

import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, width, height } from '../globalStyles'; //width,height 받아오기
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';




export default function MemoFolderScreen({ }) {


    const navigation = useNavigation();

    const [folderList, setFolderList] = useState([]);
    const [memoName, setMemoName] = useState("");
    const [memoContent, setMemoContent] = useState("");
    const [memoId, setMemoId] = useState("");
    const [memoList, setMemoList] = useState([]);
    const [memoListHeight, setHeight] = useState(0);
    const [userId, setId] = useState("");
    const [folderId, setFolderId] = useState("");
    const [byCreate, setByCreate] = useState(1);
    const [byName, setByName] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);



    useEffect(() => {

        AsyncStorage.multiGet(['userId', 'memoId']).then(values => {
            const parsedUserId = JSON.parse(values[0][1]);
            const parsedMemoId = JSON.parse(values[1][1]);



            setId(parsedUserId);
            setMemoId(parsedMemoId);
            fetchData(parsedMemoId);
            console.log("메모아이딩:", parsedMemoId);
        });
    }, []);

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

    const fetchData = async (parsedMemoId) => {
        try {
            const requestDataMemo = {
                memoId: parsedMemoId,
            };

            const responseMemo = await axios.post('http://43.201.9.115:3000/return-memo', requestDataMemo);
            const memoContentData = responseMemo.data.data;
            setMemoName(memoContentData[0]["memoName"]);
            setMemoContent(memoContentData[0]["content"]);


            if (memoContentData[0]["content"].length > 738) {
                setHeight(((memoContentData[0]["content"].length) / 30) * 30)
            }
            console.log("height", memoListHeight);

            console.log("오잉", memoContentData["memoName"]);
            console.log(responseMemo.data);
            console.log(memoContentData[0]["memoName"]);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    const deleteButtonTouch = () => {
        Alert.alert("삭제할겨? 아직 ㅈㅅ")
    }

    const editButtonTouch = () => {
        Alert.alert("편집할겨? 아직 ㅈㅅ")
    }

    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={handlePop}><Image style={styles.BackButton} source={require('../../assets/icons/BackToPage.png')} /></TouchableOpacity>
            </View>
            {/* HeaderContainer view 끝 */}
            <View style={styles.BodyContainer}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>{memoName}</Text>
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => deleteButtonTouch()}>
                        <Text style={styles.textButton}>  삭제  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => editButtonTouch()}>
                        <Text style={styles.textButton}>  편집  </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subseperator} />
                <View style={styles.memoBackgroundArea}>
                    <ScrollView
                        vertical
                        contentContainerStyle={{
                            ...styles.scrollViewMemo,
                            height: 580,
                        }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Text style={styles.contentArea}>{memoContent}</Text>
                    </ScrollView>
                </View>
                <View style={styles.iconButton}>
                    {/** 메인 페이지 (일정) 이동 버튼 */}
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => navigation.navigate('Main')}>
                        <Image style={styles.IconImage}
                            source={require('../../assets/icons/Calendar_icon.png')} />
                    </TouchableOpacity>
                    {/** To-do 리스트 페이지 이동 버튼 */}
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => navigation.navigate('Splash')}>
                        <Image style={styles.IconImage}
                            source={require('../../assets/icons/Todo_icon.png')} />
                    </TouchableOpacity>
                    {/** 메모 페이지 이동 버튼 */}
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => navigation.navigate('Memo')}>
                        <Image style={styles.IconImage}
                            source={require('../../assets/icons/Memo_icon.png')} />
                    </TouchableOpacity>
                    {/** 마이페이지 이동 버튼 */}
                    <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={() => navigation.navigate('MyPage')}>
                        <Image style={styles.IconImage}
                            source={require('../../assets/icons/MyPage_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    BackButton: {      // 뒤로가기 버튼 스타일
        marginTop: height*60,
        marginLeft: width*10,
        height: height*30,
        width: width*30,
    },
    HeaderContainer: { // header 컨테이너 (뒤로가기 버튼)
        flex: 1,
        // backgroundColor: 'red', // 컨테이너 확인용
    },
    BodyContainer: { // body 컨테이너 (주 내용)
        flex: 9,
        padding: width * 20,
        // backgroundColor: 'blue', // 컨테이너 확인용
    },
    titleArea: {
        flexDirection: "row",
        // alignItems: 'center',
        backgroundColor: "white",
        // justifyContent: 'center',
        marginBottom: height * 10,
        flex: 0.08,
        paddingTop: height * 80,
        // backgroundColor: "red",
        alignItems: "center",
    },
    title: {
        width: width * 290,
        height: height * 40,
        fontSize: width * 30,
        // backgroundColor:"green",
    },
    textButton: {
        height: height * 20,
        // backgroundColor: "blue",
    },
    scrollViewMemo: {
        alignItems: 'center',
        // backgroundColor:"yellow",
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    memoBackgroundArea: {
        flex: 1,
        // backgroundColor: "blue",
    },
    contentArea: {
        // backgroundColor: "yellow",
        width: width * 390,
        fontSize: width * 20,
    },
    subseperator: {            // 구분자
        height: height * 1,
        backgroundColor: 'black',
        marginTop: 1,
        margin: 10,
    },
    miniButtonArea: {
        flexDirection: "row"
    },
    miniButton: {
        width: width * 40,
        height: height * 40,
        // backgroundColor:"red",

    },
    deleteButton: {
        width: width * 40,
        height: height * 40,
        flex: 1,
    },

    selectButton: {
        width: width * 40,
        height: height * 40,
        flex: 1,
    },

    addButton: {
        width: width * 40,
        height: height * 40,
        flex: 1,
    },
    memoList: {
        // backgroundColor:"green",
        flex: 1,
        alignItems: 'center',

    },
    memoButton: {
        backgroundColor: "#EEEEEE",
        width: width * 360,
        height: height * 100,
        alignItems: 'flex-start',
        paddingTop: height * 10,
        borderRadius: 15,
        paddingLeft: width * 10,
        marginBottom: 10,

    },
    memoTitleArea: {
        color: '#404040',
        flexDirection: "row",
        width: width * 150,
        alignItems: 'center',
    },
    memoTitle: {
        fontSize: width * 15,
    },
    memoImage: {
        width: width * 30,
        height: height * 25,
    },
    memoInfo: {
        marginTop: height * 7,
        color: '#404040',
    },
    buttonIcon: {

    },
    iconButton: { // 하단 아이콘 버튼 4개
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconImage: { // 하단 아이콘 버튼 4개 개별
        width: width * 65,
        height: height * 65,
        margin: width * 15,
    },
    dropdown: {
        height: height * 70,
        width: width * 100,
        paddingHorizontal: width * 8,
    },
    icon: {
        marginRight: width * 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: width * 22,
        top: height * 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: width * 14,
    },
    placeholderStyle: {
        fontSize: width * 16,
    },
    selectedTextStyle: {
        fontSize: width * 16,
    },
    iconStyle: {
        width: width * 20,
        height: height * 20,
    },
    inputSearchStyle: {
        height: height * 40,
        fontSize: width * 16,
    },
    dotImage: {
        flexDirection: "row",
        alignItems: 'flex-end',
        width: width * 20,
        height: height * 25,
    },
});