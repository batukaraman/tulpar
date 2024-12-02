import { Company } from "@/models/Company";
import { ViewStyle, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ButtonVariant = "primary" | "secondary";
type ButtonIconFloat = "left" | "right";

export type iconName = keyof typeof Ionicons.glyphMap;

export interface ButtonProps {
  style?: ViewStyle;
  text: string;
  variant?: ButtonVariant;
  iconName?: iconName;
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
  iconName?: iconName;
  validationRules?: validationRule[];
  value?: string;
  numberOfLines?: number;
  onChange?: (value: string) => void;
  size?: "s" | "m" | "l";
}

export interface ValidationValues {
  selectedCompany: Company;
  rating: RatingValues;
  comment: string;
  media: any[] | null;
}

export interface CompanyStepProps {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
}

interface RatingCriteria {
  name: string;
  rating: number;
  comment: string;
}

export interface RatingValues {
  general: number;
  criteria: RatingCriteria[];
}

export interface RatingStepProps {
  rating: RatingValues;
  setRating: (rating: RatingValues) => void;
}

type DocumentMedia = {
  size: number;
  mimeType: string;
  uri: string;
  name: string;
};

type ImageMedia = DocumentMedia & {
  width: number;
  height: number;
};

export type Media = DocumentMedia | ImageMedia;

export interface AdditionStepProps {
  comment: string;
  setComment: (comment: string) => void;
  media: Media[];
  setMedia: (media: any[] | null) => void;
}
