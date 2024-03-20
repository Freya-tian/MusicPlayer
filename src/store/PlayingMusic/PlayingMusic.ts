import { PayloadAction, createSlice } from "@reduxjs/toolkit"
/**
 * 播放器当前播放音乐信息store
 * -  通过这里isPlay状态控制音乐是否播放
 * 
 */

interface PlayingMusic{
    isPlay:boolean,
    allTime:string,
    currentTime:string,
    ended:boolean,
    progress:string,    
    volume:number
}



const initialState:PlayingMusic = {
    isPlay: false,
  allTime: "00:00",
  currentTime: "00:00",
  volume: 0,
  ended: false,
  progress: '0',
  
}

const playingMusic = createSlice({
    name:'playingMusicInfomation',
    initialState,
    reducers:{
        getAudioInfo:(state,action:PayloadAction<PlayingMusic>)=>{
            state.allTime = action.payload.allTime;
            state.isPlay = action.payload.isPlay;
            state.currentTime = action.payload.currentTime;
            state.ended = action.payload.ended;
            state.volume = action.payload.volume
            state.progress =  action.payload.progress
        },
        playAction:(state,action:PayloadAction<boolean>)=>{
            state.isPlay = action.payload
        },
        changecurrentTimeAndprogress:(state,action:PayloadAction<{currentTime:string,progress:string}>) =>{
            state.currentTime = action.payload.currentTime,
            state.progress = action.payload.progress
            
        },
        musicEnd:(state,action:PayloadAction<boolean>) =>{
            
            state.isPlay = action.payload,
            state.progress= '0',
            state.currentTime= "00:00"
        },
    }
})

export const {getAudioInfo,playAction,changecurrentTimeAndprogress,musicEnd} =  playingMusic.actions;
export default playingMusic.reducer;