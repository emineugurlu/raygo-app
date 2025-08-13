// src/screens/Register.tsx
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet,
  Modal, Pressable, ScrollView
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

  // Gizlilik modalı
  const [policyVisible, setPolicyVisible] = useState(false);

  const handleRegister = async () => {
    setError(null);
    if (!name || !email || !password || !passwordAgain) return setError('Tüm alanları doldurun');
    if (password !== passwordAgain) return setError('Şifreler uyuşmuyor');
    if (!checked) return setError('Gizlilik politikasını kabul etmelisiniz.');

    try {
      // Önce mevcut kullanıcıyı kontrol et
      const methods = await firebaseAuth.fetchSignInMethodsForEmail(email.trim());
      if (methods.length > 0) {
        return setError('Bu e-posta ile zaten bir hesap var.');
      }

      await firebaseAuth.createUserWithEmailAndPassword(email.trim(), password);
      if (firebaseAuth.currentUser) {
        await firebaseAuth.currentUser.updateProfile({ displayName: name.trim() });
      }
      navigation.replace('Login');
    } catch (err: any) {
      setError(err?.message || 'Kayıt sırasında bir hata oluştu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Geri Butonu (çizim ile) --- */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Onboarding4')}>
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      {/* Arka plan baloncuklar */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.circleLargeDark, { top: -160, left: -100 }]} />
        <View style={[styles.circleSmallBlue, { top: -20, right: -20 }]} />
        <View style={[styles.circleLargeDark, { bottom: -150, right: -110 }]} />
        <View style={[styles.circleSmallBlue, { bottom: -10, left: -20 }]} />
      </View>

      <View style={styles.content}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

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

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder="E- Posta"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            inputMode="email"
          />
        </View>

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

        {/* Gizlilik politikası + checkbox */}
        <View style={styles.privacyContainer}>
          <CheckBox
            value={checked}
            onValueChange={setChecked}
            tintColors={{ true: COLORS.button, false: '#bbb' }}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.privacyText}>
            <Text
              style={styles.privacyLink}
              onPress={() => setPolicyVisible(true)}
            >
              Gizlilik politikası
            </Text>{' '}
            okudum, kabul ediyorum.
          </Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {/* --- Hesap var mı? --- */}
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <Text style={{ fontSize: 13, color: '#333' }}>Zaten hesabın var mı? </Text>
          <Text
            style={{
              color: COLORS.button,
              textDecorationLine: 'underline',
              fontWeight: '700',
              fontSize: 13
            }}
            onPress={() => navigation.navigate('Login')}
          >
            Giriş yap
          </Text>
        </View>
      </View>

      {/* ---- Modal: Gizlilik Politikası ---- */}
      <Modal
        animationType="fade"
        transparent
        visible={policyVisible}
        onRequestClose={() => setPolicyVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setPolicyVisible(false)}>
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>Gizlilik Politikası</Text>
            <ScrollView style={{ maxHeight: 260 }} showsVerticalScrollIndicator>
              <Text style={styles.modalText}>
                Bu uygulama, kullanıcı verilerini yalnızca hizmetleri sunmak ve
                iyileştirmek amacıyla işler. Kayıt sırasında toplanan ad, e-posta ve
                kimlik bilgileri üçüncü taraflarla paylaşılmaz. Hesabınızı dilediğiniz
                zaman silebilir, verilerinizin silinmesini talep edebilirsiniz.
                {'\n\n'}
                Uygulama çökme analizi, performans ölçümü gibi amaçlarla anonim
                istatistikler toplayabilir. Politika zaman içinde güncellenebilir.
              </Text>
            </ScrollView>

            <TouchableOpacity style={styles.modalBtn} onPress={() => setPolicyVisible(false)}>
              <Text style={styles.modalBtnText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  logo: { width: 200, height: 100, resizeMode: 'contain', marginBottom: 28 },

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
  icon: { fontSize: 22, marginRight: 8 },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.title,
    paddingVertical: 14,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },

  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 2,
    width: '100%',
  },
  privacyText: { fontSize: 13, color: '#333', flex: 1, flexWrap: 'wrap' },
  privacyLink: { color: COLORS.button, textDecorationLine: 'underline', fontWeight: '700' },

  button: {
    width: '100%',
    backgroundColor: COLORS.button,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    shadowColor: '#1c6ba4',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: { color: COLORS.white, fontSize: FONT_SIZES.title, fontFamily: FONTS.bold, fontWeight: FONT_WEIGHTS.bold },
  error: { color: '#e22', marginBottom: 8, marginTop: 4, fontWeight: '700' },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  modalBtn: {
    marginTop: 14,
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: COLORS.button,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

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