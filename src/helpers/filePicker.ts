import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
import { Media } from "@/constants/props";

// Dosya türleri alınmalı, bu türlere göre izin verilmeli
// max dosya boyutu alınmalı buna göre izin verilmeli
// aynı dosya eklenemesin bunu URI ile kontrol edebilir

export const pickImageFromGallery = async (multiple: boolean) => {
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
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: multiple,
  });

  if (!result.canceled) {
    return result.assets.map((file) => {
      return {
        name: file.fileName,
        size: file.fileSize,
        mimeType: file.mimeType,
        uri: file.uri,
        width: file.width,
        height: file.height,
      };
    });
  }
  return null;
};

export const takeImageWithCamera = async (multiple: boolean) => {
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
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: multiple,
  });

  if (!result.canceled) {
    return result.assets.map((file) => {
      return {
        name: file.fileName,
        size: file.fileSize,
        mimeType: file.mimeType,
        uri: file.uri,
        width: file.width,
        height: file.height,
      };
    });
  }
  return null;
};

export const pickDocument = async (multiple: boolean) => {
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
    multiple: multiple,
  });

  if (result.assets && result.assets.length > 0) {
    return result.assets.map((file) => {
      return {
        name: file.name,
        size: file.size,
        mimeType: file.mimeType,
        uri: file.uri,
      };
    });
  }
  return null;
};

export type TMedia = "photo" | "camera" | "document";

export const onSelectMediaType = async (
  type: TMedia,
  multiple: boolean
): Promise<any | null> => {
  if (type === "document") {
    const data = await pickDocument(multiple);
    return data ?? null;
  }
  if (type === "photo") {
    const data = await pickImageFromGallery(multiple);
    return data ?? null;
  }
  if (type === "camera") {
    const data = await takeImageWithCamera(multiple);
    return data ?? null;
  }
  return null;
};

const options: FilePickerActionSheetOption[] = [
  {
    type: "document",
    label: "Döküman Seç",
    onPress: (multiple: boolean) => onSelectMediaType("document", multiple),
  },
  {
    type: "photo",
    label: "Galeriden Seç",
    onPress: (multiple: boolean) => onSelectMediaType("photo", multiple),
  },
  {
    type: "camera",
    label: "Kamerayı Aç",
    onPress: (multiple: boolean) => onSelectMediaType("camera", multiple),
  },
];

export type FilePickerActionSheetOption = {
  type: TMedia;
  label: string;
  onPress: (multiple: boolean) => Promise<Media[]>;
};

export const getOptions = (
  mediaTypes: TMedia[]
): FilePickerActionSheetOption[] => {
  return options.filter((option) => mediaTypes.includes(option.type));
};
