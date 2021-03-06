import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

//모듈
import user from './modules/user';
import post from './modules/post';
import comment from './modules/comment';
import like from './modules/like';
import userInfo from './modules/userInfo';
import recommend from './modules/recommend';

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({
  user,
  post,
  comment,
  like,
  userInfo,
  recommend,
});
const store = createStore(rootReducer, enhancer);

export default store;
