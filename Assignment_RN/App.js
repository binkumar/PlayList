import React from 'react';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';

import AppStackNavigator from './app/Container/AppStackNavigator';
import store from './app/Redux/store';
import { insertData } from './app/RealmDB';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator isAdmin={this.state.isAdmin} appProperties={this.props} />
      </Provider>
    );
  }
}

export default App;
