import React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Button from "@/components/Button";
import { TMedia, getOptions, onSelectMediaType } from "@/helpers/filePicker";

const FilePicker = ({
  mediaTypes,
  onSelect, // Yeni prop eklendi
}: {
  mediaTypes: TMedia[];
  onSelect: (selectedMedia: any[]) => void; // Yeni prop tipi tanımlandı
}) => {
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
          const selectedMedia = await options[buttonIndex]?.onPress();
          if (selectedMedia !== null && selectedMedia !== undefined) {
            // void veya null kontrolü
            onSelect(selectedMedia); // Seçilen medyalar üst bileşene gönderiliyor
          } else {
            console.error("No media selected or an error occurred.");
          }
        }
      }
    );
  };

  return (
    <>
      <Button text="Medya Seç" onPress={handleOpenActionSheet} />
    </>
  );
};

export default FilePicker;
