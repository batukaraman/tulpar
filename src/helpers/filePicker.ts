import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

export const pickImageFromGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Erişim Engellendi",
      "Görsel seçmek için Medya Kitaplığı erişimi gereklidir.",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Ayarları Aç",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets;
  }
  return null;
};

export const takeImageWithCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Erişim Engellendi",
      "Fotoğraf çekmek için kamera erişimi gereklidir.",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Ayarları Aç",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets;
  }
  return null;
};

export const pickDocument = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Erişim Engellendi",
      "Doküman seçmek için Medya Kitaplığı erişimi gereklidir.",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Ayarları Aç",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
    return;
  }

  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
  });

  if (result.assets && result.assets.length > 0) {
    return result.assets;
  }
  return null;
};

export type TMedia = "photo" | "camera" | "document";

const options: FilePickerActionSheetOption[] = [
  {
    type: "document",
    label: "Döküman Seç",
    onPress: () => onSelectMediaType("document"),
  },
  {
    type: "photo",
    label: "Galeriden Seç",
    onPress: () => onSelectMediaType("photo"),
  },
  {
    type: "camera",
    label: "Kamerayı Aç",
    onPress: () => onSelectMediaType("camera"),
  },
];

export const onSelectMediaType = async (type: TMedia): Promise<any | null> => {
  if (type === "document") {
    const data = await pickDocument();
    return data ?? null; // Seçilen medya döndürülüyor ya da null
  }
  if (type === "photo") {
    const data = await pickImageFromGallery();
    return data ?? null; // Seçilen medya döndürülüyor ya da null
  }
  if (type === "camera") {
    const data = await takeImageWithCamera();
    return data ?? null; // Seçilen medya döndürülüyor ya da null
  }
  return null;
};

export type FilePickerActionSheetOption = {
  type: TMedia;
  label: string;
  onPress: () => void;
};

export const getOptions = (
  mediaTypes: TMedia[]
): Omit<FilePickerActionSheetOption, "type">[] => {
  return options
    .filter((option) => mediaTypes.includes(option.type))
    .map(({ type, ...rest }) => rest);
};
