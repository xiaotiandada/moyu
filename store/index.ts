import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { combineReducers } from 'redux'

import userSlice from './userSlice'
import otherSlice from './otherSlice'

const reducers = combineReducers({
  user: userSlice,
  other: otherSlice
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

const PERSISTED_KEYS: string[] = ['user']
const persistConfig = {
  key: 'store',
  version: 1,
  storage,
  whitelist: PERSISTED_KEYS // only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })],
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
})