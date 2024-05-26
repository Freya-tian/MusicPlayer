import { useState } from 'react'
import './MyMuic.scss'
import {useSelector} from 'react-redux'
import {      RootState } from '../../store/store';
import {Collection} from '../../Services/index.js'

type collection = {
    id_collections:number,
    Music_ID:1,Title:string,
    Name:string
}
const MyMuic = ()=>{
    const store = useSelector((state:RootState)=>
        state.PlayList
      )
      const user = useSelector((state:RootState)=>
        state.userInfo
      )
    const [Historyshow,setHistory] = useState(true)
      const [Collections,setcollection] = useState<collection[]>([])

    const handleCollection = ()=>{
        setHistory(false)
        Collection.getCollectionList(user.user.userid).then((res:collection[])=>{
            setcollection(res)
            
        })
    }
    const handleHistory=()=>{
        setHistory(true)
    }
    const handledelete=(event)=>{
        console.log(event.target.id);
        
        Collection.deleteCollection({
            music_id:parseInt(event.target.id),
            user_id:user.user.userid
        }).then((res)=>{
            console.log(res);
            
            // if(res.data){
            //     setadded(false)
            // }
        })    
    }
    return(
        <div className="MyMusic">
            <ul className="nva">
                <li className={Historyshow?'visted':''} onClick={handleHistory}>History List</li>
                <li className={Historyshow?'':'visted'} onClick={handleCollection}>Collections List</li>
            </ul>
            <div className="ListContainer">
               <table>
                <tr>
                    <th></th>
                    <th>Music Title</th>
                    <th>Singer</th>
                    
                </tr>
                <tbody>
                    {
                        Historyshow?store.historyMusic.map((item,index)=>(<tr key ={item.Music_ID}>
                            <td><h4>{index+1}</h4></td>
                        <td>{item.Title}</td>
                        <td>{item.Name}</td>
                        </tr>)):Collections.map((item,index)=>(
                            <tr key ={item.Music_ID}>
                            <td><h4>{index+1}</h4></td>
                        <td>{item.Title}</td>
                        <td>{item.Name}</td>
                        <td  >
                            <span id={item.Music_ID.toString()} onClick={handledelete}>DEL</span>
                        </td>
                        </tr>
                        ))}
                
                </tbody>
               </table>
            </div>
        </div>

    )
}

export default MyMuic