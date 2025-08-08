// src/screens/Register.tsx
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/Styles';
import { firebaseAuth } from '../services/firebase';

type Props = StackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    if (!name || !email || !password || !passwordAgain) {
      setError('Tüm alanları doldurun'); return;
    }
    if (password !== passwordAgain) {
      setError('Şifreler uyuşmuyor'); return;
    }
    if (!checked) {
      setError('Gizlilik politikasını kabul etmelisiniz.'); return;
    }
    try {
      await firebaseAuth.createUserWithEmailAndPassword(email.trim(), password);
      if (firebaseAuth.currentUser) {
        await firebaseAuth.currentUser.updateProfile({ displayName: name.trim() });
      }
      // Başarılı kayıt -> dilediğin ekrana geç
      navigation.replace('Onboarding4'); // veya navigation.replace('Login') / 'Home'
    } catch (err: any) {
      setError(err?.message || 'Kayıt sırasında bir hata oluştu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        {/* Ad Soyad */}
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="Adı Soyadı"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* E-posta */}
<View style={styles.inputContainer}>
  <Text style={styles.icon}>📧</Text>
  <TextInput
    style={styles.input}
    placeholder="E-Posta"
    placeholderTextColor="#666"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}             // otomatik düzeltmeyi kapat
    textContentType="emailAddress"  // iOS ve Android'de doğru klavye
    inputMode="email"               // Android 13+ için
  />
</View>


        {/* Şifre */}
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Şifre Giriniz"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(v => !v)}>
            <Text style={styles.icon}>{passwordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Şifre Tekrar */}
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Şifreyi Tekrar Giriniz"
            placeholderTextColor="#666"
            value={passwordAgain}
            onChangeText={setPasswordAgain}
            secureTextEntry={!passwordVisible2}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisible2(v => !v)}>
            <Text style={styles.icon}>{passwordVisible2 ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Gizlilik politikası */}
        <View style={styles.privacyContainer}>
          <CheckBox
            value={checked}
            onValueChange={setChecked}
            tintColors={{ true: COLORS.button, false: '#bbb' }}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.privacyText}>
            Gizlilik politikasını okudum, kabul ediyorum.
          </Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 20, width: '100%' },
  logo: { width: 180, height: 80, resizeMode: 'contain', marginBottom: 28 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 10, borderWidth: 1, borderColor: '#1c6ba4',
    marginBottom: 14, paddingHorizontal: 12, width: '100%',
  },
  icon: { fontSize: 22, marginRight: 8 },
  input: {
    flex: 1, fontSize: FONT_SIZES.title, paddingVertical: 14,
    fontFamily: FONTS.bold, color: COLORS.text,
  },
  privacyContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, marginTop: 2, width: '100%' },
  privacyText: { fontSize: 13, color: '#333', flex: 1, flexWrap: 'wrap' },
  button: {
    width: '100%', backgroundColor: COLORS.button, borderRadius: 10,
    paddingVertical: 14, alignItems: 'center', marginTop: 12, marginBottom: 18,
    shadowColor: '#1c6ba4', shadowOpacity: 0.14, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 4
  },
  buttonText: { color: COLORS.white, fontSize: FONT_SIZES.title, fontFamily: FONTS.bold, fontWeight: FONT_WEIGHTS.bold },
  error: { color: '#e22', marginBottom: 8, marginTop: 4, fontWeight: '700' }
});
