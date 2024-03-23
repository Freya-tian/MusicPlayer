import './Register.scss'
import {Userservices} from '../../Services/index.js'
import { ChangeEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
type resposeType = {
    status:number,
    data:string
}
const Registerview: React.FC = () => {
    const username = useRef(null);
    const password = useRef(null);
    const avatar = useRef(null);
    const email = useRef(null)
    const [userdatas] = useState(new FormData())
    const [userdata, setUserData] = useState({
        name: '',
        password: '',
        email: ''
    })
    const navigate = useNavigate()
    // const avatarFile = new FormData();
    const handlePostdata = () => {
        if(userdata.name.length !== 0 && userdata.password.length !== 0 &&  userdata.email.length !== 0){            
            userdatas.append('name',userdata.name)
            userdatas.append('password',userdata.password)
            userdatas.append('email',userdata.email)
            Userservices.tRegister(userdatas).then((result:resposeType)=>{ 
                switch(result.status){
                    case 200:
                        navigate('/Login')
                        break;
                    case 202:
                        alert(result.data);
                        userdatas.delete('name')
                        userdatas.delete('password')
                        userdatas.delete('email')
                        break;
                    
                }
                
            }).catch((err:string)=>{
                alert(err);
                userdatas.delete('name')
                        userdatas.delete('password')
                        userdatas.delete('email')
                navigate('/register')
            })
        }
        


    }
    const onchange = (e:ChangeEvent) => {
        const target =  e.target as HTMLInputElement 
       
            switch (target.id) {
                case "1":
                    
                    setUserData({ ...userdata, name: target.value })
                    break;
                case '2':
                   
                    setUserData({ ...userdata, password: target.value })
                    break;
                case '3':
                    

                    if(target.files!==null){
                       
                        if(userdatas.get('avatar')){
                            userdatas.set('avatar',target.files[0] )
                        }else{
                            userdatas.append('avatar',target.files[0])
                        }
                      
                        
                    }
                    break;
                case '4':
                   

                    setUserData({ ...userdata, email: target.value })
                    break;
            }
        
       
   

    }
    return (
        <div className="RegisterContainer">

            <form  className='Loginform' action='' >
                <div className="block">
                    <label htmlFor="">UserNmae :</label>
                    <input type="text" name="username" id="1" placeholder='UserName' ref={username} onChange={onchange} required />
                    <label className='exp'>{(userdata.name.length === 0 )?"please add info " :""}</label>
                </div>
                <div className="block">
                    <label htmlFor="">Password :</label>
                    <input type="password" name="password" id="2" placeholder='Password' ref={password} onChange={onchange} required />
                    <label className='exp'>{(userdata.password.length === 0  )?"please add info " :""}</label>

                </div>
                <div className="block">
                    <label htmlFor="">Avatar :</label>
                    <input type="file" name='avatar' id="3" ref={avatar} onChange={onchange} multiple  />
                   

                </div>
                <div className="block">
                    <label htmlFor="">Email :</label>
                    <input type="email" name='email' id="4" ref={email} onChange={onchange} required />
                    <label className='exp'>{(userdata.email.length === 0 )?"please add info " :""}</label>

                </div>

                <input type='button'  value={'Register'} className="buttoncontainer" onClick={handlePostdata}/>
                
                

            </form>

        </div>
    )
}

export default Registerview