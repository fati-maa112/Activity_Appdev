import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';



import { ROUTES } from '../utils';
import { resetLogin } from '../app/reducers/auth';

const COLORS = {
  forest:    '#1a2e1a',
  moss:      '#4a6741',
  fern:      '#6b8f5e',
  sage:      '#8aab7a',
  dew:       '#dcebd4',
  cream:     '#faf7f2',
  white:     '#ffffff',
  gold:      '#c8a84b',
  goldLight: '#e2c97a',
  textDark:  '#1a2e1a',
  textMuted: '#a8b8a0',
  error:     '#c0392b',
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(resetLogin());
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* BG DECORATIONS */}
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>🌿</Text>
          </View>
          <Text style={styles.appLabel}>NATURAE</Text>
        </View>

        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.username}>{data?.username}</Text>
        <View style={styles.headerUnderline} />
      </View>

      {/* GREETING BANNER */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTitle}>Good to see you! 👋</Text>
          <Text style={styles.bannerSub}>
            Explore your profile and manage your account below.
          </Text>
        </View>
        <Text style={styles.bannerEmoji}>🌱</Text>
      </View>

      {/* MAIN CARD */}
      <View style={styles.card}>
        <View style={styles.cardAccent} />

        <Text style={styles.cardTitle}>Dashboard</Text>
        <Text style={styles.cardSubtitle}>You're successfully logged in.</Text>

        {/* QUICK ACTIONS LABEL */}
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>

        {/* PROFILE BUTTON */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
          activeOpacity={0.85}
        >
          <View style={styles.profileButtonLeft}>
            <Text style={styles.profileButtonIcon}>👤</Text>
            <Text style={styles.profileText}>Go to Profile</Text>
          </View>
          <Text style={styles.profileArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.85}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* FOOTER NOTE */}
      <Text style={styles.footerNote}>Naturae • Your nature companion</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: 24,
  },

  /* BG ORBS */
  bgOrb1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.sage,
    opacity: 0.07,
    top: -80,
    right: -80,
  },

  bgOrb2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.gold,
    opacity: 0.06,
    bottom: 60,
    left: -80,
  },

  /* HEADER */
  header: {
    marginTop: 20,
    marginBottom: 24,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    marginRight: 10,
    shadowColor: COLORS.forest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  logoBadgeText: { fontSize: 20 },

  appLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.forest,
    letterSpacing: 5,
  },

  welcomeText: {
    fontSize: 16,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginBottom: 4,
  },

  username: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.forest,
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'capitalize',
  },

  headerUnderline: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
  },

  /* GREETING BANNER */
  banner: {
    backgroundColor: COLORS.forest,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: COLORS.forest,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },

  bannerLeft: {
    flex: 1,
    paddingRight: 12,
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },

  bannerSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
    fontWeight: '400',
  },

  bannerEmoji: {
    fontSize: 42,
    opacity: 0.9,
  },

  /* CARD */
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 24,
    shadowColor: COLORS.forest,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.dew,
    overflow: 'hidden',
    marginBottom: 16,
  },

  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
    height: 3,
    backgroundColor: COLORS.gold,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.forest,
    marginBottom: 4,
    marginTop: 8,
    letterSpacing: 0.4,
  },

  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 20,
    fontWeight: '400',
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  /* PROFILE BUTTON */
  profileButton: {
    backgroundColor: COLORS.forest,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: COLORS.forest,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  profileButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileButtonIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  profileText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  profileArrow: {
    color: COLORS.goldLight,
    fontSize: 18,
    fontWeight: '700',
  },

  /* LOGOUT BUTTON */
  logoutButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.error,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  logoutIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  logoutText: {
    color: COLORS.error,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 1,
  },

  /* FOOTER */
  footerNote: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 20,
    letterSpacing: 1,
    fontWeight: '500',
  },

});

export default HomeScreen;