import { Button, Text, TextInput } from 'react-native-paper';
import React, { useContext } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { calculateLabel, calculateMaxAmount, isEmptyObject } from '../../../utils/lib';

import { AppContext } from '../../../../App';
import { rulesCollectionName } from '../../../services/InitializedDB';
import { useState } from 'react';

const EditRuleModal = ({ hideModal, rule }) => {
  const [newRule, setNewRule] = useState(rule);

  const { db } = useContext(AppContext)


  const handleUpdate = async () => {
    if (!newRule || isEmptyObject(newRule)) return

    try {
      if (calculateMaxAmount(newRule.segments) > 1) {
        ToastAndroid.show('Total number of all segments of the rule must equal to 1', ToastAndroid.LONG)
        return
      }
      await db[rulesCollectionName].upsert({ ...newRule, label: calculateLabel(newRule.segments) })

      hideModal()
      ToastAndroid.show('Updated Successfully', ToastAndroid.TOP)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View>
      <Text style={styles.title}>Edit Rule - {rule.name}</Text>
      <View style={styles.updateInputContainer}>
        {newRule.segments.map((segment, index) => (
          <TextInput
            key={index}
            label={segment.label}
            placeholder={`${segment.amount}`}
            placeholderTextColor="gray"
            mode="outlined"
            activeOutlineColor={segment.color}
            onChangeText={(amount) => {
              if (/^0\.\d+$/.test(amount) || /^0$/.test(amount)) {
                if (amount === 0) {
                  amount = value.amount
                }

                setNewRule((prev) => ({
                  ...prev,
                  segments: prev.segments.map((s, i) =>
                    i === index ? { ...s, amount: +amount } : s
                  ),
                }));
              } else {
                ToastAndroid.show('Number must be a decimal e.g 0.4 as 40%', ToastAndroid.SHORT)
              }
            }}
          />
        ))}
      </View>
      <Button
        mode="contained"
        style={styles.updateButton}
        onPress={handleUpdate}
        buttonColor='#f53d3d'
      >
        Update Rule
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateButton: {
    marginTop: 20,
    marginLeft: 'auto'
  },
  updateInputContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap'
  }
});

export default EditRuleModal;
