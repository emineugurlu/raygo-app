import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/Styles';
import { firebaseAuth } from '../services/firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

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
      setError('Tüm alanları doldurun');
      return;
    }
    if (password !== passwordAgain) {
      setError('Şifreler uyuşmuyor');
      return;
    }
    if (!checked) {
      setError('Gizlilik politikasını kabul etmelisiniz.');
      return;
    }
    try {
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
      if (firebaseAuth.currentUser) {
        await firebaseAuth.currentUser.updateProfile({ displayName: name });
      }
      // Başarılı kayıt sonrası yönlendirme
    } catch (err: any) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu');
    }
  };

  // ... geri kalanı aynı kalabilir ...
}
