// CustomButton.js

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, width, height } from './screen/globalStyles'; //width,height 받아오기

export default class CustomButton extends Component{
    static defaultProps = {
        title: 'untitled',
        buttonColor: '#000',
        titleColor: '#fff',
        onPress: () => null,
      }

    constructor(props){
      super(props);
    }
  
    render(){
      return (
        <TouchableOpacity style={[
            styles.button,
            {backgroundColor: this.props.buttonColor}
        ]}
        onPress={this.props.onPress}>
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
        </TouchableOpacity>
      )
    }
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: height*55,
      width: width*340,
      marginBottom: width*10,
    },
    title: {
      fontSize: 17,
    },
  });