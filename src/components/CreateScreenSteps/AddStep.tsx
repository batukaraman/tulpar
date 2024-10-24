import React from "react";
import { View } from "react-native";
import { spacing } from "@/constants/theme";
import { FilePicker, Textbox } from "@/components/FormControl";
import { AddStepProps } from "@/constants/props";

const AddStep = ({ comment, setComment, media, setMedia }: AddStepProps) => {
  return (
    <View style={{ flex: 1, padding: spacing.m, gap: spacing.m }}>
      <FilePicker
        mediaTypes={["camera", "document", "photo"]}
        onSelect={setMedia} 
        multiple
      />
      <Textbox
        placeholder="Yorumunuzu yazın"
        value={comment}
        onChange={setComment}
        numberOfLines={8}
        showIcon
      />
    </View>
  );
};

export default AddStep;
