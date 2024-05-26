import './Homeblock.scss'
import {URL} from '../../Common/helper.js'
// import test1 from '../../assets/test/test1.png'
// import {   ReactNode } from 'react'
// import { ReconmendListResponse } from '../../views/Homeview/Homeview'
import {} from '../../Services/index.js'
export type BlockID = | {id:1} |{id:2}
type ReconmendListResponse ={
    recommendlist ?: {Introduction:string|null,MusicList_ID:number,Play_times:number,image:string,list_Name:string}[],
    types?:{Tag_ID:number,Tag_Name:string,group:string}[],
    id:number   
}

const Homeblock :React.FC<ReconmendListResponse> = ({types,id=1,recommendlist}) => {
    // const getMusic = (event)=>{
    //     getMusicList(event)
    // }

    return (
        <div className="albumContainer">
            <div className="Container">
                <h3>{id===1?"Recommendation List":"New List"}</h3>
                <nav className="blockMenu">
                    {id===1?<a href={`/tags/r1`} className='visited'>为您推荐</a>:<a href={`/tags/r2`} className='visited'>国内</a>}
                {
                    types===undefined?'':types.map(item=><a href={`/tags/${item.Tag_ID}`} key={item.Tag_ID} >{item.Tag_Name}</a>)
                }   
                </nav>
                <ul className="ablumList" >
                    {
                        recommendlist===undefined?'':recommendlist.map(item=>(<li key ={item.MusicList_ID} >
                            <div className="imgcontainer">
                                <img src={URL+item.image} alt="" />
                            </div>
                            <span>{item.list_Name}</span>
                            <span >播放量：{item.Play_times}</span>
                        </li>))
                    }
            
                </ul>
            </div>
        </div>
    )
}
export default Homeblock 


type listarr =
    { Music_ID: number, Title: string, Name: string, rank: number, rankID: number }
type Rank = {
    songs :listarr[],
    
}

export const Rankblock :React.FC<Rank> = ({songs}) => {
    // const getMusic = (event)=>{
    //     getMusicList(event)
    // }
    // console.log(ranklist);
    

    return (
        <table className="ranklist">
            {
                songs.map((item,index)=>(index !== 0?
                    <tr key={item.Music_ID} >
                        <td><h4>{index}</h4></td>
                        <td>{item.Title}</td>
                        <td>{item.Name}</td>
                        
                    </tr>:''
                ))
            }
        </table>
    )
}