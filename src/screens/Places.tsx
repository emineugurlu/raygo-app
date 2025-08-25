// src/screens/Places.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Places() {
  return (
    <View style={styles.container}>
      {/* Üstte harita */}
      <View style={styles.mapWrap}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 41.0589,   // Mecidiyeköy
            longitude: 28.9873,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        />
      </View>

      {/* Altta mavi blok + başlık */}
      <View style={styles.bottom}>
        <Text style={styles.title}>Gezilecek Yerler</Text>
        <View style={styles.card}>
          <Text style={styles.row}>Tarihi Yer: -</Text>
          <Text style={styles.row}>Kafe: -</Text>
          <Text style={styles.row}>AVM: -</Text>
          <Text style={styles.row}>Park: -</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFCC' },
  mapWrap: { height: 260, width: '100%' },
  map: { height: '100%', width: '100%' },
  bottom: {
    flex: 1, backgroundColor: '#0077B6', borderTopLeftRadius: 55, borderTopRightRadius: 55,
    alignItems: 'center', paddingTop: 16,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#F0F0F0', width: '85%', borderRadius: 16, padding: 18 },
  row: { fontSize: 16, color: '#777', fontWeight: '700', marginBottom: 8 },
});
