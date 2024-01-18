import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 불러오는 함수
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import isSameObj from "./isSameObj";
import SelectYearModal from "./SelectYearModal";
import SelectMonthModal from "./SelectMonthModal";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 정보 저장
import DateTimePicker from "react-native-modal-datetime-picker";


// 달력 메인페이지 구성 함수
function Calendar() {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();
  const today = { year: YEAR, month: MONTH, date: DAY };

  // 오늘 날짜 기본 저장
  AsyncStorage.multiRemove("todayYear", "todayMonth", "todayDay"); // 선택 날짜 AstncStorage 초기화
  AsyncStorage.setItem("todayYear", JSON.stringify(today.year)); // AsyncStorage에 연도 정보 저장 (TodayYear)
  AsyncStorage.setItem("todayMonth", JSON.stringify(today.month)); // AsyncStorage에 달 정보 저장 (TodayMonth)
  AsyncStorage.setItem("todayDay", JSON.stringify(today.date));  // AsyncStorage에 날짜 정보 저장 (TodayDate)

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [date, setDate] = useState(DAY);
  const [show, setShow] = useState(false);

  // 다음달 이동 버튼
  const moveToNextMonth = (month) => {
    if (month === 12) { // 현재가 12월이면, 다음 연도로 변경하고 1월로 설정
      setYear((previousYear) => previousYear + 1);
      setMonth(1);
    } else { // 나머지는 월만 변경 (+1)
      setMonth((previousMonth) => previousMonth + 1);
    }
  };

  // 이전달 이동 버튼
  const moveToPreviousMonth = (month) => {
    if (month === 1) { // 현재가 1월이면, 이전 연도로 변경하고 12월로 설정
      setYear((previousYear) => previousYear - 1);
      setMonth(12);
    } else { // 나머지는 월만 변경 (-1)
      setMonth((previousMonth) => previousMonth - 1);
    }
  };

  // 특정 연도, 달 이동 (아직 미구현)
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


// 일요일 빨간색 표시 구분 함수
function isSunday(year, month, date) {
  const dayOfWeek = new Date(year, month - 1, date).getDay(); // 0 (일요일)부터 6 (토요일)까지의 값을 반환
  return dayOfWeek === 0;
}

// 달력 메인페이지 헤더 구성 함수
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
        {/* 이전 달로 이동 버튼 */}
        <Pressable
          onPress={props.moveToPreviousMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>

        {/* 사용자가 설정한 특정 연도, 월, 날짜로 이동 버튼 */}
        <View style={{ flexDirection: "row" }}>
          <Text>{props.year}년 {props.month}월 </Text>
        </View>

        {/* 다음 달로 이동 버튼 */}
        <Pressable
          onPress={props.moveToNextMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </Pressable>
      </View>

      {/* <DateTimePicker
            isVisible={visible}
            open={open}
            mode={date}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={date} /> */}
    </>
  );
}



//Year,Month,date
function Body(props) {
  // 일정표시
  const [id, setId] = useState('');
  const [ScheduleId, setScheduleId] = useState('');
  const [ScheduleName, setScheduleName] = useState('');
  const [SchedulesList, setSchedulesList] = useState('');
  const [LabelColor, setLabelColor] = useState('');
  const [StartAmPm, setStartAmPm] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndYear, setEndYear] = useState('');
  const [EndMonth, setEndMonth] = useState('');
  const [EndDay, setEndDay] = useState('');
  const [EndAmPm, setEndAmPm] = useState('');
  const [EndTime, setEndTime] = useState('');

  // AsyncStorage로부터 userId 정보 가져오기
  useEffect(() => {
    AsyncStorage.getItem('userId').then(userId => {
      const parsedUserId = JSON.parse(userId); // 따옴표를 제거하기 위해 JSON 파싱
      setId(parsedUserId);
    });
  }, []);

  //   const returnSchedule = () => {

  //     //------------------------------------------------------------------
  //     // 보낼 데이터
  //     const requestData = {        
  //         userId: id,
  //         year: year,        
  //         month: month,        
  //         day: date,
  //     };
  //     const apiUrlS = 'http://43.201.9.115:3000/day-schedule'; // 이 페이지에서 day-schedule을 사용하는가? (month-schedule로 불러와야 하는가?)
  //     axios.post(apiUrlS, requestData)
  //     .then(response => {
  //         const scheduleList = response.data; // 어떤 형태로 가져오는지 잘 모르겠음
  //         setScheduleId(scheduleList.data[0]["scheduleId"]); //  ERROR  [TypeError: Cannot read property 'scheduleId' of undefined] 다음과 같은 에러 발생. 근데 이렇게 안 불러오면 아예 정보가 안 불러와짐..
  //         setScheduleName(scheduleList.data[0]["scheduleName"]);
  //         setLabelColor(scheduleList.data[0]["labelColor"]);
  //         setYear(scheduleList.data[0]["year"]);
  //         setMonth(scheduleList.data[0]["month"]);
  //         setDay(scheduleList.data[0]["day"]);
  //         setStartAmPm(scheduleList.data[0]["startAmPm"]);
  //         setStartTime(scheduleList.data[0]["startTime"]);
  //         setEndYear(scheduleList.data[0]["endYear"]);
  //         setEndMonth(scheduleList.data[0]["endMonth"]);
  //         setEndDay(scheduleList.data[0]["endDay"]);
  //         setEndAmPm(scheduleList.data[0]["endAmPm"]);
  //         setEndTime(scheduleList.data[0]["endTime"]);
  //     })
  //     .catch(error => {
  //         console.error(error);
  //     })
  // };

  // useEffect(() => {
  //   returnSchedule();
  // }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  // //------------------------------------------------------------------

  const [totalDays, setTotalDays] = useState({}); // 전체 날짜 저장
  const [pressedDate, setPressedDate] = useState({ // 선택 날짜 저장
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });
  const { year, month, date } = props;

  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month, date]);


  // 표시되는 날짜 전부 정보 불러오기 (첫째 주에 포함되는 이전 달의 날짜들, 현재 달의 날짜들,  마지막 주에 포함되는 다음 달의 날짜들)
  const getTotalDays = (year, month) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate(); // 이전 달의 마지막 날짜 저장
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay(); // 이전 달의 마지막 요일 저장
    const currentMonthLastDate = new Date(year, month, 0).getDate(); // 현재 날짜 저장
    const currentMonthLastDay = new Date(year, month, 0).getDay(); // 현재 요일 저장

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

    // totalDays에 저장
    setTotalDays({
      prev: { // 첫째 주에 포함되는 이전 달의 날짜들
        daysList: previousMonthLastDay !== 6 ? previousDays : [],
        year: month === 1 ? year - 1 : year,
        month: month === 1 ? 12 : month - 1,
      },
      curr: { daysList: currentDays, year: year, month: month }, // 현재 달의 날짜들
      next: { // 마지막 주에 포함되는 다음 달의 날짜들
        daysList: nextDays,
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
      },
    });
  };

  // 선택 날짜 정보 저장
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
    borderRadius: 11, // 반지름을 width와 height의 절반으로 설정
    textAlign: 'center',
    overflow: 'hidden', // overflow 속성 설정 (ios 설정을 위함)
    lineHeight: 22,
  },
  pressedDate: {
    width: 22,
    height: 22,
    backgroundColor: "rgba(144, 144, 144, 0.5)",
    borderRadius: 11,
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