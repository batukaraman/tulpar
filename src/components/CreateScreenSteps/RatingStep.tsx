import React, { useMemo, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RatingStepProps } from "@/constants/props";
import { Textbox } from "@/components/FormControl";
import { colors, sizes, spacing } from "@/constants/theme";
import RatingStar from "../RatingStar";

const RatingStep = ({
  comment,
  setComment,
  rating,
  setRating,
}: RatingStepProps) => {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View>
          <Text
            style={{
              marginBottom: spacing.xs,
              fontSize: sizes.h2,
              fontWeight: "bold",
              color: colors.primary,
            }}
          >
            Firmayı Değerlendir
          </Text>
          <Text
            style={{
              fontSize: sizes.body,
              color: colors.gray,
            }}
          >
            Firma için bir puan ver ve hakkında düşünelerini yaz.
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <RatingStar value={rating} onChange={setRating} size={32} />
        </View>
        <Textbox
          placeholder="Deneyimlerinizi yazın"
          value={comment}
          onChange={setComment}
          numberOfLines={8}
          size="l"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.l,
    padding: spacing.m,
  },
  criteria: { gap: spacing.m, alignSelf: "stretch" },
  head: {
    gap: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  part: {
    gap: spacing.s,
  },
  title: { fontSize: sizes.h3, color: colors.black },
});

export default RatingStep;
