import { Modal as PaperModal, Portal } from 'react-native-paper';

import React from 'react';
import { StyleSheet } from 'react-native';

const CustomModal = ({ visible, hideModal, children }) => {
  const { contentContainer } = styles;
  return (
    <Portal>
      <PaperModal visible={visible} onDismiss={hideModal} contentContainerStyle={contentContainer}>
        {children}
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#FFFAFA',
    maxHeight: '50%',
    marginHorizontal: 30,
    padding: 40,
    borderRadius: 10
  }
})

export default CustomModal;
