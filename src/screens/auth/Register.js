import { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';               // ← added
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import {
  userRegisterRequest,
  userLoginRequest,
} from '../../app/actions';                                            // ← added
import { Animated, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // If not using Expo, use react-native-vector-icons

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(s => s.auth);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showError, setShowError] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      setShowError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setShowError('Passwords do not match.');
      return;
    }
    setShowError('');
    dispatch(userRegisterRequest({ username, email, password }));
  };

  useEffect(() => {
    if (data) {
      // after registration you might want to log the user in automatically
      dispatch(userLoginRequest({ username: email, password }));
      navigation.reset({ index: 0, routes: [{ name: ROUTES.HOME }] });
    }
  }, [data, dispatch, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      accessible accessibilityLabel="Register Screen"
    >
      <Animated.View style={[styles.inner, { opacity: fadeAnim }]}> {/* Fade-in animation */}
        {/* Brand */}
        <Text style={styles.brand}>NATURAE SKINCARE</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputIconRow}>
            <MaterialIcons name="person" size={22} color={OLIVE_DK} style={styles.inputIcon} />
            <CustomTextInput
              placeholder="Username"
              value={username}
              onChangeText={val => setUsername(val)}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              accessible accessibilityLabel="Username Input"
            />
          </View>
          {showError && !username && <Text style={styles.errorText}>{showError}</Text>}

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputIconRow}>
            <MaterialIcons name="email" size={22} color={OLIVE_DK} style={styles.inputIcon} />
            <CustomTextInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={val => setEmail(val)}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              accessible accessibilityLabel="Email Input"
            />
          </View>
          {showError && !email && <Text style={styles.errorText}>{showError}</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputIconRow}>
            <MaterialIcons name="lock" size={22} color={OLIVE_DK} style={styles.inputIcon} />
            <CustomTextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={val => setPassword(val)}
              containerStyle={styles.inputContainer}
              textStyle={styles.inputText}
              accessible accessibilityLabel="Password Input"
            />
          </View>
          {showError && !password && <Text style={styles.errorText}>{showError}</Text>}

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputIconRow}>
            <MaterialIcons name="lock" size={22} color={OLIVE_DK} style={styles.inputIcon} />
            <CustomTextInput
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={val => setConfirmPassword(val)}
              containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
              textStyle={styles.inputText}
              accessible accessibilityLabel="Confirm Password Input"
            />
          </View>
          {showError && (!confirmPassword || password !== confirmPassword) && <Text style={styles.errorText}>{showError}</Text>}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
          activeOpacity={0.85}
          accessible accessibilityLabel="Register Button"
        >
          {isLoading ? (
            <ActivityIndicator color={WHITE} size="small" />
          ) : (
            <Text style={styles.registerBtnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Login Link">
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.supportWrap}>
          <Text style={styles.supportTitle}>Contact Support</Text>
          <View style={styles.supportRow}>
            <Text style={styles.supportLink}>📞 Phone</Text>
            <Text style={styles.supportDivider}>  |  </Text>
            <Text style={styles.supportLink}>✉️ Email</Text>
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const BG        = '#faf7f0';
const SAND      = '#b79b7f';
const OLIVE     = '#7a8661';
const OLIVE_LT  = '#9ba882';
const OLIVE_DK  = '#5f6b4d';
const WHITE     = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  brand: {
    color: OLIVE_DK,
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitle: {
    color: SAND,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 36,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    color: OLIVE_DK,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: WHITE,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(183,155,127,0.35)',
    shadowColor: SAND,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  inputText: {
    fontSize: 16,
    color: '#3a3228',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 8,
  },
  registerBtn: {
    backgroundColor: OLIVE,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: OLIVE_DK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  registerBtnText: {  
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 36,
  },
  loginText: {
    color: OLIVE_LT,
    fontSize: 14,
  },
  loginLink: {
    color: OLIVE_DK,
    fontSize: 14,
    fontWeight: '700',
  },
  supportWrap: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(183,155,127,0.25)',
    paddingTop: 20,
    marginBottom: 24,
  },
  supportTitle: {
    color: OLIVE_DK,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportLink: {
    color: SAND,
    fontSize: 13,
  },
  supportDivider: {
    color: 'rgba(183,155,127,0.4)',
    fontSize: 13,
  },
});

export default Register;