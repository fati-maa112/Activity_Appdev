import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  forest:    '#1a2e1a',
  moss:      '#4a6741',
  fern:      '#6b8f5e',
  dew:       '#dcebd4',
  cream:     '#faf7f2',
  white:     '#ffffff',
  gold:      '#c8a84b',
  textDark:  '#1a2e1a',
  textMuted: '#a8b8a0',
  error:     '#c0392b',
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(resetLogin());
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>This is your profile screen.</Text>

        {/* You can add more user info here */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoValue}>User1</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: COLORS.forest,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.dew,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.forest,
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '400',
  },

  infoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: 4,
    paddingVertical: 14,
    backgroundColor: COLORS.cream,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.dew,
    paddingHorizontal: 16,
  },

  infoLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  infoValue: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: '600',
  },

  button: {
    backgroundColor: COLORS.forest,
    borderRadius: 12,
    height: 50,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.forest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});

export default ProfileScreen;