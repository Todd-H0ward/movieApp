import { Provider } from 'react-redux';

import createStore from '../../store';

import type { PropsWithChildren } from 'react';

const store = createStore();

const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
