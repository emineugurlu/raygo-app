import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  TextStyle
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS
} from '../constants/Styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding3'>;
};

export default function Onboarding3({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Image
          source={require('../../assets/karşılama-turu-resim-3.png')} // Görsel yolunu kendi dosyana göre ayarla!
          style={styles.image}
        />
        <Text style={styles.title}>
          En yakın istasyonu saniyeler içinde bul!
        </Text>
        <View style={styles.indicator}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive]} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Onboarding4')}
        >
          <Text style={styles.buttonText}>
            Devam Et
            <Text style={styles.arrow}> →</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  logo: ImageStyle;
  image: ImageStyle;
  title: TextStyle;
  indicator: ViewStyle;
  dot: ViewStyle;
  dotActive: ViewStyle;
  dotInactive: ViewStyle;
  footer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  arrow: TextStyle;
};

const styles = StyleSheet.create<Styles>({
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
  logo: {
    width: 280,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  image: {
    width: 420,
    height: 340,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: 32
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  dotActive: {
    backgroundColor: COLORS.text
  },
  dotInactive: {
    backgroundColor: '#a0a0a0'
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold
  },
  arrow: {
    fontSize: FONT_SIZES.arrow,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.extraBold,
    marginLeft: 8
  }
});
