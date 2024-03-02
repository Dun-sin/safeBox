import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Dimensions } from 'react-native';
import { Provider } from 'react-native-paper';

const screenHeight = Dimensions.get('window').height;

const RPH = (percentage) => {
  return (percentage / 100) * screenHeight;
};

const ScreenWrapper = ({ children, title = "SafeBox" }) => {
  const { container, header, headerText, childrenStyle } = styles
  return (
    <Provider>
      <SafeAreaView style={container}>
        <View style={header}>
          <Text style={headerText}>{title}</Text>
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
    marginTop: StatusBar.currentHeight - 10 || 0,
    backgroundColor: '#FFFAFA',
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerText: {
    color: '#610505',
    fontSize: 23
  },
  childrenStyle: {
    paddingHorizontal: 10,
    height: RPH(100)
  }
})
