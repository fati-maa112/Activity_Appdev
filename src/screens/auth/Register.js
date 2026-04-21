import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../utils';
import { userRegister, resetRegister } from '../../app/reducers/auth';

const COLORS = {
  primary: '#c45114',
  secondary: '#f97316',
  background: '#f5f6fa',
  card: '#ffffff',
  inputBg: '#e2e8f0',
  textDark: '#1e293b',
  textLight: '#ffffff',
  error: '#ff4d4d',
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    state => state.auth.register,
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetRegister());
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [isSuccess]);

  const handleRegister = () => {
    if (!username || !password) return;
    dispatch(userRegister({ username, password }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to get started with our app
          </Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>Register</Text>

          {/* USERNAME */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, isError && styles.inputError]}
              placeholder="Enter password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {isError && (
            <Text style={styles.errorText}>Registration failed. Try again.</Text>
          )}

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>

          {/* LOGIN LINK */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },

  header: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary },
  subtitle: { fontSize: 16, color: '#64748b', marginTop: 5, textAlign: 'center' },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  formTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 20 },

  inputWrapper: { marginBottom: 18 },
  label: { fontSize: 14, color: '#475569', marginBottom: 6 },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  inputError: { borderColor: COLORS.error },

  errorText: { color: COLORS.error, fontSize: 12, marginTop: -10, marginBottom: 10 },

  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: COLORS.textLight, fontSize: 16, fontWeight: 'bold' },

  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { color: '#64748b', fontSize: 14 },
  footerLink: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
});

export default Register;