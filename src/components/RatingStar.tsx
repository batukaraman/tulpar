import React, { useCallback, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

interface RatingStarProps {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
  totalStars?: number;
  gap?: number;
}

const RatingStar: React.FC<RatingStarProps> = ({
  value,
  onChange,
  size = 24,
  totalStars = 5,
  gap = 8,
}) => {
  const handleRatingPress = useCallback(
    (selectedRating: number) => {
      const newRating = selectedRating === value ? 0 : selectedRating;
      onChange(newRating);
    },
    [value, onChange]
  );

  const stars = useMemo(() => {
    return Array.from({ length: totalStars }, (_, i) => {
      const starIndex = i + 1;
      const starIconName =
        starIndex <= value
          ? "star"
          : starIndex - value <= 0.5
          ? "star-half-outline"
          : "star-outline";

      return (
        <Pressable key={starIndex} onPress={() => handleRatingPress(starIndex)}>
          <Icon name={starIconName} size={size} color="#FFD700" />
        </Pressable>
      );
    });
  }, [value, totalStars, handleRatingPress]);

  return <View style={{ flexDirection: "row", gap: gap }}>{stars}</View>;
};

export default RatingStar;
