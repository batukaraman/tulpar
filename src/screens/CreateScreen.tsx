import Stepper from '@components/Stepper';
import {colors} from '@constants/theme';
import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';

function CreateScreen(): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const steps = [
    {
      title: 'Ad Soyad',
      content: (
        <TextInput
          placeholder="Adınızı ve Soyadınızı girin"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            color: colors.black,
          }}
        />
      ),
      requirements: () => name.length > 0,
    },
    {
      title: 'E-posta',
      content: (
        <TextInput
          placeholder="E-posta adresinizi girin"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            color: colors.black,
          }}
        />
      ),
      requirements: () => email.length > 0 && /\S+@\S+\.\S+/.test(email),
    },
    {
      title: 'Parola',
      content: (
        <TextInput
          placeholder="Parola belirleyin"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            color: colors.black,
          }}
        />
      ),
      requirements: () => password.length >= 6,
    },
  ];

  const handleComplete = () => {
    Alert.alert(
      'Tüm adımlar tamamlandı!',
      `Ad: ${name}, E-posta: ${email}, Parola: ${password}`,
    );
  };

  const handleNavigate = (activeStep: number) => {
    console.log('Aktif adım:', activeStep);
  };

  return (
    <View style={{padding: 20}}>
      <Stepper
        steps={steps}
        onComplete={handleComplete}
        onNavigate={handleNavigate}
      />
    </View>
  );
}

export default CreateScreen;
