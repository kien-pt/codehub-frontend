import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducer';

const logger = createLogger({
  collapsed: true,
  titleFormatter: (action) => `${action.meta && action.meta.prefix} ${action.type}`,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
export default store;
