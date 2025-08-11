// src/screens/RouteSelect.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function RouteSelect() {
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');

  const handleRoute = () => {
    console.log(`Başlangıç: ${startText} | Bitiş: ${endText}`);
  };

  return (
    
    <SafeAreaView style={styles.container}>
       {/* --- Geri Butonu (çizim ile) --- */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <View style={styles.chevronLeft} />
            </TouchableOpacity>
      {/* Logo sağ üst */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Tren + gradyan daire */}
      <View style={styles.heroRow}>
        <LinearGradient
          colors={['#003450', COLORS.button]}
          start={{ x: 0.21, y: 0.21 }}
          end={{ x: 0.85, y: 0.85 }}
          style={styles.gradCircle}
        >
          <Image
            source={require('../../assets/train.png')}
            style={styles.train}
            resizeMode="cover"
          />
        </LinearGradient>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Başlangıç */}
        <View style={[styles.inputWrapper, { marginTop: 0 }]}>
          <Text style={styles.inputIcon}>🚆</Text>
          <TextInput
            value={startText}
            onChangeText={setStartText}
            placeholder="Başlangıç Yeri Giriniz"
            placeholderTextColor="#8A8A8A"
            style={styles.input}
          />
          <MaterialIcons name="arrow-drop-down" size={24} color="#0077B6" />
        </View>

        {/* Bitiş */}
        <View style={[styles.inputWrapper, { marginTop: 50 }]}>
          <Text style={styles.inputIcon}>🚆</Text>
          <TextInput
            value={endText}
            onChangeText={setEndText}
            placeholder="Bitiş Yeri Giriniz"
            placeholderTextColor="#8A8A8A"
            style={styles.input}
          />
          
        </View>

        {/* Buton */}
        <TouchableOpacity style={styles.button} onPress={handleRoute}>
          <Text style={styles.buttonText}>Rota Öner →</Text>
        </TouchableOpacity>

        <Text style={styles.info}>
          Başlangıç ve varış noktalarını gir, sana en hızlı güzergahı önerelim!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop:80,
  },
  logo: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 78,
    height: 78,
    resizeMode: 'contain',
    zIndex: 2,
  },
  heroRow: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 64,
    marginBottom: 8,
  },
  gradCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
   
    marginLeft: -30, // kesik görünüm efekti
    alignItems: 'center',
    justifyContent: 'center',
  },
  train: {
    width: 400, // daireden büyük
    height: 480,
    
  },
  form: {
    marginTop: 90,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderWidth: 1.5,
    borderColor: '#1c6ba4',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 12,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.title,
    color: '#000',
  },
  button: {
    marginTop: 50,
    backgroundColor: COLORS.button,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
 buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  info: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 15,
    fontWeight: FONT_WEIGHTS.bold,
    color: '#03045E',
    
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLeft: {
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#1c6ba4',
    transform: [{ rotate: '45deg' }],
  },
});
