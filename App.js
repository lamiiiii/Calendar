// Main이라 할 화면

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
    /*<View style={styles.container}>
      <Text>안녕 안녕 반가워</Text>
      <StatusBar style="auto" />
    </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
