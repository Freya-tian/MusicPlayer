
import {URL} from '../../Common/helper.js'
import Axis from '../../Compoents/Axis/Axis';
import PlayControl from '../../Compoents/playControls/PlayControl';
import './musicPlayer.scss'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {      RootState } from '../../store/store';
import {Collection} from '../../Services/index.js'
import { useEffect, useState } from 'react';

/**
 * 固定在屏幕下方的音乐播放器组件
 * @returns 
 */

type reponsetype = {
    data:string
}
function MusicPlayer() {
    const store = useSelector((state:RootState)=>
        state.playingMusicInfomation
      )
      const user = useSelector((state:RootState)=>
        state.userInfo
      )
    const [added,setadded]=useState(false)
    /**
  * 播放列表
  */
  const HistoryList = useSelector((state: RootState) =>
    state.PlayList
    )    
useEffect(()=>{
    setadded(false)
},[HistoryList.currentMusic])
    const colletioncMusic = ()=>{
        if(added){
            Collection.deleteCollection({
                music_id:HistoryList.historyMusic[HistoryList.currentMusic].Music_ID,
                user_id:user.user.userid
            }).then((res:reponsetype)=>{
                console.log(res);
                
                if(res.data){
                    setadded(false)
                }
            })    

        }else{ Collection.postCollection({
            music_id:HistoryList.historyMusic[HistoryList.currentMusic].Music_ID,
            user_id:user.user.userid
        }).then((res:reponsetype)=>{
            console.log(res);
            
            if(res.data){
                setadded(true)
            }
            
        })}
        
       
       

    }
    return (
        <div className="playerContainer">
            <div className="Container">
            
                <div className="allbumContainer">
                    <Link to='/Playing'><img src={URL+HistoryList.historyMusic[HistoryList.currentMusic].image}></img></Link>
                </div>
                <PlayControl></PlayControl>

                <div className="musicPlayInfo">
                    <div className="musicinfo">
                        <div className="musicAndSinger">
                            <span className='musicName'>{HistoryList.historyMusic[HistoryList.currentMusic].Title}</span>
                            <span className="singerName">{HistoryList.historyMusic[HistoryList.currentMusic].Name}</span>
                        </div>
                        <div className="playingTime">
                            <span className='playedTime'>{store.currentTime}</span>
                            <span >/</span>
                            <span className="AllTime">{store.allTime}</span>
                        </div>
                    </div>
                    <Axis progress={store.progress} type={'music'}></Axis>
                </div>
                <div className="voice">
                    <div className="voiceIcon"></div>
                    <Axis progress={Number(store.volume)*100 + '%'} type={'volum'}></Axis>                    
                </div>
                <div className='colletcion'>
                    <div className={`collections ${added? 'collectioned':''}`} onClick={colletioncMusic}></div>
                                       
                </div>
                
            </div>

        </div>
    )
}

export default MusicPlayer;