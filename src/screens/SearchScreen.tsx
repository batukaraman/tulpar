import {sizes, spacing} from '@constants/theme';
import React, {useEffect, useRef} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import SeacrhBar from '@components/SeacrhBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

function SearchScreen(): React.JSX.Element {
  const navigation = useNavigation();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={navigation.goBack}>
        <Icon name="arrow-back-outline" size={sizes.h2} />
      </Pressable>
      <View style={{flex: 1}}>
        <SeacrhBar inputRef={inputRef} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: spacing.m,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
});
export default SearchScreen;
