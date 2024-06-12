import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

interface ShutterButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const ShutterButton: React.FC<ShutterButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled} // Disable button when taking photo or camera not ready
      style={styles.shutterButtonContainer}
    >
      <View style={styles.shutterButton} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shutterButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  shutterButton: {
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eeeeee',
    borderWidth: 3,
    borderColor: '#a3a3a3',
  },
});

export default ShutterButton;
