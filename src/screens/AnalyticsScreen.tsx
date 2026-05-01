import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * AnalyticsScreen Component
 * Session analytics and performance tracking
 */
export default function AnalyticsScreen() {
  const stats = {
    totalHands: 47,
    winRate: 62,
    roi: 28,
    profitLoss: 1240,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Session Analytics</Text>
        <Text style={styles.subtitle}>Performance Metrics</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="flash" size={24} color="#10b981" />
          </View>
          <Text style={styles.statValue}>{stats.totalHands}</Text>
          <Text style={styles.statLabel}>Total Hands</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="trending-up" size={24} color="#10b981" />
          </View>
          <Text style={styles.statValue}>{stats.winRate}%</Text>
          <Text style={styles.statLabel}>Win Rate</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="medal" size={24} color="#10b981" />
          </View>
          <Text style={styles.statValue}>{stats.roi}%</Text>
          <Text style={styles.statLabel}>ROI</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="wallet" size={24} color="#10b981" />
          </View>
          <Text style={[styles.statValue, { color: '#10b981' }]}>${stats.profitLoss}</Text>
          <Text style={styles.statLabel}>Profit/Loss</Text>
        </View>
      </View>

      {/* Session Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Session Summary</Text>

        <View style={styles.summaryItem}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryLabel}>Avg Pot Won</Text>
            <Text style={styles.summaryValue}>$185</Text>
          </View>
          <View style={styles.summaryRight}>
            <Text style={styles.summaryLabel}>Avg Pot Lost</Text>
            <Text style={styles.summaryValue}>$95</Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryLabel}>Hands Won</Text>
            <Text style={styles.summaryValue}>29</Text>
          </View>
          <View style={styles.summaryRight}>
            <Text style={styles.summaryLabel}>Hands Lost</Text>
            <Text style={styles.summaryValue}>16</Text>
          </View>
        </View>
      </View>

      {/* Hand Performance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Performing Hands</Text>

        {[
          { hand: 'AA', played: 3, won: 3, roi: 120 },
          { hand: 'KK', played: 2, won: 2, roi: 95 },
          { hand: 'AK', played: 5, won: 3, roi: 45 },
          { hand: 'QQ', played: 2, won: 1, roi: 15 },
        ].map((hand) => (
          <View key={hand.hand} style={styles.handRow}>
            <View style={styles.handLeft}>
              <Text style={styles.handName}>{hand.hand}</Text>
              <Text style={styles.handStats}>{hand.won}/{hand.played} hands</Text>
            </View>
            <View style={styles.handRight}>
              <Text style={styles.handRoi}>+{hand.roi}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Position Performance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Win Rate by Position</Text>

        {[
          { position: 'Button', winRate: 75 },
          { position: 'Cutoff', winRate: 67 },
          { position: 'Middle', winRate: 60 },
          { position: 'UTG', winRate: 50 },
        ].map((pos) => (
          <View key={pos.position} style={styles.positionRow}>
            <Text style={styles.positionName}>{pos.position}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${pos.winRate}%` },
                ]}
              />
            </View>
            <Text style={styles.positionRate}>{pos.winRate}%</Text>
          </View>
        ))}
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#10b981" />
        <Text style={styles.infoText}>
          Analytics are updated in real-time as you log sessions and outcomes.
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  summaryLeft: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginRight: 6,
  },
  summaryRight: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginLeft: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  handRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  handLeft: {
    flex: 1,
  },
  handName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  handStats: {
    fontSize: 12,
    color: '#9ca3af',
  },
  handRight: {
    alignItems: 'flex-end',
  },
  handRoi: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  positionName: {
    width: 70,
    fontSize: 12,
    color: '#d1d5db',
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  positionRate: {
    width: 40,
    textAlign: 'right',
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
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
