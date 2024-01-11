import { StyleSheet, View, Text } from "react-native";
import BasicButton from "./BasicButton";
import BasicModal from "./BasicModal";
import DatePicker from "react-native-date-picker"; // 날짜 스크롤 모달 라이브러리 import

function SelectMonthModal({
  year,
  modalVisible,
  setModalVisible,
  moveToSpecificYearAndMonth,
}) {
  const monthList = Array.from({ length: 12 }, (v, i) => i + 1 + "월");
  const handlePressYear = (year, month) => {
    moveToSpecificYearAndMonth(year, month);
    setModalVisible(false);
  };
  return (
    <>
      <BasicModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        padding={12}
      >
        <View style={S.modalContaner}>
          {monthList.map((month) => (
            <View style={S.button} key={month}>
              <BasicButton
                title={month}
                fontSize={12}
                color={"white"}
                height={40}
                onPress={handlePressYear.bind(
                  this,
                  year,
                  Number(month.slice(0, 1))
                )}
              />
            </View>
          ))}
        </View>
      </BasicModal>
    </>
  );
}

const S = StyleSheet.create({
  modalContaner: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginHorizontal: 4,
    marginVertical: 2,
    width: "30%",
  },
});
export default SelectMonthModal;