import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Modal, ScrollView, ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONT_WEIGHTS } from '../constants/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const STATIONS = [
  { id: 'yenikapi', name: 'Yenikapı' },
  { id: 'aksaray', name: 'Aksaray' },
  { id: 'emniyet', name: 'Emniyet - Fatih' },
];

type Props = StackScreenProps<RootStackParamList, 'RouteSelect'>;
type Station = { id: string; name: string };

export default function RouteSelect({ navigation, route }: Props) {
  const { selectedCity, selectedSystem } = route.params;

  const [stations, setStations] = useState<Station[]>([]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [loading, setLoading] = useState(false);

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // 🔵 Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setStations(STATIONS);
    setLoading(false);
  }, []);

  const handleRoute = () => {
    if (!startStation || !endStation) {
      setAlertMessage('Lütfen başlangıç ve bitiş duraklarını seçiniz.');
      setAlertVisible(true);
      return;
    }
    if (startStation === endStation) {
      setAlertMessage('Başlangıç ve bitiş durakları aynı olamaz.');
      setAlertVisible(true);
      return;
    }
    navigation.navigate('RouteResult', { startStation, endStation, selectedCity, selectedSystem });
  };

  const canProceed = !!startStation && !!endStation && startStation !== endStation;
  const renderArrow = () => <View style={styles.arrowDown} />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CitySelect')}>
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.heroRow}>
        <LinearGradient colors={['#003450', COLORS.button]} start={{ x: 0.21, y: 0.21 }} end={{ x: 0.85, y: 0.85 }} style={styles.gradCircle}>
          <Image source={require('../../assets/train.png')} style={styles.train} resizeMode="cover" />
        </LinearGradient>
      </View>

      <View style={styles.form}>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setStartOpen(true)} activeOpacity={0.8}>
          <Text style={styles.dropdownIcon}>🚆</Text>
          <Text style={[styles.dropdownText, !startStation && styles.placeholderText]}>
            {startStation || 'Başlangıç Durağı Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.dropdownButton, { marginTop: 35 }]} onPress={() => setEndOpen(true)} activeOpacity={0.8}>
          <Text style={styles.dropdownIcon}>🏁</Text>
          <Text style={[styles.dropdownText, !endStation && styles.placeholderText]}>
            {endStation || 'Bitiş Durağı Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !canProceed && { opacity: 0.5 }]} onPress={handleRoute} disabled={!canProceed}>
          <Text style={styles.buttonText}>Rota Öner →</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>Şehir: {selectedCity} • Sistem: {selectedSystem}</Text>
      </View>

      {/* Başlangıç Modal */}
      <Modal visible={startOpen} transparent animationType="fade" onRequestClose={() => setStartOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Başlangıç Durağı</Text>
            {loading ? <ActivityIndicator /> : (
              <ScrollView>
                {stations.map((s) => (
                  <TouchableOpacity key={s.id} style={styles.modalItem} onPress={() => { setStartStation(s.name); setStartOpen(false); }}>
                    <Text style={styles.modalItemText}>{s.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity style={styles.modalClose} onPress={() => setStartOpen(false)}>
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bitiş Modal */}
      <Modal visible={endOpen} transparent animationType="fade" onRequestClose={() => setEndOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Bitiş Durağı</Text>
            {loading ? <ActivityIndicator /> : (
              <ScrollView>
                {stations.map((s) => (
                  <TouchableOpacity key={s.id} style={styles.modalItem} onPress={() => { setEndStation(s.name); setEndOpen(false); }}>
                    <Text style={styles.modalItemText}>{s.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity style={styles.modalClose} onPress={() => setEndOpen(false)}>
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔵 Custom Alert */}
      <Modal visible={alertVisible} transparent animationType="fade" onRequestClose={() => setAlertVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Uyarı</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffecf' },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  chevronLeft: { width: 12, height: 12, borderLeftWidth: 3, borderBottomWidth: 3, borderColor: '#1c6ba4', transform: [{ rotate: '45deg' }] },
  logo: { position: 'absolute', top: 0, right: 15, width: 81, height: 81, resizeMode: 'contain', zIndex: 2 },
  heroRow: { marginTop: 130, justifyContent: 'center', alignItems: 'center' },
  gradCircle: { width: 180, height: 180, borderRadius: 90, justifyContent: 'center', alignItems: 'center' },
  train: { width: 120, height: 120 },
  form: { flex: 1, paddingHorizontal: 30, paddingTop: 50 },
  dropdownButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#145C9E', borderRadius: 25, backgroundColor: '#f0f0f0', paddingHorizontal: 10, height: 50 },
  dropdownText: { flex: 1, fontSize: 16, color: '#333' },
  placeholderText: { color: '#777' },
  dropdownIcon: { fontSize: 20, marginRight: 8 },
  arrowDown: { width: 0, height: 0, marginLeft: 4, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#145C9E' },
  button: { backgroundColor: '#0077B6', paddingVertical: 12, borderRadius: 25, marginTop: 50, alignItems: 'center', elevation: 3 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  infoText: { marginTop: 20, fontSize: 14, color: '#555', textAlign: 'center' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  modalCard: { width: '100%', maxHeight: '70%', backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#145C9E' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#145C9E', marginBottom: 12, textAlign: 'center' },
  modalItem: { paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e3e3e3' },
  modalItemText: { fontSize: 16, color: '#222' },
  modalClose: { marginTop: 10, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#145C9E' },
  modalCloseText: { color: '#fff', fontWeight: '700' },

  // 🔵 Alert
  alertCard: { width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#145C9E' },
  alertTitle: { fontSize: 18, fontWeight: '700', color: '#145C9E', marginBottom: 10 },
  alertMessage: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 15 },
  alertButton: { backgroundColor: '#145C9E', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10 },
  alertButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
