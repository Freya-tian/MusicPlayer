import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {Userservices} from '../../Services/index.js'
import {setToken} from '../../Common/token-manager.js'
interface userInfo {
    user:{
        name:string,
        userid:number,
        avatar:string
    },
    logined:boolean,
    error?:object
    
}
const initialState: userInfo = {
    user:{
        name:'',
        userid:0,
        avatar:''
    },
    logined:false ,
    
}
type loginInfo = {
    email:string|undefined,
    password:string
}
// type resposeLogin = {
//     status:number,
    
//         token:string
    
// }
// type errortype={
//     message:string
// }

export const hastoken = createAsyncThunk(
    'userInfo/hastoken',
    async function (token:string) {
        const result = await Userservices.getUser(token);
        const data  = result
        return data
    }
)
export const fetchlogin = createAsyncThunk(
    'userInfo/fetchlogin',
    async function (user:loginInfo) {

        const result = await Userservices.Login(user);
        const data  = result
        return data
    }
)
const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers:
    {       
    //    hastoken:(state,action)=>{
    //     Userservices.getUser(action.payload);
    //     return {...state,logined:true}
    //    }
    },
   extraReducers(builder) {
       builder.addCase(fetchlogin.fulfilled,(state,action)=>{
        state.logined=true,
        setToken(action.payload.token)
        state.user = action.payload.data
       })
       builder.addCase(fetchlogin.rejected,(state,action)=>{
        state.logined=true,
        state.error = action.error
       })
       builder.addCase(hastoken.fulfilled,(state,action)=>{
        state.logined=true,        
        state.user = action.payload.data
       })
   },
})

// export const {hastoken} =userInfo.actions
export default userInfo.reducer;