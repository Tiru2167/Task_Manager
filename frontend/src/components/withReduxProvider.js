// components/withReduxProvider.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const withReduxProvider = (Component) => {
  return function WrappedComponent(props) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export default withReduxProvider;