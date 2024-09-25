import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, sizes, spacing} from '@constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

interface Step {
  title: string;
  content: React.ReactNode;
  requirements: () => boolean;
}

interface StepperProps {
  steps: Step[];
  onComplete: () => void;
  onNavigate: (activeStep: number) => void;
}

function Stepper({
  steps,
  onComplete,
  onNavigate,
}: StepperProps): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepPress = (index: number) => {
    if (index === activeStep + 1 && steps[activeStep].requirements()) {
      setCompletedSteps([...completedSteps, activeStep]);
      setActiveStep(index);
      onNavigate(index);
    } else if (index > activeStep) {
      const canProceed = [...Array(index - activeStep).keys()].every((_, i) =>
        steps[activeStep + i].requirements(),
      );

      if (canProceed) {
        setCompletedSteps([
          ...completedSteps,
          ...Array.from({length: index - activeStep}, (_, i) => activeStep + i),
        ]);
        setActiveStep(index);
        onNavigate(index);
      }
    } else if (index < activeStep) {
      setActiveStep(index);
      setCompletedSteps(completedSteps.filter(step => step < index));
      onNavigate(index);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (steps[activeStep].requirements()) {
        onComplete();
      }
    } else {
      const nextStep = activeStep + 1;
      handleStepPress(nextStep);
    }
  };

  const handlePrev = () => {
    const prevStep = activeStep - 1;
    if (prevStep >= 0) {
      handleStepPress(prevStep);
    }
  };

  const isNextDisabled =
    !steps[activeStep].requirements() ||
    (activeStep === steps.length - 1 && !steps[activeStep].requirements());

  return (
    <View>
      <View style={styles.steps}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Pressable onPress={() => handleStepPress(index)}>
              <View
                style={[
                  styles.step,
                  completedSteps.includes(index) && styles.completedStep,
                  index === activeStep && styles.activeStep,
                ]}>
                {completedSteps.includes(index) ? (
                  <Icon
                    name="checkmark"
                    size={sizes.h3}
                    style={styles.completedNumber}
                  />
                ) : (
                  <Text style={styles.number}>{index + 1}</Text>
                )}
              </View>
              <Text style={styles.title}>{step.title}</Text>
            </Pressable>
            {index !== steps.length - 1 && (
              <View
                style={[
                  styles.path,
                  completedSteps.includes(index) && styles.completedPath,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.content}>{steps[activeStep].content}</View>
      <View style={styles.buttonContainer}>
        {activeStep !== 0 && (
          <TouchableOpacity
            onPress={handlePrev}
            disabled={activeStep === 0}
            style={styles.button}>
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}>
          <Text style={styles.buttonText}>
            {activeStep === steps.length - 1 ? 'Tamamla' : 'İleri'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  steps: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  title: {
    color: colors.gray,
  },
  path: {
    height: 2,
    flex: 1,
    transform: [{translateY: -10}],
    backgroundColor: colors.gray,
  },
  completedPath: {backgroundColor: colors.primary},
  activeStep: {
    borderColor: colors.primary,
  },
  completedStep: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  number: {
    color: colors.gray,
  },
  completedNumber: {
    color: colors.white,
  },
  content: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.s,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
});

export default Stepper;
