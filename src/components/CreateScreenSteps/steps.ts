import SelectCompanyStep from "@/components/CreateScreenSteps/SelectCompanyStep";
import EvaluateStep from "@/components/CreateScreenSteps/EvaluateStep";
import { RatingValues } from "@/constants/props";
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
  {
    title: "Değerlendir",
    Component: EvaluateStep,
    validationRules: [
      {
        validate: (values) => values.rating.general == 0,
        errorMessage: "Genel bir değerlendirme yapmalısınız.",
      },
    ],
    initialValues: {
      rating: {
        general: 0,
        criteria: [
          { name: "Timing", rating: 0, comment: "" },
          { name: "Security", rating: 0, comment: "" },
          { name: "Comfort", rating: 0, comment: "" },
          { name: "Service", rating: 0, comment: "" },
          { name: "Entertainment", rating: 0, comment: "" },
        ],
      },
    },
    props: (
      values: { rating: RatingValues },
      setValues: (arg0: any) => any
    ) => ({
      rating: values.rating,
      setRating: (newRating: Partial<RatingValues>) =>
        setValues({
          ...values,
          rating: { ...values.rating, ...newRating },
        }),
    }),
  },
];
