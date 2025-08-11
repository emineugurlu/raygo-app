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
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from '../constants/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'RouteSelect'>;

type District = { id: string; name: string };

export default function RouteSelect({ navigation }: Props) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [startDistrict, setStartDistrict] = useState('');
  const [endDistrict, setEndDistrict] = useState('');
  const [loading, setLoading] = useState(false);

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        // Mock veri
        const data: District[] = [
          { id: '1', name: 'Kadıköy' },
          { id: '2', name: 'Üsküdar' },
          { id: '3', name: 'Beşiktaş' },
          { id: '4', name: 'Fatih' },
          { id: '5', name: 'Bakırköy' },
          { id: '6', name: 'Şişli' },
        ];
        setDistricts(data);
      } catch (error) {
        Alert.alert('Hata', 'İlçeler yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  const handleRoute = () => {
    if (!startDistrict || !endDistrict) {
      Alert.alert('Uyarı', 'Lütfen başlangıç ve bitiş ilçelerini seçiniz.');
      return;
    }
    Alert.alert(
      'Seçimler',
      `Başlangıç: ${startDistrict}\nBitiş: ${endDistrict}`
    );
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

      {/* Tren + gradyan daire */}
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
        {/* Başlangıç İlçesi */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setStartOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownIcon}>🚆</Text>
          <Text
            style={[
              styles.dropdownText,
              !startDistrict && styles.placeholderText,
            ]}
          >
            {startDistrict || 'Başlangıç İlçesi Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        {/* Bitiş İlçesi */}
        <TouchableOpacity
          style={[styles.dropdownButton, { marginTop: 35 }]} // boşluk artırıldı
          onPress={() => setEndOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownIcon}>🏁</Text>
          <Text
            style={[
              styles.dropdownText,
              !endDistrict && styles.placeholderText,
            ]}
          >
            {endDistrict || 'Bitiş İlçesi Seçiniz'}
          </Text>
          {renderArrow()}
        </TouchableOpacity>

        {/* Buton */}
        <TouchableOpacity style={styles.button} onPress={handleRoute}>
          <Text style={styles.buttonText}>Rota Öner →</Text>
        </TouchableOpacity>

        {/* Bilgilendirme yazısı */}
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
            <Text style={styles.modalTitle}>Başlangıç İlçesi</Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView>
                {districts.map((d) => (
                  <TouchableOpacity
                    key={d.id}
                    style={styles.modalItem}
                    onPress={() => {
                      setStartDistrict(d.name);
                      setStartOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{d.name}</Text>
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
            <Text style={styles.modalTitle}>Bitiş İlçesi</Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView>
                {districts.map((d) => (
                  <TouchableOpacity
                    key={d.id}
                    style={styles.modalItem}
                    onPress={() => {
                      setEndDistrict(d.name);
                      setEndOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{d.name}</Text>
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
    alignItems: 'flex-start',
    marginTop: 64,
    marginBottom: 8,
  },
  gradCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    marginLeft: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  train: { width: 400, height: 480 },
  form: { marginTop: 60, paddingHorizontal: 20 },
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
  dropdownIcon: {
    fontSize: 20,
    marginRight: 8,
  },
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
});
