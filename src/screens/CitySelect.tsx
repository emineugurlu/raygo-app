import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'CitySelect'>;

const CITY_OPTIONS = ['İstanbul', 'Ankara', 'İzmir'];
const SYSTEM_OPTIONS = ['Metro', 'Tramvay', 'Tren'];

export default function CitySelect({ navigation }: Props) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('');

  const [cityOpen, setCityOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const renderArrow = () => <View style={styles.arrowDown} />;

  const handleContinue = () => {
    if (!selectedCity || !selectedSystem) {
      setAlertMessage('Lütfen şehir ve sistem seçiniz.');
      setAlertVisible(true);
      return;
    }
    navigation.navigate('RouteSelect', { selectedCity, selectedSystem });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      <View style={styles.topLeftSquares}>
        <View style={[styles.square, styles.squareLarge, { backgroundColor: '#0D2B45', marginRight: 15, marginBottom: 25 }]} />
        <View style={[styles.square, styles.squareMedium, { backgroundColor: '#145C9E', marginLeft: -40 }]} />
        <View style={[styles.square, styles.squareSmall, { backgroundColor: '#0D2B45', marginLeft: -20 }]} />
      </View>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.content}>
        <TouchableOpacity style={styles.pickerWrapper} activeOpacity={0.8} onPress={() => setCityOpen(true)}>
          <Text style={styles.icon}>🏙</Text>
          <Text style={[styles.pickerText, !selectedCity && styles.placeholderText]}>
            {selectedCity || 'Şehir Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pickerWrapper, { marginTop: 20 }]} activeOpacity={0.8} onPress={() => setSystemOpen(true)}>
          <Text style={styles.icon}>🚆</Text>
          <Text style={[styles.pickerText, !selectedSystem && styles.placeholderText]}>
            {selectedSystem || 'Sistem Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Devam Et →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRightSquares}>
        <View style={[styles.square, styles.squareLarge, { backgroundColor: '#145C9E' }]} />
        <View style={[styles.square, styles.squareMedium, { backgroundColor: '#0D2B45', marginRight: -20, marginTop: 40 }]} />
        <View style={[styles.square, styles.squareSmall, { backgroundColor: '#145C9E', marginRight: -20, marginTop: 80 }]} />
      </View>

      {/* Şehir Modal */}
      <Modal visible={cityOpen} transparent animationType="fade" onRequestClose={() => setCityOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Şehir Seçiniz</Text>
            <ScrollView>
              {CITY_OPTIONS.map((c) => (
                <TouchableOpacity key={c} style={styles.modalItem} onPress={() => { setSelectedCity(c); setCityOpen(false); }}>
                  <Text style={styles.modalItemText}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalClose} onPress={() => setCityOpen(false)}>
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sistem Modal */}
      <Modal visible={systemOpen} transparent animationType="fade" onRequestClose={() => setSystemOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sistem Seçiniz</Text>
            <ScrollView>
              {SYSTEM_OPTIONS.map((s) => (
                <TouchableOpacity key={s} style={styles.modalItem} onPress={() => { setSelectedSystem(s); setSystemOpen(false); }}>
                  <Text style={styles.modalItemText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalClose} onPress={() => setSystemOpen(false)}>
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Mavi Alert */}
      <Modal visible={alertVisible} transparent animationType="fade" onRequestClose={() => setAlertVisible(false)}>
        <View style={styles.alertBackdrop}>
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
  topLeftSquares: { position: 'absolute', top: -5, left: 0, flexDirection: 'row', zIndex: 1 },
  bottomRightSquares: { position: 'absolute', bottom: -10, right: 0, flexDirection: 'row-reverse', zIndex: 1 },
  square: { borderRadius: 12 },
  squareLarge: { width: 155, height: 155 },
  squareMedium: { width: 116, height: 109 },
  squareSmall: { width: 78, height: 66 },
  logo: { position: 'absolute', top: 0, right: 15, width: 81, height: 81, resizeMode: 'contain', zIndex: 2 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30, zIndex: 3 },
  pickerWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#145C9E', borderRadius: 25, backgroundColor: '#f0f0f0', paddingHorizontal: 10, height: 50 },
  pickerText: { flex: 1, fontSize: 16, color: '#333' },
  placeholderText: { color: '#777' },
  icon: { fontSize: 20, marginRight: 8 },
  arrowDown: { width: 0, height: 0, marginLeft: 4, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#145C9E' },
  button: { backgroundColor: '#0077B6', paddingVertical: 12, borderRadius: 25, marginTop: 80, alignItems: 'center', elevation: 3 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  chevronLeft: { width: 12, height: 12, borderLeftWidth: 3, borderBottomWidth: 3, borderColor: '#1c6ba4', transform: [{ rotate: '45deg' }] },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  modalCard: { width: '100%', maxHeight: '70%', backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#145C9E' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#145C9E', marginBottom: 12, textAlign: 'center' },
  modalItem: { paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e3e3e3' },
  modalItemText: { fontSize: 16, color: '#222' },
  modalClose: { marginTop: 10, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#145C9E' },
  modalCloseText: { color: '#fff', fontWeight: '700' },

  alertBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center' },
  alertCard: { width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#145C9E' },
  alertTitle: { fontSize: 18, fontWeight: '700', color: '#145C9E', marginBottom: 10 },
  alertMessage: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 15 },
  alertButton: { backgroundColor: '#145C9E', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10 },
  alertButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
