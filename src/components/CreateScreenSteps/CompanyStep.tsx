import React from "react";
import {
  Text,
  FlatList,
  Image,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { colors, spacing } from "@/constants/theme";
import { Textbox } from "@/components/FormControl";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { CompanySearchService } from "@/services/search/CompanySearchService";
import { CompanyStepProps } from "@/constants/props";

const CompanyStep: React.FC<CompanyStepProps> = ({
  selectedCompany,
  setSelectedCompany,
}) => {
  const { query, setQuery, results } = useDebouncedSearch(
    new CompanySearchService()
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 16, paddingHorizontal: spacing.m }}>
        <Textbox
          type="search"
          placeholder="Firma Ara"
          showIcon
          onChange={setQuery}
          value={query}
          size="l"
        />
      </View>
      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        numColumns={2}
        style={{ paddingHorizontal: spacing.m }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={results}
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              styles.itemContainer,
              selectedCompany &&
                item.name === selectedCompany.name &&
                styles.selectedItem,
            ]}
            onPress={() =>
              setSelectedCompany(
                selectedCompany?.name === item.name ? null : item
              )
            }
          >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.companyName}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.s,
    gap: spacing.xs,
    backgroundColor: colors.white,
    width: "49%",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
  },
  selectedItem: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  logo: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
  companyName: {
    color: colors.black,
    fontSize: 16,
  },
});

export default CompanyStep;
