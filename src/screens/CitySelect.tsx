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
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = StackScreenProps<RootStackParamList, 'CitySelect'>;

export default function CitySelect({ navigation }: Props) {
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [selectedSystem, setSelectedSystem] = useState('Metro');

  const handleContinue = () => {
    Alert.alert('Seçimler', `Şehir: ${selectedCity}, Sistem: ${selectedSystem}`);
    // navigation.navigate('RouteScreen'); // ileride rota ekranına geçilecek
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst sol kareler */}
      <View style={styles.topLeftSquares}>
        <View style={[styles.square, styles.squareLarge, { backgroundColor: '#0D2B45' }]} />
        <View style={[styles.square, styles.squareMedium, { backgroundColor: '#145C9E', marginLeft: 20, marginTop: -20 }]} />
        <View style={[styles.square, styles.squareSmall, { backgroundColor: '#0D2B45', marginLeft: 40, marginTop: -20 }]} />
      </View>

      {/* Logo sağ üst */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      {/* Alt sağ kareler */}
      <View style={styles.bottomRightSquares}>
        <View style={[styles.square, styles.squareLarge, { backgroundColor: '#0D2B45' }]} />
        <View style={[styles.square, styles.squareMedium, { backgroundColor: '#145C9E', marginRight: 20, marginBottom: -20 }]} />
        <View style={[styles.square, styles.squareSmall, { backgroundColor: '#0D2B45', marginRight: 40, marginBottom: -20 }]} />
      </View>

      {/* Orta içerik */}
      <View style={styles.content}>
        <Text style={styles.label}>Şehir Seçiniz</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            style={styles.picker}
          >
            <Picker.Item label="İstanbul" value="İstanbul" />
            <Picker.Item label="Ankara" value="Ankara" />
            <Picker.Item label="İzmir" value="İzmir" />
          </Picker>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Sistem Seçiniz</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSystem}
            onValueChange={(value) => setSelectedSystem(value)}
            style={styles.picker}
          >
            <Picker.Item label="Metro" value="Metro" />
            <Picker.Item label="Tren" value="Tren" />
            <Picker.Item label="Tramvay" value="Tramvay" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Devam Et →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffecf',
  },
  topLeftSquares: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  bottomRightSquares: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'flex-end',
    zIndex: 1,
  },
  square: {
    borderRadius: 12,
  },
  squareLarge: { width: 80, height: 80 },
  squareMedium: { width: 70, height: 70 },
  squareSmall: { width: 60, height: 60 },
  logo: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 80,
    height: 40,
    resizeMode: 'contain',
    zIndex: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    zIndex: 3,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#145C9E',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
