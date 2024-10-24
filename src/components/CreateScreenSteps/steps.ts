import SelectCompanyStep from "@/components/CreateScreenSteps/SelectCompanyStep";
import { Step } from "@/models/Step";

export const stepsConfig: Step[] = [
  {
    title: "Firma Seç",
    Component: SelectCompanyStep,
    validationRules: [
      {
        validate: (values) => values.selectedCompany == null,
        errorMessage: "Bir firma seçmelisiniz.",
      },
    ],
    initialValues: { selectedCompany: undefined },
    props: (
      values: { selectedCompany: object },
      setValues: (selectedCompany: object) => void
    ) => ({
      selectedCompany: values.selectedCompany,
      setSelectedCompany: (company: object) =>
        setValues({ ...values, selectedCompany: company }),
    }),
  },
];
