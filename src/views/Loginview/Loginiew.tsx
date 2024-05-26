import './Loginview.scss'
import { useNavigate } from 'react-router-dom';
import { AppDispatch ,RootState} from '../../store/store.js';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {fetchlogin} from '../../store/Userstore/Userstore.js'


const Loginview: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userdata = useSelector((state: RootState)=>
        state.userInfo
    )
    const navigate = useNavigate()
    const emailref = useRef(null)
    const password = useRef(null)
    const [user,setuser]=useState({
        email:'',
        password:''
    })
    const handlerLogin = async()=>{
        dispatch( await fetchlogin(user))        
    }
    useEffect(()=>{
        if(userdata.logined){
            navigate('/')
        }
    },[userdata.logined])
    const onchange=(e:ChangeEvent)=>{
        const target = e.target as HTMLInputElement 
        switch(target.name){
            case 'username':
                setuser({...user,email:target.value})
                break;
            case 'password':
                setuser({...user,password:target.value})
                break;

        }

    }
    
    return (
        <div className="LoginContainer">
            
            <form action='' className='Loginform'>
                <input type="email" name="username" id="" placeholder='Email' ref={emailref} onChange={onchange}/>
                <input type="password" name="password" id="Password" placeholder='Password'  ref={password} onChange={onchange}/>
                <div className="buttoncontainer">
                    <input className='button' type="button" onClick={handlerLogin} value={"Login"}/>
                    <a href="/register">Register</a>
                </div>

            </form>
            
        </div>
    )
}

export default Loginview