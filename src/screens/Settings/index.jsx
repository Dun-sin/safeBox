import { Button, TextInput } from 'react-native-paper'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { isConvertibleToNumber, saveSetting } from '../../utils/lib'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../App'
import ScreenWrapper from '../../components/ScreenWrapper'
import { settingsCollectionName } from '../../services/InitializedDB'

export default function Settings() {
  const { container } = styles;
  const { db } = useContext(AppContext);

  const [local, setLocal] = useState({ basic: 0, income: 0 });
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleBasicChange = async (amount) => {
    if (isConvertibleToNumber(amount)) {
      setLocal({ ...local, basic: +amount });
    } else {
      ToastAndroid.show('Basic Amenties: Not a number', ToastAndroid.LONG);
    }
  };

  const handleIncomeChange = async (income) => {
    if (isConvertibleToNumber(income)) {
      setLocal({ ...local, income: +income });
    } else {
      ToastAndroid.show('Income: Not a number', ToastAndroid.LONG);
    }
  };

  const handleSubmit = async () => {
    try {
      Object.entries(local).forEach(async ([key, value]) => {
        await saveSetting(db, key, value);
      });

      ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT)
      fetchSettings()
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSettings = async () => {
    if (db[settingsCollectionName]) {
      db[settingsCollectionName].find().$.subscribe((setting) => {
        const formattedSettings = setting.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {})
        setSettings(formattedSettings);
      });
    }
  };


  return (
    <ScreenWrapper>
      <View style={container}>
        <Text>Anything added here will be automatically used for the future, saving you the hassle of inputting it every time!</Text>
        <View>
          <TextInput
            label='Enter the amount for Basic Amenties'
            mode='outlined'
            placeholder={settings.basic ? settings.basic.toString() : 'e.g 3000, 2094'}
            activeOutlineColor='#f53d3d'
            placeholderTextColor='gray'
            onChangeText={amount => handleBasicChange(amount)}
          />
          <TextInput
            label='Enter your Income'
            mode='outlined'
            placeholder={settings.income ? settings.income.toString() : 'e.g 3000, 2094'}
            activeOutlineColor='#f53d3d'
            placeholderTextColor='gray'
            onChangeText={income => handleIncomeChange(income)}
          />
        </View>
        <Button
          mode='contained'
          onPress={handleSubmit}
          buttonColor='#f53d3d'
          style={{ borderRadius: 5 }}>Save</Button>
      </View>
    </ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignContent: 'center',
    gap: 20,
    paddingVertical: 50
  }
})