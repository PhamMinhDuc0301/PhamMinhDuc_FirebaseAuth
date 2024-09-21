import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../app/(tabs)/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert('Đăng ký thành công!');
      // Điều hướng đến màn hình đăng nhập hoặc chúc mừng (nếu cần)
    } catch (error: any) {
      Alert.alert('Đăng ký thất bại', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Tài Khoản</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
