import Button from "@/components/Button";
import StepIndicator from "react-native-step-indicator";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { stepsConfig } from "@/components/CreateScreenSteps/steps";
import { colors, spacing } from "@/constants/theme";
import { ValidationValues } from "@/constants/props";
import { useKeyboard } from "@/hooks/useKeyboard";

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.primary,
  stepStrokeUnFinishedColor: colors.lightGray,
  separatorFinishedColor: colors.primary,
  separatorUnFinishedColor: colors.lightGray,
  stepIndicatorFinishedColor: colors.primary,
  stepIndicatorUnFinishedColor: colors.white,
  stepIndicatorCurrentColor: colors.white,
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: colors.primary,
  stepIndicatorLabelFinishedColor: colors.white,
  stepIndicatorLabelUnFinishedColor: colors.lightGray,
  labelColor: colors.gray,
  labelSize: 12,
  currentStepLabelColor: colors.primary,
};

function Create(): React.JSX.Element {
  const [step, setStep] = useState(0);
  const [validations, setValidations] = useState<boolean[]>(
    Array(stepsConfig.length).fill(false)
  );
  const [errors, setErrors] = useState<string[][]>(
    Array(stepsConfig.length).fill([])
  );
  const [values, setValues] = useState<ValidationValues>(() =>
    stepsConfig.reduce((acc, stepConfig) => {
      return { ...acc, ...stepConfig.initialValues };
    }, {} as ValidationValues)
  );

  const validateCurrentStep = (stepIndex: number) => {
    const currentStep = stepsConfig[stepIndex];
    if (!currentStep) return false;

    const validationErrors = currentStep.validationRules.map((rule) =>
      !rule.validate(values) ? "" : rule.errorMessage
    );

    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[stepIndex] = validationErrors;
      return newErrors;
    });

    return validationErrors.every((error) => error === "");
  };

  const handleValidation = (stepIndex: number) => {
    const isValid = validateCurrentStep(stepIndex);
    setValidations((prevValidations) => {
      const newValidations = [...prevValidations];
      newValidations[stepIndex] = isValid;
      return newValidations;
    });
  };

  useEffect(() => {
    handleValidation(step);
  }, [values, step]);

  const handleStepPress = (stepIndex: number) => {
    const canNavigate = validations.slice(0, stepIndex).every((valid) => valid);
    if (canNavigate) setStep(stepIndex);
  };

  const handleNext = () => {
    const isValid = validateCurrentStep(step);
    if (isValid && step < stepsConfig.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const CurrentStepComponent = stepsConfig[step].Component;

  const stepProps = stepsConfig[step].props
    ? stepsConfig[step].props(values, setValues)
    : {};

  const keyboardIsVisible = useKeyboard();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {!keyboardIsVisible && stepsConfig.length > 1 && (
        <View style={{ padding: spacing.m }}>
          <StepIndicator
            customStyles={customStyles}
            labels={stepsConfig.map((step) => step.title)}
            stepCount={stepsConfig.length}
            currentPosition={step}
            onPress={handleStepPress}
          />
        </View>
      )}

      <CurrentStepComponent {...stepProps} error={errors[step]} />

      <View
        style={[
          {
            gap: spacing.s,
            padding: spacing.m,
            borderTopWidth: 1,
            borderColor: "rgba(27, 31, 35, 0.15)",
          },
          validations[step] && keyboardIsVisible && { paddingVertical: 0 },
        ]}
      >
        {errors[step] &&
          errors[step].some((err: string) => err.trim() !== "") && (
            <View>
              {errors[step].map(
                (err: string, index: number) =>
                  err.trim() !== "" && (
                    <Text key={index} style={{ color: "red" }}>
                      {err}
                    </Text>
                  )
              )}
            </View>
          )}
        {!keyboardIsVisible && (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            {step > 0 && (
              <Button
                text="Geri"
                variant="secondary"
                onPress={handleBack}
                style={{ flex: 1 }}
              />
            )}
            {step < stepsConfig.length - 1 && (
              <Button
                text="İleri"
                onPress={handleNext}
                disable={!validations[step]}
                style={{ flex: 2 }}
              />
            )}
            {step === stepsConfig.length - 1 && (
              <Button
                text="Bitir"
                onPress={() => {
                  console.log(JSON.stringify(values, null, 2));
                }}
                disable={!validations[step]}
                style={{ flex: 2 }}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default Create;
