import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card, IconButton, useTheme, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocation } from '../../contexts/LocationContext';
import { useChat } from '../../contexts/ChatContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { selectedCounty, findNearbyUsers } = useLocation();
  const { createConversation } = useChat();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadNearbyUsers();
  }, [selectedCounty]);

  const loadNearbyUsers = async () => {
    try {
      const nearbyUsers = await findNearbyUsers(50); // 50km radius
      setUsers(nearbyUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleAction = async (action) => {
    if (currentIndex >= users.length) return;

    const user = users[currentIndex];
    
    if (action === 'like') {
      console.log('Liked:', user?.name);
      // Simulate match logic
      const isMatch = Math.random() > 0.7; // 30% chance of match
      
      if (isMatch) {
        alert(`🎉 Tupatane Match! You and ${user.name} liked each other!`);
      }
    } else {
      console.log('Passed on:', user?.name);
    }

    setCurrentIndex(prev => prev + 1);
  };

  const currentUser = users[currentIndex];

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
            🦁 Tupatane
          </Text>
        </View>
        
        <View style={styles.noMoreCards}>
          <Text style={[styles.noMoreText, { color: theme.colors.onSurface }]}>
            🦏 Hakuna More Matches!
          </Text>
          <Text style={[styles.noMoreSubtext, { color: theme.colors.onSurfaceVariant }]}>
            Check back later for more people in {selectedCounty?.name || 'your area'}
          </Text>
          <TouchableOpacity
            style={[styles.refreshButton, { backgroundColor: theme.colors.primary }]}
            onPress={loadNearbyUsers}
          >
            <Text style={[styles.refreshText, { color: theme.colors.onPrimary }]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          🦁 Tupatane
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={[styles.settingsText, { color: theme.colors.onSurface }]}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Location Info */}
      {selectedCounty && (
        <View style={styles.locationHeader}>
          <Text style={[styles.locationText, { color: theme.colors.onSurfaceVariant }]}>
            📍 Discovering in {selectedCounty.name}
          </Text>
        </View>
      )}

      {/* User Card */}
      <View style={styles.cardContainer}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.imageContainer}>
            {currentUser.profilePicture ? (
              <Image source={{ uri: currentUser.profilePicture }} style={styles.userImage} />
            ) : (
              <View style={[styles.placeholderImage, { backgroundColor: theme.colors.primaryContainer }]}>
                <Text style={[styles.placeholderText, { color: theme.colors.onPrimaryContainer }]}>
                  👤
                </Text>
              </View>
            )}
            
            {/* Verified Badge */}
            {currentUser.verified && (
              <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.verifiedText, { color: theme.colors.onPrimary }]}>✓</Text>
              </View>
            )}
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
                {currentUser.name}
              </Text>
              <Text style={[styles.userAge, { color: theme.colors.onSurfaceVariant }]}>
                {currentUser.age}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
                📍 {currentUser.location.county} • {currentUser.location.distance}km away
              </Text>
            </View>

            {/* Interests */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.interestsContainer}>
              {currentUser.interests?.slice(0, 3).map((interest, idx) => (
                <Chip
                  key={idx}
                  style={[styles.interestChip, { backgroundColor: theme.colors.primaryContainer }]}
                  textStyle={[styles.interestText, { color: theme.colors.onPrimaryContainer }]}
                  compact
                >
                  {interest}
                </Chip>
              ))}
            </ScrollView>
          </View>
        </Card>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <IconButton
          icon="close"
          size={30}
          iconColor={theme.colors.onError}
          style={[styles.actionButton, { backgroundColor: theme.colors.errorContainer }]}
          onPress={() => handleAction('pass')}
        />
        
        <IconButton
          icon="star"
          size={25}
          iconColor={theme.colors.onTertiary}
          style={[styles.actionButton, { backgroundColor: theme.colors.tertiary }]}
          onPress={() => navigation.navigate('HarambeeMoments')}
        />
        
        <IconButton
          icon="heart"
          size={30}
          iconColor={theme.colors.onPrimary}
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => handleAction('like')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsText: {
    fontSize: 24,
  },
  locationHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  locationText: {
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    height: height * 0.65,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    position: 'relative',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 12,
    padding: 4,
  },
  verifiedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    padding: 20,
    height: '30%',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  userAge: {
    fontSize: 20,
  },
  locationRow: {
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
  },
  interestsContainer: {
    marginBottom: 12,
  },
  interestChip: {
    marginRight: 8,
  },
  interestText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  actionButton: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  noMoreSubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen; 