import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { spacing } from "@/constants/theme";
import { FilePicker, Textbox } from "@/components/FormControl";
import { AdditionStepProps } from "@/constants/props";

const AdditionStep = ({
  comment,
  setComment,
  media,
  setMedia,
}: AdditionStepProps) => {
  return (
    <ScrollView>
      <View style={{ padding: spacing.m, gap: spacing.m }}>
        <FilePicker
          mediaTypes={["camera", "document", "photo"]}
          selectedMedia={media}
          onSelect={setMedia}
          multiple
        />
        <Textbox
          placeholder="Deneyimlerinizi yazın"
          value={comment}
          onChange={setComment}
          numberOfLines={8}
          showIcon
          size="l"
        />
      </View>
    </ScrollView>
  );
};

export default AdditionStep;
