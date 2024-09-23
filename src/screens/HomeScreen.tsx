import SeacrhBar from '@components/SeacrhBar';
import {sizes, spacing} from '@constants/theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={() => navigation.navigate('Search')}
          style={styles.searchOverlay}></Pressable>
        <SeacrhBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: spacing.m},
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: sizes.radius,
  },
});

export default HomeScreen;
