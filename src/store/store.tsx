import {configureStore} from '@reduxjs/toolkit';
import playingMusicReducer from './PlayingMusic/PlayingMusic.ts';
import  userInfo from './Userstore/Userstore.ts';
import PlayList from './PlayList/PlayList.ts'
export const store = configureStore({
    reducer:{
        
        playingMusicInfomation:playingMusicReducer,
        userInfo:userInfo,
        PlayList:PlayList
    }

})
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;