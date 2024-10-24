import React, { useState } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { View, Text, Button as RNButton, TouchableOpacity } from "react-native";
import Button from "@/components/Button";
import { TMedia, getOptions, onSelectMediaType } from "@/helpers/filePicker";

const FilePicker = ({
  mediaTypes,
  onSelect,
  multiple = false,
}: {
  mediaTypes: TMedia[];
  onSelect?: (selectedMedia: any[]) => void;
  multiple?: boolean;
}) => {
  const [selectedMedia, setSelectedMedia] = useState<any[]>([]);
  const options = getOptions(mediaTypes);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleOpenActionSheet = () => {
    const optionLabels = options.map((item) => item.label);
    const cancelButtonIndex = optionLabels.length;

    showActionSheetWithOptions(
      {
        title: "Medya Seçimi",
        message: "Lütfen seçmek istediğiniz medya türünü seçin",
        options: [...optionLabels, "Cancel"],
        cancelButtonIndex,
        destructiveButtonIndex: cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex < optionLabels.length) {
          const media = await options[buttonIndex].onPress();
          if (media === undefined || media === null) {
            return;
          }
          const updatedMedia = multiple
            ? [...selectedMedia, ...media]
            : [...media];
          setSelectedMedia(updatedMedia);

          if (typeof onSelect === "function") {
            onSelect(updatedMedia);
          }
        }
      }
    );
  };

  const handleRemoveMedia = (index: number) => {
    const updatedMedia = selectedMedia.filter((_, i) => i !== index);
    setSelectedMedia(updatedMedia);

    if (typeof onSelect === "function") {
      onSelect(updatedMedia);
    }
  };

  return (
    <View style={{ display: "flex", gap: 8 }}>
      {(multiple || selectedMedia.length === 0) && (
        <Button
          text={selectedMedia.length === 0 ? "Medya Seç" : "Medya Ekle"}
          onPress={handleOpenActionSheet}
        />
      )}

      <View>
        {selectedMedia.length > 0 ? (
          selectedMedia.map((media, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <Text>{media.name || media.fileName}</Text>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
                onPress={() => handleRemoveMedia(index)}
              >
                <Text style={{ color: "red" }}>Sil</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>Henüz medya seçilmedi.</Text>
        )}
      </View>
    </View>
  );
};

export default FilePicker;
