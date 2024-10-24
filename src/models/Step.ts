import {ValidationValues} from '@/constants/props';

export interface Step {
  title: string;
  Component: React.ComponentType<any>;
  validationRules: {
    validate: (values: ValidationValues) => boolean;
    errorMessage: string;
  }[];
  initialValues: Partial<ValidationValues>;
  props?: any;
}
