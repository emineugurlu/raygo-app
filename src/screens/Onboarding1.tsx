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
          onPress={() => navigation.navigate('Onboarding2')} // 👈 GEÇİŞ BURADA!
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
  image: ImageStyle;
  title: TextStyle;
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
