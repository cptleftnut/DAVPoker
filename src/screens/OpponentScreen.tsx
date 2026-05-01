import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Opponent {
  id: string;
  name: string;
  vpip: number;
  pfr: number;
  threeBet: number;
  foldTo3Bet: number;
  handsPlayed: number;
}

/**
 * OpponentScreen Component
 * Opponent database and tracking
 */
export default function OpponentScreen() {
  const [opponents] = useState<Opponent[]>([
    {
      id: '1',
      name: 'Aggressive Andy',
      vpip: 45,
      pfr: 38,
      threeBet: 12,
      foldTo3Bet: 25,
      handsPlayed: 156,
    },
    {
      id: '2',
      name: 'Tight Tim',
      vpip: 18,
      pfr: 14,
      threeBet: 4,
      foldTo3Bet: 75,
      handsPlayed: 89,
    },
    {
      id: '3',
      name: 'Calling Station',
      vpip: 52,
      pfr: 8,
      threeBet: 1,
      foldTo3Bet: 60,
      handsPlayed: 203,
    },
  ]);

  const getCategoryLabel = (vpip: number, pfr: number) => {
    if (vpip > 40 && pfr > 30) return 'Aggressive';
    if (vpip < 20 && pfr < 15) return 'Tight';
    return 'Balanced';
  };

  const getCategoryColor = (vpip: number, pfr: number) => {
    if (vpip > 40 && pfr > 30) return '#ef4444';
    if (vpip < 20 && pfr < 15) return '#3b82f6';
    return '#f59e0b';
  };

  const renderOpponentCard = (opponent: Opponent) => (
    <TouchableOpacity key={opponent.id} style={styles.opponentCard}>
      <View style={styles.opponentHeader}>
        <View style={styles.opponentInfo}>
          <Text style={styles.opponentName}>{opponent.name}</Text>
          <Text style={styles.opponentHands}>{opponent.handsPlayed} hands</Text>
        </View>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor: getCategoryColor(opponent.vpip, opponent.pfr) + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              { color: getCategoryColor(opponent.vpip, opponent.pfr) },
            ]}
          >
            {getCategoryLabel(opponent.vpip, opponent.pfr)}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>VPIP</Text>
          <Text style={styles.statValue}>{opponent.vpip}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>PFR</Text>
          <Text style={styles.statValue}>{opponent.pfr}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>3-Bet</Text>
          <Text style={styles.statValue}>{opponent.threeBet}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Fold 3B</Text>
          <Text style={styles.statValue}>{opponent.foldTo3Bet}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Opponent Database</Text>
        <Text style={styles.subtitle}>Track and Analyze Opponents</Text>
      </View>

      {/* Add Opponent Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add New Opponent</Text>
      </TouchableOpacity>

      {/* Opponents List */}
      <View style={styles.opponentsList}>
        {opponents.map((opponent) => renderOpponentCard(opponent))}
      </View>

      {/* Legend */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Legend</Text>

        <View style={styles.legendItem}>
          <View style={styles.legendColor} style={{ backgroundColor: '#ef4444' }} />
          <View style={styles.legendText}>
            <Text style={styles.legendLabel}>Aggressive</Text>
            <Text style={styles.legendDesc}>VPIP &gt; 40%, PFR &gt; 30%</Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <View style={styles.legendColor} style={{ backgroundColor: '#f59e0b' }} />
          <View style={styles.legendText}>
            <Text style={styles.legendLabel}>Balanced</Text>
            <Text style={styles.legendDesc}>Moderate play style</Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <View style={styles.legendColor} style={{ backgroundColor: '#3b82f6' }} />
          <View style={styles.legendText}>
            <Text style={styles.legendLabel}>Tight</Text>
            <Text style={styles.legendDesc}>VPIP &lt; 20%, PFR &lt; 15%</Text>
          </View>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#10b981" />
        <Text style={styles.infoText}>
          VPIP: Voluntarily Put In Pot • PFR: Pre-Flop Raise • 3-Bet: 3-bet frequency
        </Text>
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
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  opponentsList: {
    marginBottom: 20,
  },
  opponentCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  opponentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  opponentInfo: {
    flex: 1,
  },
  opponentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  opponentHands: {
    fontSize: 12,
    color: '#9ca3af',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
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
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 2,
  },
  legendDesc: {
    fontSize: 11,
    color: '#9ca3af',
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
