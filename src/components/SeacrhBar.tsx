import {colors, sizes, spacing} from '@constants/theme';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function SearchBar({inputRef}: any): React.JSX.Element {
  const [value, onChangeText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const clearHandle = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isFocused && styles.focused]}>
        <Icon name="search-outline" size={sizes.h4} />
        <TextInput
          ref={inputRef}
          placeholder="Konu, firma ara"
          style={styles.input}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
        />
        {value && (
          <Pressable onPress={clearHandle}>
            <Icon name="close-outline" size={sizes.h3} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.m,
    borderRadius: sizes.radius,
    backgroundColor: colors.white,
    fontSize: sizes.body,
    fontWeight: '500',
  },
  focused: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  input: {
    flex: 1,
  },
  cancelButton: {
    color: colors.primary,
    fontSize: sizes.body,
  },
});

export default SearchBar;
