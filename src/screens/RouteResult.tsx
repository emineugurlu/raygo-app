// src/screens/RouteResult.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/Styles';

type Props = StackScreenProps<RootStackParamList, 'RouteResult'>;

export default function RouteResult({ route }: Props) {
  const { startStation, endStation } = route.params;

  const duration = 32;
  const transferCount = 1;
  const transferInfo = 'Kızılay';

  return (
    <View style={styles.container}>
      {/* Logo – sağ üst köşe */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* GIF animasyonu */}
      <Image
        source={require('../../assets/Tren-gif.gif')}
        style={styles.trainImage}
      />

      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Rota Bilgileri</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.emoji}>🚆</Text>
            <Text style={styles.infoText}>Başlangıç: {startStation}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.emoji}>🏁</Text>
            <Text style={styles.infoText}>Bitiş: {endStation}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.emoji}>⏱</Text>
            <Text style={styles.infoText}>Tahmini Süre: {duration} dk</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.emoji}>🔄</Text>
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

  // sağ üst logo
  logo: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 78,
    height: 78,
    resizeMode: 'contain',
    zIndex: 2,
  },

  // tren gif – görseldeki gibi daha kompakt
  trainImage: {
    width: 470,
    height: 370,
    marginTop: 64,
    resizeMode: 'contain',
  },

  // mavi alan – üstü kavisli, aşağıya kadar iner
  headerCard: {
    flex: 1,
    width: '100%',
    height:570,
    backgroundColor: '#0077b6',
    borderTopLeftRadius: 65,
    borderTopRightRadius: 65,
    marginTop: 18,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },

  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },

  // içteki beyaz kart – ekran görüntüsüne yakın görünüm
  infoCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 18,
    width: '85%',
    marginTop: 86,
    // hafif gölge
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  emoji: { fontSize: 18, marginRight: 8 },
  infoText: { fontSize: 16, color: '#555' },
});
