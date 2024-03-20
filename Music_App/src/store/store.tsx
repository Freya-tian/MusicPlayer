import {configureStore} from '@reduxjs/toolkit';
import playingMusicReducer from './PlayingMusic/PlayingMusic.ts';
export const store = configureStore({
    reducer:{
        
        playingMusicInfomation:playingMusicReducer,
    }

})
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;