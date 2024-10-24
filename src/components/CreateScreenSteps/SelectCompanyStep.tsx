import React, { useEffect, useState } from "react";
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
import { SelectCompanyStepProps } from "@/constants/props";

const SelectCompanyStep: React.FC<SelectCompanyStepProps> = ({
  selectedCompany,
  setSelectedCompany,
}) => {
  const { query, setQuery, results } = useDebouncedSearch(
    new CompanySearchService()
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: spacing.m }}>
        <Textbox
          type="search"
          placeholder="Firma Ara"
          showIcon
          onChange={setQuery}
          value={query}
        />
      </View>

      <FlatList
        style={{ paddingHorizontal: spacing.m }}
        data={results}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.itemContainer,
              selectedCompany &&
                item.name === selectedCompany.name &&
                styles.selectedItem,
              {
                borderBottomWidth:
                  item.id === results[results.length - 1].id ? 0 : 1,
              },
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.s,
    gap: spacing.m,
    borderColor: "rgba(27, 31, 35, 0.15)",
  },
  selectedItem: {
    backgroundColor: "#e6f2ff",
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: "contain",
  },
  companyName: {
    color: colors.black,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default SelectCompanyStep;
