// src/screens/Onboarding1.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, FONTS, FONT_SIZES } from '../constants/Styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding1'>;
};

export default function Onboarding1({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Şehrin raylı sistem rehberine hoş geldin!
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Onboarding2')}
        >
          <Text style={styles.buttonText}>Devam Et {'\u2192'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  image: {
    width: 250,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 40
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    textAlign: 'center'
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold
  }
});
