import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
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