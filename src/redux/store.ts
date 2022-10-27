import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./reducers/index";
const config = {};
const middleware = [thunk, createStateSyncMiddleware(config)];
const store = createStore(
  allReducers,
  composeWithDevTools(compose(applyMiddleware(...middleware)))
);
initStateWithPrevTab(store);
export type AppDispatch = typeof store.dispatch
export default store;
