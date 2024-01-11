import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import isSameObj from "./isSameObj";
import SelectYearModal from "./SelectYearModal";
import SelectMonthModal from "./SelectMonthModal";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import DateTimePicker from "react-native-modal-datetime-picker";


function Calendar() {
  const DATE = new Date();  
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();
  const today = { year: YEAR, month: MONTH, date: DAY };

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [date, setDate] = useState(DAY);
  const [show, setShow] = useState(false);

  const moveToNextMonth = (month) => {
    if (month === 12) {
      setYear((previousYear) => previousYear + 1);
      setMonth(1);
    } else {
      setMonth((previousMonth) => previousMonth + 1);
    }
  };

  const moveToPreviousMonth = (month) => {
    if (month === 1) {
      setYear((previousYear) => previousYear - 1);
      setMonth(12);
    } else {
      setMonth((previousMonth) => previousMonth - 1);
    }
  };

  const moveToSpecificYearAndMonth = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <View style={S.calendarContainer}>
      <Header
        month={month}        
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
    <Body
      month={month}
      year={year}
      today={today}
      date={date}
      moveToNextMonth={moveToNextMonth}
      moveToPreviousMonth={moveToPreviousMonth}
      moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
    />
    </View>
    );
  }

export default Calendar;

// 일요일 빨간색 표시 구분
function isSunday(year, month, date) {
  const dayOfWeek = new Date(year, month - 1, date).getDay(); // 0 (일요일)부터 6 (토요일)까지의 값을 반환
  return dayOfWeek === 0;
}

function Header(props) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  
  const [date, onChangeDate] = useState(new Date()); // 선택 날짜
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false); // 모달 노출 여부
  
  const onPressDate = () => { // 날짜 클릭 시
    setMode('date'); // 모달 유형을 date로 변경
    setVisible(true); // 모달 open
  };
    
  const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
    setVisible(false); // 모달 close
    onChangeDate(selectedDate); // 선택한 날짜 변경
  };

  const onCancel = () => { // 취소 시
      setVisible(false); // 모달 close
    };

    return (
    <>
        <View style={S.header}>
            <Pressable
              onPress={props.moveToPreviousMonth.bind(this, props.month)}              
              style={({ pressed }) => pressed && S.pressed}>
                <Ionicons name="chevron-back" size={24} color="black"/>
            </Pressable>
        <View style={{ flexDirection: "row" }}>
        <Text>{props.year}년 {props.month}월 </Text>
        </View>
            <Pressable
              onPress={props.moveToNextMonth.bind(this, props.month)}
              style={({ pressed }) => pressed && S.pressed}>              
                <Ionicons name="chevron-forward" size={24} color="black" />
            </Pressable>
        </View>

        <DateTimePicker
            isVisible={visible}
            open={open}
            mode={date}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={date} />
        </>
      );
    }

//Year,Monty,date
function Body(props) {

  const [mark, setMark] = useState([]);

  const [totalDays, setTotalDays] = useState({});
  const [pressedDate, setPressedDate] = useState({
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });
  const { year, month, date } = props;
  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month, date]);

  const getTotalDays = (year, month) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate(); //이 전달의 마지막 날짜 체크
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay(); //이 전 달의 마지막 날짜의 요일
    const currentMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthLastDay = new Date(year, month, 0).getDay();
        
    const previousDays = Array.from(
      { length: previousMonthLastDay + 1 },
      (v, i) => previousMonthLastDate - previousMonthLastDay + i
      );
    const currentDays = Array.from(
      { length: currentMonthLastDate },
      (v, i) => i + 1
      );
      const nextDays = Array.from(
        { length: 6 - currentMonthLastDay },
        (v, i) => i + 1
        );
        setTotalDays({
          prev: {
            daysList: previousMonthLastDay !== 6 ? previousDays : [],
            year: month === 1 ? year - 1 : year,
            month: month === 1 ? 12 : month - 1,
          },
          curr: { daysList: currentDays, year: year, month: month },
          next: {
            daysList: nextDays,
            year: month === 12 ? year + 1 : year,
            month: month === 12 ? 1 : month + 1,
          },
        });
      };

      const handlePressDay = (pressedDate) => {
        setPressedDate(pressedDate);
        AsyncStorage.multiRemove("todayYear", "todayMonth", "todayDay"); // 선택 날짜 AstncStorage 초기화
        AsyncStorage.setItem("todayYear", JSON.stringify(pressedDate.year)); // AsyncStorage에 연도 정보 저장 (TodayYear)
        AsyncStorage.setItem("todayMonth", JSON.stringify(pressedDate.month)); // AsyncStorage에 달 정보 저장 (TodayMonth)
        AsyncStorage.setItem("todayDay", JSON.stringify(pressedDate.date));  // AsyncStorage에 날짜 정보 저장 (TodayDate)
        if (pressedDate.state === "prev" || pressedDate.state === "next") {
        props.moveToSpecificYearAndMonth(pressedDate.year, pressedDate.month);
    }
};
//{({ pressed }) => pressed && styles.pressedItem}
return (
    <View>
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((day, idx) => (
          <View style={S.box} key={idx}>
            <Text style={changeColorByDay(day).dayOfWeek}>{day}</Text>
          </View>
        ))}
      </View>
      
      <View style={S.totalDays}>
        {Object.keys(totalDays).map((state) =>
          totalDays[state].daysList.map((day) => {
            const checkPressedDate = {
              state: state,
              year: totalDays[state].year,
              month: totalDays[state].month,
              date: day,
            };
            return (
              <View style={S.box} key={uuidv4()}>
                <Pressable
                  onPress={handlePressDay.bind(this, checkPressedDate)}
                  style={({ pressed }) => {
                    return [
                      pressedDate.date === checkPressedDate.date &&
                      pressedDate.month === checkPressedDate.month &&
                      pressedDate.year === checkPressedDate.year
                        ? S.pressedDate
                        : null,
                      pressed && S.pressed,
                      ];
                  }
                }

                >
                  <Text
                    style={[
                      [
                        isSameObj(
                          { state: "curr", ...props.today },
                          checkPressedDate
                        )
                          ? S.today
                          : state === "prev" || state === "next"
                          ? S.prev
                          : S.curr,
                          isSunday(checkPressedDate.year, checkPressedDate.month, checkPressedDate.date) && state != "prev" && state != "next" // IsSunday이고, state가 prev 또는 next가 아니면 빨간색으로 표시
                          ? S.sundayText // 일요일이면 빨간색 스타일 적용
                          : null,
                      ],
                    ]}
                  >
                    {day}
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    minHeight: "50%",
    borderBottomColor: "black",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "center",
  },
  dayOfWeek: {
    flexDirection: "row",
  },
  totalDays: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "14.2%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 17,
  },
  prev: {
    color: "lightgray",
    fontSize: 14,
  },
  next: {
    color: "lightgray",
    fontSize: 14,
  },
  curr: {
    color: "#404040",
    fontSize: 14,
  },
  today: {
    width: 22,
    height: 22,
    color: "#404040",
    backgroundColor: "rgba(133, 190, 242, 0.5)",
    textAlign: 'center',
    borderRadius: 20,
  },
  pressedDate: {
    width: 22,
    height: 22,
    backgroundColor: "rgba(144, 144, 144, 0.5)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },
  sundayText: {
    color: 'red',
  },
});
const changeColorByDay = (day) =>
  StyleSheet.create({
    dayOfWeek: {
      color: day === "Sun" ? "red" : "#404040",
      fontSize: 15,
    },
  });