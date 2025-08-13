// src/screens/Login.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/Styles';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = username.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
    if (!canSubmit) {
      setError('Lütfen kullanıcı adı ve şifreyi giriniz.');
      return;
    }
    setError(null);
    navigation.replace('CitySelect');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Geri Butonu --- */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      {/* Arka plan baloncuklar */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.circleLargeDark, { top: -160, left: -100 }]} />
        <View style={[styles.circleSmallBlue, { top: -20, right: -20 }]} />
        <View style={[styles.circleLargeDark, { bottom: -130, right: -110 }]} />
        <View style={[styles.circleSmallBlue, { bottom: -10, left: -20 }]} />
      </View>

      <View style={styles.content}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            placeholderTextColor="#666"
            value={username}
            onChangeText={(t) => {
              setUsername(t);
              if (error) setError(null);
            }}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Şifreniz"
            placeholderTextColor="#666"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (error) setError(null);
            }}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(v => !v)}>
            <Text style={styles.icon}>{passwordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, !canSubmit && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={!canSubmit}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  logo: { width: 200, height: 100, resizeMode: 'contain', marginBottom: 18 },

  circleLargeDark: {
    position: 'absolute',
    width: 320,
    height: 320,
    backgroundColor: '#0D2854',
    borderRadius: 9999,
    opacity: 0.95,
  },
  circleSmallBlue: {
    position: 'absolute',
    width: 92,
    height: 92,
    backgroundColor: '#1c6ba4',
    borderRadius: 9999,
    opacity: 0.95,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1c6ba4',
    marginBottom: 14,
    paddingHorizontal: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.title,
    paddingVertical: 14,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },
  icon: { fontSize: 20, marginLeft: 8 },

  registerRow: {
    flexDirection: 'row',
    marginBottom: 14,
    marginTop: 2,
  },
  registerText: { fontSize: 13, color: '#333' },
  registerLink: {
    color: COLORS.button,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.button,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#1c6ba4',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  error: {
    alignSelf: 'flex-start',
    color: '#e53935',
    marginBottom: 8,
    fontWeight: '700',
  },

  // Geri butonu stili
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chevronLeft: {
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#1c6ba4',
    transform: [{ rotate: '45deg' }]
  },
});
