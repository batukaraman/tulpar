import React from 'react';
import {StyleSheet, View} from 'react-native';
import Logo from '@components/Logo';
import {colors, sizes, spacing} from '@constants/theme';

function MainHeader(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Logo width={150} height={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    backgroundColor: colors.white,
  },
});

export default MainHeader;
