import './Playing.scss'
import {URL} from '../../Common/helper';
import Lyric from 'lyric-parser';
import comment from '../../assets/comment.svg'
import PlayControl from '../../Compoents/playControls/PlayControl'
import Axis from '../../Compoents/Axis/Axis'
import Comment from '../../Compoents/Comment/Comment';
import {useSelector} from 'react-redux'
import {RootState } from '../../store/store';
import { useEffect, useState } from 'react'

const Playing = () => {

    const store = useSelector((state:RootState)=>
        state.playingMusicInfomation
      )
       /**
  * 播放列表
  */
  const HistoryList = useSelector((state: RootState) =>
    state.PlayList
    )

    const [lyric,setLyric] = useState("")
    const [commentshow,setcommentshow] = useState(false)


    useEffect(()=>{
        // console.log(URL+HistoryList.historyMusic[HistoryList.currentMusic].Lyric);
        
        if(HistoryList.historyMusic[HistoryList.currentMusic].Lyric){     
            fetch(URL+HistoryList.historyMusic[HistoryList.currentMusic].Lyric).then((respose)=>respose.text()).then((data)=>{ setLyric(data)})

            const lyrics = new Lyric(lyric)
            setLyric(lyrics.lrc)
            console.log(lyric);
            setcommentshow(false)
            
        }else{
            setLyric('Have no Lyric Source')
            setcommentshow(true)
        }



    },[HistoryList.currentMusic])

    const handleCommentShow =()=>{
        setcommentshow(!commentshow)
    }

    return (
        <div className='playingContainer'>
            <div className="bgimage">
                <img src={URL+ HistoryList.historyMusic[HistoryList.currentMusic].image} alt="" />
            </div>
            <div className="cover">
            </div>
            <div className="topBlock">
                <div className="musicInfo">
                    <div className="coverMusic">
                        <img src={URL+ HistoryList.historyMusic[HistoryList.currentMusic].image} alt=""  />
                    </div>
                    <div className="playControlsCommentcontrols">
                        <PlayControl></PlayControl>
                        <div className="commentControl" onClick={handleCommentShow}>
                            <img src={comment} alt="comment" title='comment' />
                        </div>
                    </div>
                    <Axis progress={store.progress} type={'music'}></Axis>
                </div>
                <div className="LyricComment">
                    <h2>{HistoryList.historyMusic[HistoryList.currentMusic].Title}</h2>
                    <p>Singer: {HistoryList.historyMusic[HistoryList.currentMusic].Name}</p>
                    <hr />
                    {
                        commentshow?<Comment musicId={HistoryList.historyMusic[HistoryList.currentMusic].ID}/>:<div className="lyric">
                        <pre>{lyric}</pre>
                    </div>
                    }
                    
                    
                </div>

            </div>
        </div>
    )
}
export default Playing