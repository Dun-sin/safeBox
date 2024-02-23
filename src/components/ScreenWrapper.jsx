import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-native-paper';

const ScreenWrapper = ({ children }) => {
  const { container, header, headerText, childrenStyle } = styles
  return (
    <Provider>
      <SafeAreaView style={container}>
        <View style={header}>
          <Text style={headerText}>SafeBox</Text>
        </View>
        <View style={childrenStyle}>
          {children}
        </View>
      </SafeAreaView>
    </Provider>

  )
}

export default ScreenWrapper
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
    backgroundColor: '#FFFAFA'
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  headerText: {
    color: '#610505',
    fontSize: 23
  },
  childrenStyle: {
    paddingHorizontal: 10
  }
})
