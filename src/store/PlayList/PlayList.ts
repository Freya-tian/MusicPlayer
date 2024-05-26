import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {  HistoryList } from "../../Services/index.js";
import test1  from '../../assets/Grimoireensemble/123/123.mp3'
import {URL} from '../../Common/helper.js'
/**
 * 播放器当前播放音乐信息store
 * -  通过这里isPlay状态控制音乐是否播放
 * 
 */
interface PlayList{
    historyMusic:[
        {ID:number,
            Music_ID:number,
            Title:string,
        Name:string,
        Source:string,
        Lyric:string,
        image:string
    }
    ],
    currentMusic:number,
    currentUrl:string
    error?:object
}
const initialState:PlayList = {
    historyMusic:[
        {
            ID:1,
            Music_ID:1,
            Title:"花的嫁",
            Name:'Grimoire ensemble',
            Source:test1,
            Lyric:"",
            image:''
            
        }
    ],
    currentMusic:0,
    currentUrl:''
  
}
export const fetchhistoryList = createAsyncThunk(
    'PlayList/HistoryList',
    async function () {
        const result = await HistoryList.fetchHistoryList();
        return result
    }
)

const PlayList = createSlice({
    name:'ListOfMusic',
    initialState,
    reducers:{
       getAudio:(state)=>{
        // const url = "http://localhost:3000/"
        state.currentUrl = URL+  state.historyMusic[state.currentMusic].Source
       },
       NextMusic:(state)=>{
        if(state.currentMusic<state.historyMusic.length){
            state.currentMusic += 1
        }
        
       },
       PrevMusic:(state)=>{
        if(state.currentMusic>0){
            state.currentMusic--
        }else{
            state.currentMusic = 0
        }
       }
       
    },
    extraReducers(builder) {
        builder.addCase(fetchhistoryList.fulfilled,(state,action)=>{
            state.historyMusic = action.payload
        })
        builder.addCase(fetchhistoryList.rejected,(state,action)=>{
            state.error=action.error
        })
        
    },
})

export const {getAudio,NextMusic,PrevMusic} =  PlayList.actions;
export default PlayList.reducer;