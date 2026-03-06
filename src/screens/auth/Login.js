import { useState } from 'react';
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
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        {/* Brand */}
        <Text style={styles.brand}>NATURAE</Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <CustomTextInput
            placeholder="Username"
            value={val => setEmailAdd(val)}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
          />

          <Text style={styles.label}>Password</Text>
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={val => setPassword(val)}
            containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
            textStyle={styles.inputText}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (!emailAdd || !password) {
              Alert.alert('Incorrect Credentials', 'Please try again!');
              return;
            }
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        {/* Forgot */}
        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgotText}>Forgot Login?</Text>
        </TouchableOpacity>

        {/* Support */}
        <View style={styles.supportWrap}>
          <Text style={styles.supportTitle}>Contact Support</Text>
          <View style={styles.supportRow}>
            <Text style={styles.supportLink}>📞 Phone</Text>
            <Text style={styles.supportDivider}>  |  </Text>
            <Text style={styles.supportLink}>✉️ Email</Text>
          </View>
        </View>

        {/* Register link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 48,
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
  loginBtn: {
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
  loginBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  forgotWrap: {
    alignItems: 'center',
    marginBottom: 40,
  },
  forgotText: {
    color: SAND,
    fontSize: 14,
    fontWeight: '500',
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
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: OLIVE_LT,
    fontSize: 14,
  },
  registerLink: {
    color: OLIVE_DK,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Login;