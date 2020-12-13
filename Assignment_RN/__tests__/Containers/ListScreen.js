import 'react-native';
import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import ListScreen from '../../app/Container/ListScreen';

const mockStore = configureStore();

const navigation = {
  dispatch: jest.fn(),
};

const mockState = { registration: {} };

describe('ListScreen', () => {
  it('renders correctly ', () => {
    const store = mockStore(mockState);
    const tree = renderer.create(
      <Provider store={store}>
        <ListScreen navigation={navigation} />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
