import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';           // ← add this
import AppNavigationNi from './src/navigations';
import store from './src/app/store';               // ← path to your store file

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <AppNavigationNi />
    </View>
  </Provider>
);

export default App;