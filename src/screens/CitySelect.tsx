// src/screens/CitySelect.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'CitySelect'>;

export default function CitySelect({ navigation }: Props) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('');

  const handleContinue = () => {
    Alert.alert(
      'Seçimler',
      `Şehir: ${selectedCity || 'Seçilmedi'}, Sistem: ${
        selectedSystem || 'Seçilmedi'
      }`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Geri Butonu (çizim ile) --- */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      {/* Üst sol kareler */}
      <View style={styles.topLeftSquares}>
        <View
          style={[
            styles.square,
            styles.squareLarge,
            { backgroundColor: '#0D2B45', marginRight: 15, marginBottom: 25 },
          ]}
        />
        <View
          style={[
            styles.square,
            styles.squareMedium,
            { backgroundColor: '#145C9E', marginLeft: -40 },
          ]}
        />
        <View
          style={[
            styles.square,
            styles.squareSmall,
            { backgroundColor: '#0D2B45', marginLeft: -20 },
          ]}
        />
      </View>

      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      {/* İçerik */}
      <View style={styles.content}>
        {/* Şehir seçimi */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.icon}>🏙</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Şehir Seçiniz" value="" />
            <Picker.Item label="İstanbul" value="İstanbul" />
            <Picker.Item label="Ankara" value="Ankara" />
            <Picker.Item label="İzmir" value="İzmir" />
          </Picker>
        </View>

        {/* Sistem seçimi */}
        <View style={[styles.pickerWrapper, { marginTop: 20 }]}>
          <Text style={styles.icon}>🚆</Text>
          <Picker
            selectedValue={selectedSystem}
            onValueChange={(itemValue) => setSelectedSystem(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sistem Seçiniz" value="" />
            <Picker.Item label="Metro" value="Metro" />
            <Picker.Item label="Tramvay" value="Tramvay" />
            <Picker.Item label="Tren" value="Tren" />
          </Picker>
        </View>

        {/* Devam Et butonu */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Devam Et →</Text>
        </TouchableOpacity>
      </View>

      {/* Alt sağ kareler */}
      <View style={styles.bottomRightSquares}>
        <View
          style={[
            styles.square,
            styles.squareLarge,
            { backgroundColor: '#145C9E' },
          ]}
        />
        <View
          style={[
            styles.square,
            styles.squareMedium,
            { backgroundColor: '#0D2B45', marginRight: -20, marginTop: 40 },
          ]}
        />
        <View
          style={[
            styles.square,
            styles.squareSmall,
            { backgroundColor: '#145C9E', marginRight: -20, marginTop: 80 },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffecf' },

  // Kare stilleri
  topLeftSquares: {
    position: 'absolute',
    top: -5,
    left: 0,
    flexDirection: 'row',
    zIndex: 1,
  },
  bottomRightSquares: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    flexDirection: 'row-reverse',
    zIndex: 1,
  },
  square: { borderRadius: 12 },
  squareLarge: { width: 155, height: 155 },
  squareMedium: { width: 116, height: 109 },
  squareSmall: { width: 78, height: 66 },

  // Logo
  logo: {
    position: 'absolute',
    top: 0,
    right: 15,
    width: 81,
    height: 81,
    resizeMode: 'contain',
    zIndex: 2,
  },

  // İçerik
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    zIndex: 3,
  },

  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#145C9E',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    height: 50,
  },
  picker: {
    flex: 1,
    color: '#333',
  },
  icon: { fontSize: 20, marginRight: 8 },

  // Buton
  button: {
    backgroundColor: '#145C9E',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 80,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Geri butonu (çizim ile)
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
