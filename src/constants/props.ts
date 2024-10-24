import { Company } from "@/models/Company";
import { ViewStyle, TextInput } from "react-native";

type ButtonVariant = "primary" | "secondary";
type ButtonIconFloat = "left" | "right";

export interface ButtonProps {
  style?: ViewStyle;
  text: string;
  variant?: ButtonVariant;
  iconName?: string;
  iconVisible?: boolean;
  iconFloat?: ButtonIconFloat;
  onlyIcon?: boolean;
  disable?: boolean;
  onPress: () => void;
}

type validationRule = {
  validate: (value: string) => boolean;
  message: string;
};

export interface TextboxProps {
  inputRef?: React.RefObject<TextInput>;
  type?: string;
  placeholder?: string;
  showIcon?: boolean;
  specialIcon?: string;
  validationRules?: validationRule[];
  value?: string;
  numberOfLines?: number;
  onChange?: (value: string) => void;
  size?: "s" | "m" | "l";
}

export interface ValidationValues {
  selectedCompany: Company;
}

export interface SelectCompanyStepProps {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}