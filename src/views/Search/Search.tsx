import { useEffect, useState } from 'react'
import './Search.scss'
import { useSearchParams } from 'react-router-dom'
import {SearchVal} from '../../Services/index.js'
import paly from '../../assets/play.svg'
import HightLight from '../../Compoents/Hightlight.js'
type resultres={
    Music_ID:number;
    Title:string,
    Name:string
}

const Search = ()=>{
    const [location,setlocation] = useSearchParams()
    const [result,setResult] = useState<resultres[]>([])
    const value = location.get('value')
    useEffect(()=>{
        // console.log(location.get('value'));
        SearchVal.search(location.get('value')).then((res:resultres[])=>{
            console.log(res);
            setResult(res)
        })
        
    },[location])
    return(
        <div className="resultContainer">
            <table>
                <tr>
                    <th>Index</th>
                    <th>Music</th>
                    <th>Singer</th>
                    <th></th>
                </tr>
                <tbody>
                {
                    result.length===0?'Not Found Anything':result.map((item,index)=>(<tr>
                        <td>{index}</td>
                        <td>
                            <HightLight text= {item.Title} keyword={value}></HightLight>
                            </td>
                        <td>
                        <HightLight text=  {item.Name} keyword={value}></HightLight>
                            </td>  
                        <td>                            
                        <img className='play' src={paly}alt="play" title="paly"></img>
                        </td>                      
                    </tr>))
                }
                </tbody>
                
            </table>
        </div>
    )
}

export default Search