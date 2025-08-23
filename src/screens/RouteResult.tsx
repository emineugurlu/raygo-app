// src/screens/RouteResult.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/Styles';

type Props = StackScreenProps<RootStackParamList, 'RouteResult'>;

export default function RouteResult({ navigation, route }: Props) {
  // ⬇️ selectedCity ve selectedSystem'ı da al
  const { startStation, endStation, selectedCity, selectedSystem } = route.params;

  const duration = 32;
  const transferCount = 1;
  const transferInfo = 'Kızılay';

  return (
    <View style={styles.container}>
      {/* 🔙 Geri Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        // ⬇️ RouteSelect parametre beklediği için ikisini de geri gönderiyoruz
        onPress={() => navigation.navigate('RouteSelect', { selectedCity, selectedSystem })}
        // Alternatif: sadece geri gitmek istersen => onPress={() => navigation.goBack()}
      >
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      {/* Logo – sağ üst köşe */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Tren GIF */}
      <Image
        source={require('../../assets/Tren-gif.gif')}
        style={styles.trainImage}
      />

      {/* Mavi arka plan */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Rota Bilgileri</Text>

        {/* Beyaz kart */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.icon}>🚆</Text>
            <Text style={styles.infoText}>Başlangıç: {startStation}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.icon}>🚉</Text>
            <Text style={styles.infoText}>Bitiş: {endStation}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.icon}>⏱</Text>
            <Text style={styles.infoText}>Tahmini Süre: {duration} dk</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.icon}>🔧</Text>
            <Text style={styles.infoText}>
              Aktarma: {transferCount} ({transferInfo})
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center' },

  logo: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 78,
    height: 78,
    resizeMode: 'contain',
    zIndex: 2,
  },

  trainImage: {
    width: 360,
    height: 360,
    marginTop: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },

  headerCard: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0077b6',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    marginTop: 8,
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },

  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 90,
  },

  infoCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },

  icon: { fontSize: 20, marginRight: 10, color: '#888888' },
  infoText: { fontSize: 18, color: '#888888', fontWeight: '600' },

  // 🔙 Geri butonu
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
    width: 14,
    height: 14,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#1c6ba4',
    transform: [{ rotate: '45deg' }],
  },
});
