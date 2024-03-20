

import Axis from '../../Compoents/Axis/Axis';
import './musicPlayer.scss'
import album from '../../assets/album.jpg';
import last from '../../assets/last.svg';
import play from '../../assets/play.svg';
import next from '../../assets/next.svg'
import stop from '../../assets/stop.svg'
import {useSelector,useDispatch} from 'react-redux'
import { AppDispatch, RootState } from '../../store/store';
import { playAction } from '../../store/PlayingMusic/PlayingMusic';
/**
 * 固定在屏幕下方的音乐播放器组件
 * @returns 
 */

function MusicPlayer() {
    const store = useSelector((state:RootState)=>
        state.playingMusicInfomation
      )
  const dispatch = useDispatch<AppDispatch>();

    const handlerPlay = ()=>{        
        
            dispatch(playAction(!store.isPlay))
        
        
       
    }
    return (
        <div className="playerContainer">
            <div className="Container">
            
                <div className="allbumContainer">
                    <a><img src={album}></img></a>
                </div>
                <div className="playerControls">
                    <div className="lastControl">
                        <img src={last} alt="last song" title='last song'/>
                    </div>
                    {
                        store.isPlay?<div className="stopcontrol" onClick={handlerPlay}>
                        <img src={stop} alt="stop" title='stop'/></div>
                        :<div className="playcontrol" onClick={handlerPlay}>
                        <img src={play} alt="play" title='paly'/>
                    </div>
                    
                    }
                    
                    
                    <div className="nextControl">
                        <img src={next} alt="next song" title='next'/>

                    </div>
                </div>
                <div className="musicPlayInfo">
                    <div className="musicinfo">
                        <div className="musicAndSinger">
                            <span className='musicName'>Music</span>
                            <span className="singerName">Cheng Yi</span>
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
                
            </div>

        </div>
    )
}

export default MusicPlayer;