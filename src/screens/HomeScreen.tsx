import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'https://8000-ixtun8phu4bxfzs5cabg2-4d185df6.us2.manus.computer';

/**
 * HomeScreen Component
 * Hand analyzer for DAVPoker mobile app
 */
export default function HomeScreen() {
  const [playerId, setPlayerId] = useState('player_1');
  const [card1, setCard1] = useState('A');
  const [card2, setCard2] = useState('K');
  const [potSize, setPotSize] = useState('100');
  const [loading, setLoading] = useState(false);
  const [decision, setDecision] = useState<any>(null);

  const handleGetDecision = async () => {
    if (!card1 || !card2 || !potSize) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v1/scraper/ingest`, {
        player_id: playerId,
        hand: [card1, card2],
        pot_size: parseInt(potSize),
      });

      setDecision(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to get AI decision. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>DAVPoker</Text>
        <Text style={styles.subtitle}>AI-Powered Poker Decisions</Text>
      </View>

      {/* Input Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Game State</Text>

        {/* Player ID */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Player ID</Text>
          <TextInput
            style={styles.input}
            value={playerId}
            onChangeText={setPlayerId}
            placeholder="e.g., player_1"
            placeholderTextColor="#6b7280"
          />
        </View>

        {/* Hand Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Hand</Text>
          <View style={styles.handRow}>
            <TextInput
              style={[styles.input, styles.handInput]}
              value={card1}
              onChangeText={setCard1}
              placeholder="Card 1"
              placeholderTextColor="#6b7280"
              maxLength={1}
            />
            <Text style={styles.vs}>vs</Text>
            <TextInput
              style={[styles.input, styles.handInput]}
              value={card2}
              onChangeText={setCard2}
              placeholder="Card 2"
              placeholderTextColor="#6b7280"
              maxLength={1}
            />
          </View>
          <Text style={styles.hint}>Ranks: A, K, Q, J, T, 2-9</Text>
        </View>

        {/* Pot Size */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pot Size ($)</Text>
          <TextInput
            style={styles.input}
            value={potSize}
            onChangeText={setPotSize}
            placeholder="100"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
          />
        </View>

        {/* Analyze Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleGetDecision}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="flash" size={20} color="#fff" />
              <Text style={styles.buttonText}>Get AI Decision</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Decision Result */}
      {decision && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AI Recommendation</Text>

          <View style={[styles.decisionBox, { borderLeftColor: getDecisionColor(decision.action) }]}>
            <Text style={styles.decisionAction}>{decision.action}</Text>
            <Text style={styles.decisionConfidence}>
              Confidence: {(decision.confidence * 100).toFixed(0)}%
            </Text>
          </View>

          {decision.reasoning && (
            <View style={styles.reasoningBox}>
              <Text style={styles.reasoningTitle}>Reasoning</Text>
              <Text style={styles.reasoningText}>{decision.reasoning}</Text>
            </View>
          )}

          {decision.hand_strength && (
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Hand Strength</Text>
                <Text style={styles.statValue}>{decision.hand_strength}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Pot Odds</Text>
                <Text style={styles.statValue}>{decision.pot_odds}</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Info */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#10b981" />
        <Text style={styles.infoText}>
          Enter your hand and pot size to get real-time AI recommendations based on game theory and opponent analysis.
        </Text>
      </View>
    </ScrollView>
  );
}

function getDecisionColor(action: string): string {
  switch (action) {
    case 'Fold':
      return '#ef4444';
    case 'Call':
      return '#f59e0b';
    case 'Raise':
      return '#10b981';
    default:
      return '#6366f1';
  }
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
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e5e7eb',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },
  handRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  handInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vs: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  decisionBox: {
    backgroundColor: '#111827',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  decisionAction: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  decisionConfidence: {
    fontSize: 12,
    color: '#9ca3af',
  },
  reasoningBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  reasoningTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 6,
  },
  reasoningText: {
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  infoCard: {
    backgroundColor: '#10b98120',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#d1d5db',
    lineHeight: 16,
  },
});
