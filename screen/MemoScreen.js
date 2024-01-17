// MemoScreen.js
// 메모페이지
// 지연 part

import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Button,
    Alert,
    RefreshControl,
} from 'react-native';

import DialogInput from "react-native-dialog-input";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {colors, width, height} from './globalStyles'; //width,height 받아오기
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';


export default function MemoMainScreen({ }) {
    const data = [
        { label: '생성순', value: 1 },
        { label: '이름순', value: 0 },
    ];

    const navigation = useNavigation();
    const [visibleMoal, setVisibleModal] = useState(false);
    const [dialogVisibleFolderAdd, setDialogVisibleFolderAdd] = useState(false);
    const [folderList, setFolderList] = useState([]);
    const [memoList, setMemoList] = useState([]);
    const [userId, setId] = useState("");
    const [byCreate, setByCreate] = useState(1);
    const [byName, setByName] = useState(0); // 생성순, 이름순
    const [memoListHeight, setHeight] = useState();
    const [value, setValue] = useState({ label: '생성순', value: byCreate });
    const [isFocus, setIsFocus] = useState(false);
    const [folderId, setFolderId] = useState("");
    const apiUrlFolderAdd = "http://43.201.9.115:3000/create-folder";


    useEffect(() => {
        AsyncStorage.getItem('userId').then(userId => {
            const parsedUserId = JSON.parse(userId);
            setId(parsedUserId);
            fetchData(parsedUserId, byCreate, byName);
        });
    }, []);

    const fetchData = async (parsedUserId, byCreate, byName) => {

        try {
            const requestDataFolder = {
                userId: parsedUserId,
            };
            console.log("유저id: ", parsedUserId, " byCreate :", byCreate, " byName: ", byName);
            const requestDataMemo = {
                userId: parsedUserId,
                byCreate: byCreate,
                byName: byName
            };
            const responseFolder = await axios.post('http://43.201.9.115:3000/folder-memo', requestDataFolder);
            setFolderList(responseFolder.data.data);
            const responseMemo = await axios.post('http://43.201.9.115:3000/unfolder-memo', requestDataMemo);
            setMemoList(responseMemo.data.data);


            console.log("메모길이: ", memoList.length, " 메모 높이: ", memoListHeight);
            if (memoList.length > 3) {
                setHeight((responseMemo.data.data.length) * 120);
            }
            console.log(memoListHeight);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const moveToFolder = (folderId) => {
        console.log(folderId);
        saveIdF(folderId);
        // Your logic here
        navigation.navigate('MemoFolder');
    }
    const moveToMemo = (memoId) => {
        console.log(memoId);
        saveId(memoId);
        // Your logic here
        navigation.navigate('MemoFile');
    }

    //메모 이동용 save Id (폴더 없는 메모용)
    const saveId = async (memoId) => {
        try {
            // await AsyncStorage.setItem("userId", JSON.stringify(userId));
            await AsyncStorage.setItem("memoId", JSON.stringify(memoId));

            console.log('메모 아이디 저장 성공'); // 확인용
        } catch (e) {
            console.error(e);
        }
    }

    //폴더 이동용 save Id
    const saveIdF = async (folderId) => {
        try {
            // await AsyncStorage.setItem("userId", JSON.stringify(userId));
            await AsyncStorage.setItem("folderId", JSON.stringify(folderId));

            console.log('로그인 정보 저장 성공'); // 확인용
        } catch (e) {
            console.error(e);
        }
    }
    //폴더 추가 모달
    const folderAddAlert = () => {
        setVisibleModal(false);
        setDialogVisibleFolderAdd(true);
    }
    const folderAdd = async (inputText) => {
        const requestDataFolderAdd = {
            userId: userId,
            folderName: inputText
        };
        console.log(userId, inputText);
        const responseFolder = await axios.post(apiUrlFolderAdd, requestDataFolderAdd);
        Alert.alert(responseFolder.data["message"]);
        setDialogVisibleFolderAdd(false)
        fetchData(parsedUserId, byCreate, byName);

    }
    return (

        <View style={styles.container}>
            <DialogInput
                isDialogVisible={dialogVisibleFolderAdd}
                message={"추가하려는 폴더의 이름을 입력해주세요\n(=^･ω･^=)"}
                dialogStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                textInputProps={{
                    autoCorrect: false,
                    autoCapitalize: false,
                    maxLength: 10,
                }}
                title={"폴더 추가"}
                hintInput={"폴더명 입력"}
                initValueTextInput={""}
                submitText={'추가'}
                cancelText={'취소'}
                submitInput={(inputText) => {
                    if (inputText.trim() == " ")
                        Alert.alert('', '공백은 닉네임으로 사용할 수 없습니다.');
                    else
                        folderAdd(inputText);
                }}
                closeDialog={() => { setDialogVisibleFolderAdd(false) }}
            />
            {/* 부가 기능 모달 */}
            <Modal animationType="slide"
                transparent={true}
                visible={visibleMoal}
                onBackdropPress={() => setVisibleModal(false)}>
                <View style={styles.constainerModelStyle}>
                    <View style={styles.viewModalStyle}>
                        {/*Modal 부가 기능 버튼 모음*/}
                        <Button title='폴더 추가' color="black" onPress={() => folderAddAlert()}></Button>
                        <View style={styles.subseperatorModal} />
                        <Button title='메모 추가' color="black"></Button>
                        <View style={styles.subseperatorModal} />
                        <Button title='폴더 선택 삭제' color="black"></Button>
                        <View style={styles.subseperatorModal} />
                        <Button title='메모 선택 삭제' color="black"></Button>
                        <View style={styles.subseperatorModal} />
                        <Button title='메모 선택 이동' color="black"></Button>
                        <View style={styles.subseperatorModalLast} />
                        {/* Modal 다이얼로그 숨기기 */}
                        <Button title='닫기' onPress={() => setVisibleModal(false)} />
                    </View>
                </View>
            </Modal>

            <View style={styles.titleArea}>
                <Text style={styles.title}>Memo</Text>
            </View>
            <View style={styles.folderListArea}>
                <ScrollView
                    horizontal
                    contentContainerStyle={{...styles.scrollViewFolder,
                        alignItems: 'flex-start',
                        width:(folderList.length==1 ?  folderList.length*390*width: (folderList.length==2?(folderList.length-1)*390*width:folderList.length*180*width))}}
                    showsHorizontalScrollIndicator={false}
                >
                    {/*폴더 리스트*/}
                    {folderList.map((folder, index) => (
                        <TouchableOpacity
                            style={styles.folderButton}
                            onPress={() => moveToFolder(folder.folderId)}
                            key={index}
                        >
                            <View style={styles.folderTitleArea}>
                                <Image
                                    style={styles.folderImage}
                                    source={require('../assets/icons/memo/Memo_main_folderIcon.png')}
                                /><Text style={styles.folderTitle} numberOfLines={1}>{
                                    folder.folderName}</Text>
                                <TouchableOpacity style={styles.miniButton}>
                                    <Image
                                        style={styles.dotImage}
                                        source={require('../assets/icons/ThreeDot.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.folderInfo}>메모 {folder.memoCount}개</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.subseperator} />
            <View style={styles.buttonSort}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(selectedValue) => {
                        let create = 0;
                        let name = 0;
                        if (selectedValue["label"] === "이름순") {
                            create = 0;
                            name = 1;
                            setByName(1);
                            setByCreate(0);
                        }

                        else if (selectedValue["label"] === "생성순") {
                            create = 1;
                            name = 0;
                            setByName(0);
                            setByCreate(1);
                        }

                        fetchData(userId, create, name);
                        console.log(selectedValue);
                        setValue(selectedValue);
                    }}
                />
                <View style={styles.miniButtonArea}>
                    <TouchableOpacity style={styles.miniButton} onPress={() => setVisibleModal(true)}>
                        <Image style={styles.selectButton}
                            source={require('../assets/icons/memo/Memo_main_sort.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.memoListArea}>
                <ScrollView
                    vertical
                    //memoList.length
                    contentContainerStyle={{
                        ...styles.scrollViewMemo,
                        // height: memoListHeight,
                        backgroundColor:"green",
                        height:(memoList.length==1 ?  memoList.length*115*height: memoList.length*115*height)
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    {/*메모 리스트*/}
                    {memoList.map((memo, index) => (
                        <TouchableOpacity
                            style={styles.memoButton}
                            onPress={() => moveToMemo(memo.memoId)}
                            key={index}
                        >
                            <View style={styles.memoTitleArea}>
                                <Image
                                    style={styles.memoImage}
                                    source={require('../assets/icons/memo/Memo_main_folderIcon.png')}
                                /><Text style={styles.memoTitle}>{
                                    memo.memoName}</Text>
                                <Image
                                    style={styles.dotImage}
                                    source={require('../assets/icons/ThreeDot.png')}
                                /></View>
                            {/*Text 길이제한*/}
                            <Text style={styles.memoInfo} numberOfLines={3}>{memo.content}</Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
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
                    onPress={() => navigation.navigate('Memo')}>
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
    );
}

const styles = StyleSheet.create({
    styleModal: {
        height: height*1000,

    },
    constainerModelStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewModalStyle: {
        flex: 0.5,
        borderRadius: 15,
        borderColor: '#cccccc',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        padding: width*5,
        alignItems: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: width*20,
    },
    titleArea: {
        alignItems: 'center',
        backgroundColor: "white",
        justifyContent: 'center',
        marginBottom: height*20,
        flex: 0.22,
        // backgroundColor: "red"
    },
    title: {
        fontSize: width*40,
    },
    folderListArea: {
        flexDirection: "row",
        flex: 0.22,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: "green",
        flexDirection: 'column',
    },
    scrollViewFolder: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: height*5,
        height: height*126,
        // backgroundColor: "blue",

    },
    scrollViewMemo: {
        alignItems: 'center',
        // backgroundColor:"yellow",
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    folderButton: {
        backgroundColor: "#EEEEEE",
        width: width*170,
        height: height*120,
        alignItems: 'flex-start',
        paddingTop: width*15,
        borderRadius: 15,
        marginRight: width*10,
        paddingLeft: width*10,
    },
    folderTitleArea: {
        color: '#404040',
        flexDirection: "row",
        width: width*140,
        alignItems: 'center',
        // backgroundColor:'pink',
    },
    folderTitle: {
        fontSize: width*17,
        width: width*100,
    },
    folderImage: {
        width: width*30,
        height: height*25,
    },
    dotImage: {
        flexDirection: "row",
        alignItems: 'flex-end',
        width: width*20,
        height: height*25,
    },
    folderInfo: {
        marginTop: 10,
        color: '#404040',
    },
    memoListArea: {
        flex: 0.5,
        // backgroundColor: "blue",
    },
    subseperator: {            // 구분자, 구분선
        height: height*1,
        backgroundColor: 'black',
        marginTop: height*5,

    },

    subseperatorModal: {            // 모달 안 구분자, 구분선
        height: height*1,
        backgroundColor: 'grey',
        width: width*150,
    },
    subseperatorModalLast: {            // 모달 안 구분자, 구분선 / 맨 마지막
        marginTop: height*5,
        marginBottom: height*5,
        height: height*1,
        backgroundColor: 'black',
        width: width*200,
    },

    miniButtonArea: {
        flexDirection: "row",
        marginTop: height*5,
        alignItems: 'flex-end',
        marginRight: width*30,
        marginBottom: height*6,


    },
    buttonSort: {
        height: height*50,
        width: width*400,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: "pink"
    },
    miniButton: {
        width: width*40,
        height: height*40,
        // backgroundColor:"red",

    },
    deleteButton: {
        width: width*40,
        height: height*40,
        flex: 1,
    },

    selectButton: {
        width: width*40,
        height: height*40,
        flex: 1,
    },

    addButton: {
        width: 40,
        height: height*40,
        flex: 1,
    },
    memoList: {
        // backgroundColor:"green",
        flex: 1,
        alignItems: 'center',

    },
    memoButton: {
        backgroundColor: "#EEEEEE",
        width: width*380,
        height: height*100,
        alignItems: 'flex-start',
        paddingTop: height*15,
        borderRadius: 15,
        marginRight: width*10,
        paddingLeft: width*10,
        marginBottom: height*10,
    },
    memoTitleArea: {
        color: '#404040',
        flexDirection: "row",
        width: width*150,
        alignItems: 'center',
    },
    memoTitle: {
        fontSize: width*15,
        width: width*290,

    },
    memoImage: {
        width: width*30,
        height: height*25,
        marginRight: width*7,
    },
    memoInfo: {
        fontSize: width*13,
        marginTop: height*7,
        color: '#404040',
        width: width*345,
    },
    buttonIcon: {

    },
    iconButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconImage: {
        width: width*55,
        height: height*55,
        margin: width*12,
    },
    dropdown: {
        height: height*70,
        width: width*100,
        alignItems: 'flex-end',
        paddingHorizontal: width*8,
    },
    icon: {
        marginRight: width*5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: width*22,
        top: width*8,
        zIndex: 2,  //쌓이는 요소의 개수
        paddingHorizontal: width*8,
        fontSize: width*14,
    },
    placeholderStyle: {
        fontSize: width*16,
    },
    selectedTextStyle: {
        fontSize: width*17,
    },
    iconStyle: {
        width: width*20,
        height: height*20,
    },
    inputSearchStyle: {
        height: height*40,
        fontSize: width*16,
    },

});