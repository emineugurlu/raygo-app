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

const COLORS = {
  bg: '#FFFECF',          // sayfa arka planı
  navy: '#0D2B45',        // koyu lacivert
  blue: '#0077B6',        // mavi
  inputBorder: '#1c6ba4',
  inputBg: '#EDEDED',
  white: '#FFFFFF',
};

export default function RouteSelect() {
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');

  const handleRoute = () => {
    console.log(`Başlangıç: ${startText} | Bitiş: ${endText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo sağ üst */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Tren + gradyan daire (sola yaslı) */}
      <View style={styles.heroRow}>
        <LinearGradient
          colors={['#003450', '#0077B6']}
          start={{ x: 0.21, y: 0.21 }}
          end={{ x: 0.85, y: 0.85 }}
          style={styles.gradCircle}
        >
          <Image
            source={require('../../assets/train.png')}
            style={styles.train}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>

      {/* Form alanı — biraz aşağıda */}
      <View style={styles.form}>
        {/* Başlangıç */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🚆</Text>
          <TextInput
            value={startText}
            onChangeText={setStartText}
            placeholder="Başlangıç Yeri Giriniz"
            placeholderTextColor="#8A8A8A"
            style={styles.input}
          />
        </View>

        {/* Bitiş */}
        <View style={[styles.inputWrapper, { marginTop: 16 }]}>
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
          <Text style={styles.buttonText}>Rota Öner</Text>
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
    backgroundColor: COLORS.bg,
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
    paddingRight: 300,    // sola yaslama boşluğu
    marginTop: 64,      // üstten uzaklık
    marginBottom: 8,
  },
  gradCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  train: {
    width: 185,
    height: 185,
    marginLeft: -8,     // görseli hafif sola kaydır
  },

  form: {
    marginTop: 18,      // alanları aşağı indir
    paddingHorizontal: 20,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
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
    fontSize: 16,
    color: '#000',
  },

  button: {
    marginTop: 22,
    backgroundColor: '#0077B6', // buton rengi koyu lacivert
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
  buttonText: {
    color: COLORS.white,  // istersen lacivert yazı istiyorsan COLORS.navy yap
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  info: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
    fontWeight: '700',
    color: '#1c1c1c',
  },
});
