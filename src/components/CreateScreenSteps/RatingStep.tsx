import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { RatingStepProps, RatingValues } from "@/constants/props";
import { Textbox } from "@/components/FormControl";
import { colors, sizes, spacing } from "@/constants/theme";

const RatingStep = ({ rating, setRating }: RatingStepProps) => {
  const criteria = [
    { name: "Zaman", key: "Timing" },
    { name: "Güvenlik", key: "Security" },
    { name: "Konfor", key: "Comfort" },
    { name: "Hizmet", key: "Service" },
    { name: "Eğlence", key: "Entertainment" },
  ];

  const handleCriteriaChange = (
    index: number,
    key: keyof RatingValues["criteria"][0],
    value: any
  ) => {
    const updatedCriteria = [...rating.criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [key]: value };
    setRating({ ...rating, criteria: updatedCriteria });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StarRating
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          rating={rating.general}
          starSize={40}
          onChange={(value) => setRating({ ...rating, general: value })}
        />
        <View style={styles.criteria}>
          {criteria.map((item, index) => (
            <View key={index} style={styles.part}>
              <View style={styles.head}>
                <Text style={styles.title}>{item.name}</Text>
                <StarRating
                  starSize={32}
                  rating={rating.criteria[index]?.rating || 0}
                  onChange={(value) =>
                    handleCriteriaChange(index, "rating", value)
                  }
                />
              </View>
              <Textbox
                size="l"
                placeholder="Yaşadıklarını yaz"
                value={rating.criteria[index]?.comment || ""}
                numberOfLines={3}
                onChange={(text) =>
                  handleCriteriaChange(index, "comment", text)
                }
              />
            </View>
          ))}
        </View>
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
