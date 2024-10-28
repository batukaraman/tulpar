import SelectCompanyStep from "@/components/CreateScreenSteps/SelectCompanyStep";
import EvaluateStep from "@/components/CreateScreenSteps/EvaluateStep";
import AddStep from "@/components/CreateScreenSteps/AddStep";
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
  {
    title: "Ekleme Yap",
    Component: AddStep,
    validationRules: [
      {
        validate: (values) => values.comment.trim() == "",
        errorMessage: "Yorum alanı boş bırakılamaz.",
      },
      {
        validate: (values) => values.comment.trim().length < 10,
        errorMessage: "Yorum en az 10 karakter olmalı.",
      },
    ],
    initialValues: { comment: "", media: [] },
    props: (
      values: { comment: any; media: any },
      setValues: (arg0: any) => any
    ) => ({
      comment: values.comment,
      setComment: (comment: any) => setValues({ ...values, comment }),
      media: values.media,
      setMedia: (media: any) => setValues({ ...values, media }),
    }),
  },
];
