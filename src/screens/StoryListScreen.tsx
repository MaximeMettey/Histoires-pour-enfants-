import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { stories } from '../data/stories';
import { Story } from '../types/Story';

interface StoryListScreenProps {
  navigation: any;
}

export default function StoryListScreen({ navigation }: StoryListScreenProps) {
  const renderStoryCard = ({ item }: { item: Story }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('StoryReader', { story: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.metadata}>
          <Text style={styles.metadataText}>📖 {item.readingTime} min</Text>
          <Text style={styles.metadataText}>👶 {item.ageRange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE5B4" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Mes Histoires</Text>
        <Text style={styles.headerSubtitle}>Choisis ton histoire préférée !</Text>
      </View>
      <FlatList
        data={stories}
        renderItem={renderStoryCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  header: {
    backgroundColor: '#FFE5B4',
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FF8C42',
    fontWeight: '600',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#FFD93D',
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    lineHeight: 22,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
});
