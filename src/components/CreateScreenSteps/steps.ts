import CompanyStep from "@/components/CreateScreenSteps/CompanyStep";
import RatingStep from "@/components/CreateScreenSteps/RatingStep";
import AdditionStep from "@/components/CreateScreenSteps/AdditionStep";
import { Step } from "@/models/Step";

export const stepsConfig: Step[] = [
  {
    title: "Firma Seç",
    Component: CompanyStep,
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
    Component: RatingStep,
    validationRules: [
      {
        validate: (values) => values.rating == 0,
        errorMessage: "Genel bir değerlendirme yapmalısınız.",
      },
      {
        validate: (values) => values.comment.trim() == "",
        errorMessage: "Yorum alanı boş bırakılamaz.",
      },
      {
        validate: (values) => values.comment.trim().length < 10,
        errorMessage: "Yorum en az 10 karakter olmalı.",
      },
    ],
    initialValues: {
      rating: 0,
      comment: "",
    },
    props: (
      values: { rating: number; comment: string },
      setValues: (arg0: any) => any
    ) => ({
      comment: values.comment,
      setComment: (comment: string) => setValues({ ...values, comment }),
      rating: values.rating,
      setRating: (rating: number) => setValues({ ...values, rating }),
    }),
  },
  {
    title: "Ekleme Yap",
    Component: AdditionStep,
    validationRules: [
      {
        validate: (values) => values.media.length > 5,
        errorMessage: "En fazla 5 adet medya seçebilirsin.",
      },
    ],
    initialValues: { media: [] },
    props: (values: { media: any }, setValues: (arg0: any) => any) => ({
      media: values.media,
      setMedia: (media: any) => setValues({ ...values, media }),
    }),
  },
];
