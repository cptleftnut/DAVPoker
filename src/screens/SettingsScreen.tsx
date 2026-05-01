import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * SettingsScreen Component
 * App settings and preferences
 */
export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to clear all local data? This cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Clear',
          onPress: () => Alert.alert('Success', 'Data cleared successfully'),
          style: 'destructive',
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Session data exported successfully');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>App Preferences</Text>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#10b981" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDesc}>Receive game alerts</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#374151', true: '#10b98140' }}
              thumbColor={notifications ? '#10b981' : '#6b7280'}
            />
          </View>
        </View>
      </View>

      {/* Display */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color="#10b981" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDesc}>Always enabled</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              disabled
              trackColor={{ false: '#374151', true: '#10b98140' }}
              thumbColor={darkMode ? '#10b981' : '#6b7280'}
            />
          </View>
        </View>
      </View>

      {/* Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="cloud-sync" size={20} color="#10b981" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Auto Sync</Text>
                <Text style={styles.settingDesc}>Sync data with cloud</Text>
              </View>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#374151', true: '#10b98140' }}
              thumbColor={autoSync ? '#10b981' : '#6b7280'}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow} onPress={handleExportData}>
            <View style={styles.settingLeft}>
              <Ionicons name="download" size={20} color="#3b82f6" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Export Data</Text>
                <Text style={styles.settingDesc}>Download session history</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow} onPress={handleClearData}>
            <View style={styles.settingLeft}>
              <Ionicons name="trash" size={20} color="#ef4444" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Clear Data</Text>
                <Text style={styles.settingDesc}>Remove all local data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>App Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Build Number</Text>
            <Text style={styles.aboutValue}>1</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>API Version</Text>
            <Text style={styles.aboutValue}>1.0</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>DAVPoker v1.0.0</Text>
        <Text style={styles.footerDesc}>AI-Powered Poker Decision Engine</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Visit Website</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1729',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    color: '#9ca3af',
  },
  divider: {
    height: 1,
    backgroundColor: '#374151',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aboutLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  footer: {
    alignItems: 'center',
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  footerDesc: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
  },
  linkButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  linkText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
});
