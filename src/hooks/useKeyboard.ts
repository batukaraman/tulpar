import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

export const useKeyboard = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyboardDidShow = () => setKeyboardIsVisible(true);
    const handleKeyboardDidHide = () => setKeyboardIsVisible(false);

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardIsVisible;
};
