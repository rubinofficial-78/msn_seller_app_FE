import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import authReducer from './Reducer/reducer';
import { RootState } from './types';

const rootReducer = combineReducers({
  data: authReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export default store; 