// src/screens/Places.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS } from '../constants/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'Places'>;

const { width: W, height: H } = Dimensions.get('window');
const CARD_BORDER = '#D6E1F2';
const MAP_HEIGHT = Math.max(240, H * 0.36);

export default function Places({ navigation }: Props) {
  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={styles.container}>
      {/* Sol üst: geri (mavi ince chevron) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Geri"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      {/* Sağ üst: logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Üst: Harita */}
      <View style={{ height: MAP_HEIGHT }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.055,
            longitudeDelta: 0.055,
          }}
          showsUserLocation
        >
          <Marker coordinate={{ latitude: 41.0102, longitude: 28.9789 }} title="Tarihi Yer: Çeşme" />
          <Marker coordinate={{ latitude: 41.0352, longitude: 28.9832 }} title="En İşlek Kafe: NOİA" />
          <Marker coordinate={{ latitude: 41.0593, longitude: 28.9948 }} title="AVM: Cevahir" />
          <Marker coordinate={{ latitude: 41.0476, longitude: 29.0101 }} title="Park: Nejat Uygur" />
        </MapView>
      </View>

      {/* Alt: mavi panel (sadece sol üst köşe oval) */}
      <View style={styles.bottomPanel}>
        {/* Başlık sağda + emoji */}
        <View style={styles.headerRow}>
          <Text style={styles.heading}>📍 Gezilecek Yerler</Text>
        </View>

        {/* Gri kart (ikonlar MANUEL emoji) */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.emoji}>🏛️</Text>
            <Text style={styles.rowText}>Tarihi Yer: Çeşme</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.emoji}>☕</Text>
            <Text style={styles.rowText}>En İşlek Kafe: NOİA</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.emoji}>🛍️</Text>
            <Text style={styles.rowText}>AVM: Cevahir</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.emoji}>🌳</Text>
            <Text style={styles.rowText}>Park: Nejat Uygur</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Dairenin dışında kalan alan sarı
  container: { flex: 1, backgroundColor: COLORS.background }, // #FFFFCC

  // Sol üst chevron (mavi, arka plansız)
  backButton: {
    position: 'absolute',
    top: 35,
    left: 31,
    zIndex: 10,
  },
  chevronLeft: {
    width: 14,
    height: 14,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: COLORS.button, // mavi
    transform: [{ rotate: '45deg' }],
    borderRadius: 1.5,
  },

  // Sağ üst logo
  logo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 84,
    height: 84,
    resizeMode: 'contain',
    zIndex: 10,
  },

  // Mavi panel (sol üst kavis)
  bottomPanel: {
    flex: 1,
    backgroundColor: COLORS.button,   // #0077B6
    borderTopLeftRadius: 620,         // sadece sol-üst köşe oval
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 24,
    paddingHorizontal: 18,
  },

  // Başlık
  headerRow: {
    alignSelf: 'flex-end',
    marginRight: 55,
    marginTop: 100,
  },
  heading: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 25,
    textAlign: 'right',
  },

  // Gri kart
  card: {
    width: W * 0.86,
    alignSelf: 'center',
    marginTop: 120,
    backgroundColor: '#F0F3F7',
    borderColor: CARD_BORDER,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 18,
    marginLeft: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  emoji: { fontSize: 20, marginRight: 10 },
  rowText: { color: COLORS.text, fontSize: 15, fontWeight: '600', flex: 1 },
});
