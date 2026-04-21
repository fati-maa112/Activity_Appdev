import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../utils';
// 1. MATCHED IMPORT: Changed resetAuthState to resetLogin
import { userLogin } from '../../app/reducers/auth';

const COLORS = {
  forest:      '#1a2e1a',
  moss:        '#4a6741',
  fern:        '#6b8f5e',
  sage:        '#8aab7a',
  dew:         '#dcebd4',
  cream:       '#faf7f2',
  white:       '#ffffff',
  gold:        '#c8a84b',
  goldLight:   '#e2c97a',
  textDark:    '#1a2e1a',
  textMuted:   '#a8b8a0',
  error:       '#c0392b',
  errorBg:     '#fdf0ef',
  inputBorder: 'rgba(107, 143, 94, 0.25)',
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 2. SELECTOR: Accessing your INITIAL_STATE properties
  const { isLoading, isError } = useSelector(state => state.auth);

  // 3. MOUNT RESET: This uses your USER_LOGIN_RESET case to clear the loading state

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') return;

    dispatch(
      userLogin({
        username: username.trim(),
        password: password,
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Decorative Background Shapes */}
          <View style={styles.bgShape1} />
          <View style={styles.bgShape2} />
          <View style={styles.bgShape3} />

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>🌿</Text>
            </View>
            <Text style={styles.appName}>NATURAE</Text>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          {/* LOGIN CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>User Login</Text>

            {/* USERNAME INPUT */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={[
                styles.inputGroup,
                focusedInput === 'username' && styles.inputGroupFocused
              ]}>
                <View style={styles.iconContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor={COLORS.textMuted}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            {/* PASSWORD INPUT */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[
                styles.inputGroup,
                focusedInput === 'password' && styles.inputGroupFocused,
                isError && styles.inputError
              ]}>
                <View style={styles.iconContainer}>
                  <Text style={styles.inputIcon}>🔒</Text>
                </View>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Text style={styles.eyeIconText}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {isError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>
                  Invalid credentials. Please try again.
                </Text>
              </View>
            )}

            {/* Remember Me & Forgot Password */}
            <View style={styles.controlsRow}>
              <TouchableOpacity style={styles.rememberMe}>
                <View style={styles.checkbox} />
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              style={[
                styles.loginButton, 
                isLoading && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator color={COLORS.white} />
                  <Text style={[styles.loginButtonText, { marginLeft: 10 }]}>SIGNING IN...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.loginButtonText}>LOG IN</Text>
                  <Text style={styles.loginArrow}>→</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* REGISTER LINK */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.REGISTER)}
              >
                <Text style={styles.registerLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.cream },
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  bgShape1: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: COLORS.sage, opacity: 0.08, top: -80, left: -80,
  },
  bgShape2: {
    position: 'absolute', width: 360, height: 360, borderRadius: 180,
    backgroundColor: COLORS.forest, opacity: 0.06, bottom: -120, right: -120,
  },
  bgShape3: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    backgroundColor: COLORS.gold, opacity: 0.07, top: '45%', left: '25%',
  },
  header: { alignItems: 'center', marginBottom: 24, zIndex: 10 },
  logoContainer: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.white,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
    shadowColor: COLORS.forest, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15, shadowRadius: 16, elevation: 10, borderWidth: 2, borderColor: COLORS.gold,
  },
  logoIcon: { fontSize: 38 },
  appName: { fontSize: 30, fontWeight: '800', color: COLORS.forest, letterSpacing: 8, marginBottom: 6 },
  welcomeText: { fontSize: 20, fontWeight: '600', color: COLORS.moss, marginBottom: 3 },
  subtitle: { fontSize: 13, color: COLORS.textMuted, fontWeight: '400' },
  card: {
    backgroundColor: COLORS.white, borderRadius: 28, padding: 24,
    shadowColor: COLORS.forest, shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 24, elevation: 14, borderWidth: 1, borderColor: COLORS.dew, zIndex: 99,
  },
  cardTitle: { fontSize: 22, fontWeight: '700', color: COLORS.forest, marginBottom: 20, textAlign: 'center' },
  inputWrapper: { marginBottom: 14 },
  inputLabel: { fontSize: 10, fontWeight: '800', color: COLORS.moss, marginBottom: 6, letterSpacing: 2, textTransform: 'uppercase' },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cream,
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 2, borderWidth: 1.5, borderColor: COLORS.inputBorder,
  },
  inputGroupFocused: { borderColor: COLORS.fern, backgroundColor: COLORS.white },
  inputError: { borderColor: COLORS.error, backgroundColor: COLORS.errorBg },
  iconContainer: { width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.dew, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, color: COLORS.textDark, fontSize: 15, paddingVertical: 12, fontWeight: '500' },
  eyeIcon: { padding: 6, marginLeft: 4 },
  eyeIconText: { fontSize: 18 },
  errorContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.errorBg,
    borderLeftWidth: 3, borderLeftColor: COLORS.error, borderRadius: 8, padding: 10, marginBottom: 12,
  },
  errorIcon: { fontSize: 14, marginRight: 8 },
  errorText: { color: COLORS.error, fontSize: 12, fontWeight: '600', flex: 1 },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  rememberMe: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderRadius: 5, borderWidth: 1.5, borderColor: COLORS.fern, marginRight: 8 },
  rememberText: { color: COLORS.textDark, fontSize: 13, fontWeight: '500' },
  forgotText: { color: COLORS.moss, fontSize: 13, fontWeight: '700' },
  loginButton: {
    backgroundColor: COLORS.forest, borderRadius: 12, paddingVertical: 15,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 18, elevation: 8, minHeight: 55,
  },
  loginButtonDisabled: { backgroundColor: COLORS.moss, opacity: 0.8 },
  loadingWrapper: { flexDirection: 'row', alignItems: 'center' },
  loginButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '800', letterSpacing: 2 },
  loginArrow: { color: COLORS.goldLight, fontSize: 18, fontWeight: '700', marginLeft: 8 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.dew },
  dividerText: { color: COLORS.textMuted, fontSize: 11, marginHorizontal: 12, fontWeight: '600', textTransform: 'uppercase' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { color: COLORS.textDark, fontSize: 14 },
  registerLink: { color: COLORS.moss, fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' },
});

export default Login;