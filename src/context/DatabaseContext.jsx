import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getData, storeData } from '../utils/lib';

import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { reducer } from '../reducers/DatabaseReducer';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, dispatch] = useReducer(reducer, null)

  useEffect(() => {
    (async () => {
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
      </View>
    );
  }

  return (
    <DatabaseContext.Provider value={{ db, dispatch }}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);