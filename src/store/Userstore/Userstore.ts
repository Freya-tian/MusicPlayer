import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {Userservices} from '../../Services/index.js'

interface userInfo {
    user:object|null,
    logined:boolean
}



const initialState: userInfo = {
    user:null,
    logined:false
    

}
type loginInfo = {
    email:string|undefined,
    password:string
}
type resposeLogin = {
    status:number,
    
        token:string
    
}
// type errortype={
//     message:string
// }
const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers:
    {
        login:(state,action:PayloadAction<loginInfo>)=>{
           const res= Userservices.Login(action.payload)
           if(res){         
            res.then((data:resposeLogin)=>{
                localStorage.setItem('user',data.token)
            })
            return {...state,logined:true}
           }
            
        },
        getMe:(state)=>{
            const data = Userservices.getUer()
            console.log(data);
            
        }
    }
})

export const {login,getMe} =userInfo.actions
export default userInfo.reducer;