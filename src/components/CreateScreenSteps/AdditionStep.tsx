import React from "react";
import { View, ScrollView, Text } from "react-native";
import { colors, sizes, spacing } from "@/constants/theme";
import { FilePicker, Textbox } from "@/components/FormControl";
import { AdditionStepProps } from "@/constants/props";

const AdditionStep = ({ media, setMedia }: AdditionStepProps) => {
  return (
    <View style={{ flex: 1, padding: spacing.m, gap: spacing.xs }}>
      <View>
        <Text
          style={{
            marginBottom: spacing.xs,
            fontSize: sizes.h2,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          Yaşadıklarını Göster
        </Text>
        <Text
          style={{
            marginBottom: spacing.s,
            fontSize: sizes.body,
            color: colors.gray,
          }}
        >
          Belge, fotoğraf, video vb. yükleyerek sizi anlamamıza yardımcı olun.
        </Text>
      </View>
      <FilePicker
        mediaTypes={["camera", "document", "photo"]}
        selectedMedia={media}
        onSelect={setMedia}
        multiple
      />
    </View>
  );
};

export default AdditionStep;
