import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Text, View } from 'react-native';
import { getData, storeData } from '../utils/lib';

import { ActivityIndicator } from 'react-native-paper';
import { reducer } from '../reducers/DatabaseReducer';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, dispatch] = useReducer(reducer, null)

  useEffect(() => {
    (async () => {
      if (!db) return
      await storeData(db)
    })()
  }, [db])

  useEffect(() => {
    (async () => {
      const savedState = await getData();

      dispatch({ type: 'INITIALIZE_STATE', payload: savedState });
    })()
  }, []);

  if (!db) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading..... Please wait</Text>
      </View>
    );
  }

  return (
    <DatabaseContext.Provider value={{ db, dispatch }}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
