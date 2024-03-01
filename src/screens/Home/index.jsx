import { Button, Text } from 'react-native-paper';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, ToastAndroid, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { rulesCollectionName, settingsCollectionName } from '../../services/InitializedDB';

import AppContext from '../../context/AppContext';
import CustomModal from '../../components/CustomModal';
import EditRuleModal from './components/EditModalRule';
import { PieChart } from "react-native-gifted-charts";
import PlaceHolderImage from '../../../assets/images/undraw_Revenue_re_2bmg.png'
import ScreenWrapper from "../../components/ScreenWrapper";
import { isEmptyObject } from '../../utils/lib';

const Home = () => {
  const { pieInfoTextContainer, pieInfoContainer, allocationContainer, container, pieContainer, allocation, allocationText, imageStyle, ruleStyle, ruleStyleContainer, ruleStyleText, incomeContainer, income, incomeTitle } = styles

  const [isOpen, setIsOpen] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  const [settings, setSettings] = useState({});
  const [rules, setRules] = useState([])
  const [chart, setChart] = useState({})
  const [editingRule, setEditingRule] = useState(null)

  const { db } = useContext(AppContext)

  const handleOnPress = () => {
    setIsOpen(!isOpen)
  }


  const getChart = (clickedRule) => {
    const income = settings.income ? +settings.income : 0
    if (income === 0 || income < 0) {
      ToastAndroid.show('Please input an Income in Settings', ToastAndroid.BOTTOM)
      return
    }
    const basic = settings.basic ? +settings.basic : 0

    const total = income - basic

    if (total < 0) {
      ToastAndroid.show(`oops, you've got nothing to spend`, ToastAndroid.LONG)
      return
    }

    const rule = rules.find(rule => {
      return rule.name === clickedRule
    })


    const chart = []

    rule.segments.forEach(values => {
      const value = +(total * values.amount).toFixed(2)
      chart.push({ value, color: values.color, text: `${values.amount * 100}%`, label: values.label })
    })

    setChart(chart)
  }

  const openModal = (ruleName) => {
    const rule = rules.find(rule => rule.name === ruleName)

    setEditingRule({ label: rule.label, name: rule.name, segments: rule.segments })
    showModal()
  }

  useEffect(() => {
    const fetchRules = async () => {
      if (db[rulesCollectionName]) {
        db[rulesCollectionName].find().$.subscribe((rule) => {
          setRules(rule);
        });
      }

      if (db[settingsCollectionName]) {
        const subscription = db[settingsCollectionName]
          .find()
          .$.subscribe((settings) => {
            const formattedSettings = settings.reduce((acc, curr) => {
              acc[curr.key] = curr.value;
              return acc;
            }, {});
            setSettings(formattedSettings);
          });

        return () => subscription.unsubscribe();
      }
    };
    fetchRules();
  }, [db]);

  return (
    <ScreenWrapper>
      <View style={container}>
        <View style={incomeContainer}>
          <Text style={incomeTitle}>Your Income:</Text>
          <Text style={income}>${settings.income ?? 0} - ${settings.basic ?? 0}</Text>
        </View>
        <View style={pieContainer}>
          {isEmptyObject(chart) ?
            <Image source={PlaceHolderImage} style={imageStyle} /> : <PieChart
              donut
              showText
              textColor="black"
              radius={170}
              textSize={15}
              textBackgroundRadius={20}
              showValuesAsLabels
              showTextBackground
              labelsPosition='outward'
              data={chart}
            />}
          {!isEmptyObject(chart) && <View style={pieInfoContainer}>
            {chart.map((value, i) => {
              return <View key={i} style={{ ...pieInfoTextContainer, backgroundColor: value.color }}>
                <Text style={{ color: '#FFFAFA' }}>{value.label}</Text>
                <Text style={{ color: '#FFFAFA' }}>{value.value}</Text>
              </View>
            })}
          </View>}
        </View>
        <View style={allocationContainer}>
          <TouchableWithoutFeedback onPress={handleOnPress}>
            <View style={allocation}>
              <Text style={allocationText}>Income Allocation Rules</Text>
              <Entypo name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
            </View>
          </TouchableWithoutFeedback>
          {isOpen && rules &&
            <FlatList
              data={rules}
              contentContainerStyle={ruleStyleContainer}
              renderItem={({ item }) => <View key={item.name} style={ruleStyle}>
                <Text style={ruleStyleText}>{item.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <TouchableWithoutFeedback onPress={() => openModal(item.name)}>
                    <FontAwesome6 name="pen" size={14} color="#610505" />
                  </TouchableWithoutFeedback>
                  <Button
                    mode='contained'
                    onPress={() => getChart(item.name)}
                    buttonColor='#f53d3d'
                  >Apply</Button>
                </View>
              </View>}

            />
          }
        </View>
      </View>
      {editingRule && (<
        CustomModal visible={modalVisible} hideModal={hideModal}>
        <EditRuleModal
          rule={editingRule}
          hideModal={hideModal}
        />
      </CustomModal>
      )}
    </ScreenWrapper >
  )
}

export default Home

const styles = StyleSheet.create({
  incomeContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  incomeTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  income: {
    fontSize: 16,
    fontStyle: 'italic'
  },
  pieContainer: {
    alignItems: 'center',
    width: '100%'
  },
  pieInfoContainer: {
    width: '70%'
  },
  pieInfoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 5,
    padding: 8
  },
  container: {
    padding: 20,
    gap: 10,
  },
  allocationContainer: {
    backgroundColor: '#FA9E9E',
    padding: 10,
    borderRadius: 10,
    maxHeight: '40%',
  },
  allocation: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4
  },
  allocationText: {
    fontSize: 18,
    color: '#0A0101',
    fontWeight: 'bold'
  },
  imageStyle: {
    width: '100%',
    height: 300
  },
  ruleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleStyleText: {
    fontSize: 17
  },
  ruleStyleContainer: {
    gap: 6,
    paddingHorizontal: 12
  }
})