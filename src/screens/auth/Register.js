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

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    // TODO: call your register API
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        {/* Brand */}
        <Text style={styles.brand}>NATURAE SKINCARE</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <CustomTextInput
            placeholder="Username"
            value={val => setUsername(val)}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
          />

          <Text style={styles.label}>Email Address</Text>
          <CustomTextInput
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={val => setEmail(val)}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
          />

          <Text style={styles.label}>Password</Text>
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={val => setPassword(val)}
            containerStyle={styles.inputContainer}
            textStyle={styles.inputText}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <CustomTextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={val => setConfirmPassword(val)}
            containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
            textStyle={styles.inputText}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
          activeOpacity={0.85}
        >
          <Text style={styles.registerBtnText}>Create Account</Text>
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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