import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { FIREBASE_AUTH } from '../app/(tabs)/firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/(tabs)/index';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as AuthSession from 'expo-auth-session'; // Import AuthSession

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Google OAuth Config
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '700651700284-teat2q324npsaoba0f3l90lof0gpm4df.apps.googleusercontent.com', // Replace with your client ID from Firebase Console
  });

  // Facebook OAuth Config
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '1012504764006552', // Thay thế bằng ID ứng dụng Facebook của bạn
    redirectUri: AuthSession.makeRedirectUri(),
  });
  // Handle the Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(FIREBASE_AUTH, credential);
        Alert.alert('Đăng nhập thành công với Google!');
        navigation.navigate('Welcome');
      }
    } catch (error) {
      Alert.alert('Đăng nhập Google thất bại', error.message);
    }
  };

  // Handle the Facebook login
  // Handle the Facebook login
  // Handle the Facebook login
const handleFacebookLogin = async () => {
  try {
    const result = await fbPromptAsync();
    if (result?.type === 'success') {
      const { access_token } = result.params;
      const credential = FacebookAuthProvider.credential(access_token);
      await signInWithCredential(FIREBASE_AUTH, credential);

      // Facebook login success, navigate to Welcome screen
      Alert.alert('Đăng nhập thành công với Facebook!');
      navigation.navigate('Welcome');  // Ensure 'Welcome' is a valid route in your navigation
    }
  } catch (error: any) {
    Alert.alert('Đăng nhập Facebook thất bại', error.message);
  }
};



  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      navigation.navigate('Welcome');
    } catch (error: any) {
      Alert.alert('Đăng nhập thất bại', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      {/* User Avatar */}
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.yAVSgO4QJeRR67_Aca7newHaHa?rs=1&pid=ImgDetMain' }} // Placeholder or fetched avatar
        style={styles.avatar}
      />

      {/* Email Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="blue" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
      </View>

      {/* Password Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="blue" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      {/* Google Login Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={!request}
      >
        <Icon name="google" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.googleButtonText}>Đăng nhập bằng Google</Text>
      </TouchableOpacity>

      {/* Facebook Login Button */}
      <TouchableOpacity
        style={styles.facebookButton}
        onPress={handleFacebookLogin}
        disabled={!fbRequest}
      >
        <Icon name="facebook" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.facebookButtonText}>Đăng nhập bằng Facebook</Text>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'red',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'blue',
  },
  button: {
    height: 50,
    backgroundColor: 'blue',
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
  googleButton: {
    height: 50,
    backgroundColor: '#db4437',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
  },
  facebookButton: {
    height: 50,
    backgroundColor: '#3b5998',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  facebookButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
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
