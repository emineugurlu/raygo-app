// src/screens/Login.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/Styles';
import { firebaseAuth } from '../services/firebase';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const SAVED_EMAIL_KEY = 'raygo.saved_email';

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);

  // 1) Oturum açık mı? Açık ise direkt yönlendir.
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // isteğe göre burada kullanıcı adını vs. alabilirsin
        navigation.replace('CitySelect');
      }
    });
    return unsub;
  }, [navigation]);

  // 2) Daha önce kullanılan email'i getir (oturum kapalıysa kartta gösteririz)
  useEffect(() => {
    (async () => {
      try {
        const email = await AsyncStorage.getItem(SAVED_EMAIL_KEY);
        if (email) setSavedEmail(email);
      } catch {}
    })();
  }, []);

  const canSubmit = useMemo(
    () => username.trim().length > 0 && password.length > 0,
    [username, password]
  );

  // Not: Burada örnek; Firebase login bağlayınca signInWithEmailAndPassword çağır.
  const handleLogin = async () => {
    if (!canSubmit) {
      setError('Lütfen kullanıcı adı ve şifreyi giriniz.');
      return;
    }
    setError(null);

    // TODO: Firebase ile gerçek giriş:
    // await firebaseAuth.signInWithEmailAndPassword(username.trim(), password);

    // Giriş başarılıysa email'i sakla
    try {
      await AsyncStorage.setItem(SAVED_EMAIL_KEY, username.trim());
      setSavedEmail(username.trim());
    } catch {}

    navigation.replace('CitySelect');
  };

  const handleUseSaved = () => {
    if (!savedEmail) return;
    setUsername(savedEmail);
    setError(null);
    // şifre alanına odak
    requestAnimationFrame(() => passwordRef.current?.focus());
  };

  const handleClearSaved = async () => {
    try {
      await AsyncStorage.removeItem(SAVED_EMAIL_KEY);
      setSavedEmail(null);
    } catch {}
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Geri Butonu (çizim ile) --- */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Register')}
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

        {/* Kayıtlı Hesap Kartı (oturum kapalı + kayıtlı email varsa) */}
        {!!savedEmail && (
          <View style={styles.savedCard}>
            <View style={styles.savedRow}>
              <View style={styles.savedAvatar}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>
                  {savedEmail[0]?.toUpperCase() || 'U'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.savedEmail}>{savedEmail}</Text>
                <Text style={styles.savedDots}>{'•'.repeat(12)}</Text>
              </View>

              <TouchableOpacity style={styles.savedUseBtn} onPress={handleUseSaved}>
                <Text style={styles.savedUseText}>Devam Et</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.savedActions}>
              <TouchableOpacity onPress={handleClearSaved}>
                <Text style={styles.savedSecondary}>Hesabı değiştir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
            ref={passwordRef}
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

  // Kayıtlı hesap kartı
  savedCard: {
    width: '100%',
    backgroundColor: '#eef5fb',
    borderWidth: 1,
    borderColor: '#1c6ba4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1c6ba4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  savedEmail: {
    color: COLORS.text,
    fontWeight: '700',
  },
  savedDots: {
    color: '#777',
    marginTop: 2,
    letterSpacing: 2,
  },
  savedUseBtn: {
    backgroundColor: COLORS.button,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  savedUseText: { color: '#fff', fontWeight: '700' },
  savedActions: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  savedSecondary: {
    color: '#1c6ba4',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },

  // Inputlar
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

  // Geri butonunun çizimi
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
