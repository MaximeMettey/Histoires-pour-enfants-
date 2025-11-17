import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Story } from '../types/Story';

interface StoryReaderScreenProps {
  navigation: any;
  route: {
    params: {
      story: Story;
    };
  };
}

const { width, height } = Dimensions.get('window');

export default function StoryReaderScreen({ navigation, route }: StoryReaderScreenProps) {
  const { story } = route.params;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);

  const currentPage = story.pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === story.pages.length - 1;

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    if (autoRead && currentPage) {
      speakText(currentPage.text);
    }
  }, [currentPageIndex, autoRead]);

  const speakText = async (text: string) => {
    try {
      await Speech.stop();
      setIsSpeaking(true);

      Speech.speak(text, {
        language: 'fr-FR',
        pitch: 1.1, // Voix un peu plus aiguë pour être amicale
        rate: 0.85, // Vitesse un peu ralentie pour les enfants
        onDone: () => {
          setIsSpeaking(false);
          if (autoRead && !isLastPage) {
            setTimeout(() => {
              goToNextPage();
            }, 1000);
          }
        },
        onStopped: () => {
          setIsSpeaking(false);
        },
        onError: () => {
          setIsSpeaking(false);
          Alert.alert('Erreur', 'Impossible de lire le texte');
        },
      });
    } catch (error) {
      console.error('Error speaking:', error);
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setAutoRead(false);
    } else {
      setAutoRead(true);
      speakText(currentPage.text);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      Speech.stop();
      setIsSpeaking(false);
      setAutoRead(false);
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const goBack = () => {
    Speech.stop();
    setIsSpeaking(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {story.title}
        </Text>
        <View style={styles.pageCounter}>
          <Text style={styles.pageCounterText}>
            {currentPageIndex + 1}/{story.pages.length}
          </Text>
        </View>
      </View>

      {/* Page Content */}
      <View style={styles.pageContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.pageText}>{currentPage.text}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* Speech Control */}
        <TouchableOpacity
          style={[styles.speechButton, isSpeaking && styles.speechButtonActive]}
          onPress={toggleSpeech}
          activeOpacity={0.8}
        >
          <Text style={styles.speechButtonIcon}>
            {isSpeaking ? '⏸️' : '🔊'}
          </Text>
          <Text style={styles.speechButtonText}>
            {isSpeaking ? 'Pause' : 'Écouter'}
          </Text>
        </TouchableOpacity>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, isFirstPage && styles.navButtonDisabled]}
            onPress={goToPreviousPage}
            disabled={isFirstPage}
            activeOpacity={0.8}
          >
            <Text style={styles.navButtonText}>←</Text>
            <Text style={styles.navButtonLabel}>Précédent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, isLastPage && styles.navButtonDisabled]}
            onPress={goToNextPage}
            disabled={isLastPage}
            activeOpacity={0.8}
          >
            <Text style={styles.navButtonText}>→</Text>
            <Text style={styles.navButtonLabel}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentPageIndex + 1) / story.pages.length) * 100}%` },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  pageCounter: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  pageCounterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#FFD93D',
    maxWidth: width - 40,
  },
  pageText: {
    fontSize: 22,
    lineHeight: 36,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  controls: {
    padding: 20,
    paddingBottom: 10,
  },
  speechButton: {
    backgroundColor: '#FF6B9D',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speechButtonActive: {
    backgroundColor: '#FF8C42',
  },
  speechButtonIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  speechButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#6BCB77',
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  nextButton: {
    backgroundColor: '#4D96FF',
  },
  navButtonDisabled: {
    backgroundColor: '#CCC',
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  navButtonLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
  },
});
