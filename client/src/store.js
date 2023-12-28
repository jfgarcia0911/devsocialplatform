// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; // Assuming you are using thunk middleware
// import rootReducer from './reducers';

// const initialState = {}

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   applyMiddleware(...middleware),
//   // Remove composeWithDevTools here
// );

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
