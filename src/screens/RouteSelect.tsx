// src/screens/RouteSelect.tsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
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
  // CitySelect'ten gelen parametreler
  const { selectedCity, selectedSystem } = route.params;

  const [stations, setStations] = useState<Station[]>([]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [loading, setLoading] = useState(false);

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // 🔵 Custom Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setStations(STATIONS);
      } catch {
        Alert.alert('Hata', 'Duraklar yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 🔵 Custom alert göster
  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setAlertVisible(true);
  };

  const handleRoute = () => {
    if (!startStation || !endStation) {
      showAlert('Lütfen başlangıç ve bitiş duraklarını seçiniz.');
      return;
    }
    if (startStation === endStation) {
      showAlert('Başlangıç ve bitiş durakları aynı olamaz.');
      return;
    }

    navigation.navigate('RouteResult', {
      startStation,
      endStation,
      selectedCity,
      selectedSystem,
    });
  };

  const renderArrow = () => <View style={styles.arrowDown} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('CitySelect')}
      >
        <View style={styles.chevronLeft} />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Tren + gradyan daire (sola dayalı) */}
      <View style={styles.heroRow}>
        <LinearGradient
          colors={['#003450', COLORS.button]}
          start={{ x: 0.21, y: 0.21 }}
          end={{ x: 0.85, y: 0.85 }}
          style={styles.gradCircle}
        >
          <Image
            source={require('../../assets/train.png')}
            style={styles.train}
            resizeMode="cover"
          />
        </LinearGradient>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Başlangıç */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setStartOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownIcon}>🚆</Text>
          <Text
            style={[
              styles.dropdownText,
              !startStation && styles.placeholderText,
            ]}
          >
            {startStation || 'Başlangıç Durağı Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        {/* Bitiş */}
        <TouchableOpacity
          style={[styles.dropdownButton, { marginTop: 35 }]}
          onPress={() => setEndOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownIcon}>🏁</Text>
          <Text
            style={[
              styles.dropdownText,
              !endStation && styles.placeholderText,
            ]}
          >
            {endStation || 'Bitiş Durağı Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        {/* Buton */}
        <TouchableOpacity style={styles.button} onPress={handleRoute}>
          <Text style={styles.buttonText}>Rota Öner →</Text>
        </TouchableOpacity>

        {/* Bilgilendirme */}
        <Text style={styles.infoText}>
          Başlangıç ve varış noktalarını gir, sana en hızlı güzergahı önerelim!
        </Text>
      </View>

      {/* Başlangıç Modal */}
      <Modal
        visible={startOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setStartOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Başlangıç Durağı</Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView>
                {stations.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    style={styles.modalItem}
                    onPress={() => {
                      setStartStation(s.name);
                      setStartOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{s.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setStartOpen(false)}
            >
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bitiş Modal */}
      <Modal
        visible={endOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setEndOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Bitiş Durağı</Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView>
                {stations.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    style={styles.modalItem}
                    onPress={() => {
                      setEndStation(s.name);
                      setEndOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{s.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setEndOpen(false)}
            >
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔵 Custom Alert Modal */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertBackdrop}>
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Uyarı</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 80 },

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
    alignItems: 'flex-start', // sola hizalı
    marginTop: 64,
    marginBottom: 8,
    paddingLeft: -20, // biraz içeriden başlasın
  },
  gradCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    marginLeft: -18, // kenara taşma efekti
    alignItems: 'center',
    justifyContent: 'center',
  },
  train: { width: 400, height: 480 },

  form: { marginTop: 40, paddingHorizontal: 20 },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1c6ba4',
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    height: 50,
  },
  dropdownIcon: { fontSize: 20, marginRight: 8 },
  dropdownText: { flex: 1, fontSize: 16, color: '#333' },
  placeholderText: { color: '#777' },
  arrowDown: {
    width: 0,
    height: 0,
    marginLeft: 4,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#145C9E',
  },

  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  infoText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#03045E',
    fontWeight: FONT_WEIGHTS.bold,
  },

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
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#1c6ba4',
    transform: [{ rotate: '45deg' }],
  },

  // Liste modal stilleri
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#145C9E',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#145C9E',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e3e3e3',
  },
  modalItemText: { fontSize: 16, color: '#222' },
  modalClose: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#145C9E',
  },
  modalCloseText: { color: '#fff', fontWeight: '700' },

  // 🔵 Custom Alert stilleri (ikinci görseldeki gibi)
  alertBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#145C9E',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#145C9E',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  alertButton: {
    backgroundColor: '#145C9E',
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
