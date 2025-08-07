// App.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from './src/services/firebase';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const App = () => {
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    const ref = db.collection('test').doc('ping');

    // 1) Firestore’a yaz
    ref
      .set({
        msg: 'Merhaba Firestore!',
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .catch((err: any) => console.error('Yazma hatası:', err));

    // 2) Firestore’dan oku ve state’e set et
    const unsubscribe = ref.onSnapshot(
      (doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
        // Burada exists() metodunu çağırıyoruz:
        if (doc.exists()) {
          const data = doc.data() as { msg: string };
          setMsg(data.msg);
        }
      },
      (err: any) => console.error('Okuma hatası:', err),
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {msg
          ? `Firestore’a merhaba dedik: "${msg}"`
          : 'Bağlanıyor...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 16, textAlign: 'center' },
});

export default App;
