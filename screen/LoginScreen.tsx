import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../app/(tabs)/firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/(tabs)/index'; 

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>(); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert('Đăng nhập thành công!');
      navigation.navigate('Welcome'); 
    } catch (error: any) {
      Alert.alert('Đăng nhập thất bại', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Đăng Ký Tài Khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Quên Mật Khẩu?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa', // màu nền tươi sáng
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#00796b', // màu tiêu đề đẹp
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    borderColor: '#00796b', // viền xanh nhẹ
    borderWidth: 1,
  },
  button: {
    height: 50,
    backgroundColor: '#00796b', // màu xanh đậm
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: '#00796b',
    fontSize: 18,
    marginBottom: 10,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#e57373', 
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
