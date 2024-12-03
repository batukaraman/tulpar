import React, { useCallback, useRef } from "react";
import {
  FlatList,
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Button from "@/components/Button";
import {
  FilePickerActionSheetOption,
  TMedia,
  getOptions,
} from "@/helpers/filePicker";
import { Media } from "@/constants/props";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { colors, sizes, spacing } from "@/constants/theme";
import Icon from "@expo/vector-icons/Ionicons";

const FilePicker = ({
  mediaTypes,
  selectedMedia,
  onSelect,
  multiple = false,
}: {
  mediaTypes: TMedia[];
  selectedMedia: Media[];
  onSelect: (selectedMedia: Media[]) => void;
  multiple?: boolean;
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const options = getOptions(mediaTypes);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClickOption = useCallback(
    async (item: FilePickerActionSheetOption) => {
      try {
        const media = await item.onPress(multiple);
        if (media) {
          const updatedMedia = multiple
            ? [...selectedMedia, ...media]
            : [...media];
          onSelect(updatedMedia);
        }
      } catch (error) {
        Alert.alert("Hata", "Medya seçimi sırasında bir hata oluştu.");
      } finally {
        bottomSheetModalRef.current?.close();
      }
    },
    [multiple, selectedMedia, onSelect]
  );

  const handleRemoveMedia = useCallback(
    (index: number) => {
      const updatedMedia = selectedMedia.filter((_, i) => i !== index);
      onSelect(updatedMedia);
    },
    [selectedMedia, onSelect]
  );

  const optionsRenderItem = useCallback(
    ({ item }: { item: FilePickerActionSheetOption }) => (
      <TouchableOpacity
        style={styles.optionsItem}
        onPress={() => handleClickOption(item)}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ),
    [handleClickOption]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      {selectedMedia.length === 0 ? (
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.uploadContainer}
        >
          <View style={styles.uploadIconContainer}>
            <Icon
              name="cloud-upload-outline"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text style={styles.uploadText}>
            Dosya bulmak için buraya{" "}
            <Text style={styles.uploadTextHighlight}>
              {Platform.OS === "web" ? "tıkla veya sürükle" : "dokun"}
            </Text>
          </Text>
          <Text style={styles.formatInfo}>JPG, PNG, PDF (Her biri 2 MB)</Text>
          <Text style={styles.formatInfo}>Maksimum 5 adet</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.selectedMediaContainer}>
          <View style={styles.selectedMediaHeader}>
            <View>
              <Text style={styles.selectedMediaTitle}>Seçilen Dosyalar</Text>
              <Text style={{ fontSize: sizes.small, color: colors.gray }}>
                Üzerine dokunarak silebilirsin
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handlePresentModalPress}
            >
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mediaList}>
            {selectedMedia.map((media, index) => (
              <View style={styles.mediaItem} key={index}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveMedia(index)}
                >
                  <Text numberOfLines={1}>{media.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        style={styles.bottomSheet}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Medya Seçenekleri</Text>
          </View>
          <FlatList
            data={options}
            style={styles.optionsContainer}
            keyExtractor={(item) => item.label}
            renderItem={optionsRenderItem}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.s,
    padding: spacing.l,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderStyle: "dashed",
    borderRadius: 15,
  },
  uploadIconContainer: {
    borderRadius: 99,
    padding: spacing.s,
    backgroundColor: colors.primaryLight,
  },
  uploadText: {
    textAlign: "center",
  },
  uploadTextHighlight: {
    fontWeight: "700",
    color: colors.primary,
  },
  formatInfo: {
    textAlign: "center",
    fontSize: sizes.small,
    color: colors.gray,
  },
  selectedMediaContainer: {
    gap: spacing.s,
  },
  selectedMediaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedMediaTitle: {
    fontSize: sizes.h4,
  },
  addButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.s,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
  },
  addButtonText: {
    color: colors.primary,
  },
  mediaList: {},
  mediaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeButton: {
    flex: 1,
    paddingVertical: spacing.xs,
  },
  optionsContainer: {
    paddingHorizontal: spacing.m,
  },
  optionsItem: {
    height: 42,
  },
  bottomSheetHeader: {
    paddingHorizontal: spacing.m,
    marginBottom: 24,
  },
  bottomSheetTitle: {
    fontSize: sizes.h3,
    fontWeight: "bold",
  },
  bottomSheet: {
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default FilePicker;
