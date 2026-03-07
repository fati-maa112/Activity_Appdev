import { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { userLoginRequest } from '../../app/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(s => s.auth);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    let hasError = false;
    if (!emailAdd.trim()) {
      setEmailError('Please enter your username.');
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      hasError = true;
    }

    if (hasError) return;

    dispatch(userLoginRequest({ username: emailAdd.trim(), password: password.trim() }));
  };

  useEffect(() => {
    if (data) {
      navigation.reset({ index: 0, routes: [{ name: ROUTES.HOME }] });
    }
  }, [data, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      accessible
      accessibilityLabel="Login Screen"
    >
      <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
        <Text style={styles.brand}>NATURAE</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputIconRow}>
            <MaterialIcons name="person" size={22} color={OLIVE_DK} style={styles.inputIcon} />
            <CustomTextInput
              label="Username"
              placeholder="Username"
              value={emailAdd}
              onChangeText={val => setEmailAdd(val)}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              accessible
              accessibilityLabel="Username Input"
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputIconRow}>
            <MaterialIcons name="lock" size={22} color={OLIVE_DK} style={styles.inputIcon} />
            <CustomTextInput
              label="Password"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={val => setPassword(val)}
              containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
              textStyle={styles.inputText}
              accessible
              accessibilityLabel="Password Input"
            />
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          activeOpacity={0.85}
          accessible
          accessibilityLabel="Login Button"
        >
          {isLoading ? <ActivityIndicator color={WHITE} size="small" /> : <Text style={styles.loginBtnText}>Log In</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotWrap} accessible accessibilityLabel="Forgot Login">
          <Text style={styles.forgotText}>Forgot Login?</Text>
        </TouchableOpacity>

        <View style={styles.supportWrap}>
          <Text style={styles.supportTitle}>Contact Support</Text>
          <View style={styles.supportRow}>
            <Text style={styles.supportLink}>📞 Phone</Text>
            <Text style={styles.supportDivider}>  |  </Text>
            <Text style={styles.supportLink}>✉️ Email</Text>
          </View>
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)} accessible accessibilityLabel="Register Link">
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

// Color palette
const BG = '#fffdf9';
const SAND = '#c9b79c';
const OLIVE = '#6a7b5a';
const OLIVE_LT = '#a3b194';
const OLIVE_DK = '#4d5d43';
const WHITE = '#ffffff';
const ACCENT = '#d7ccc8';
const INPUT_BG = '#fcfcfb';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  brand: { color: OLIVE_DK, fontSize: 40, fontWeight: '900', textAlign: 'center', letterSpacing: 3, marginBottom: 56, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }) },
  form: { marginBottom: 32 },
  label: { color: OLIVE_DK, fontSize: 14, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 },
  inputContainer: { width: '100%', marginBottom: 22, backgroundColor: INPUT_BG, borderRadius: 12, borderWidth: 1, borderColor: ACCENT, paddingHorizontal: 10, paddingVertical: 6 },
  inputText: { fontSize: 16, color: OLIVE_DK, paddingHorizontal: 10, paddingVertical: 12 },
  inputIconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  inputIcon: { marginRight: 8 },
  errorText: { color: '#d32f2f', fontSize: 13, marginBottom: 8, marginLeft: 8 },
  loginBtn: { backgroundColor: OLIVE_DK, borderRadius: 12, paddingVertical: 18, alignItems: 'center', marginBottom: 24, shadowColor: OLIVE_DK, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  loginBtnText: { color: WHITE, fontSize: 18, fontWeight: '800', letterSpacing: 1 },
  forgotWrap: { alignItems: 'center', marginBottom: 28 },
  forgotText: { color: SAND, fontSize: 14, fontWeight: '500' },
  supportWrap: { alignItems: 'center', borderTopWidth: 1, borderTopColor: ACCENT, paddingTop: 18, marginBottom: 28 },
  supportTitle: { color: OLIVE_DK, fontSize: 13, fontWeight: '600', marginBottom: 6 },
  supportRow: { flexDirection: 'row', alignItems: 'center' },
  supportLink: { color: SAND, fontSize: 13 },
  supportDivider: { color: ACCENT, fontSize: 13 },
  registerRow: { flexDirection: 'row', justifyContent: 'center' },
  registerText: { color: OLIVE_LT, fontSize: 14 },
  registerLink: { color: OLIVE_DK, fontSize: 14, fontWeight: '700' },
});

export default Login;