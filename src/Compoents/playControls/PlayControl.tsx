import './playControls.scss'

import last from '../../assets/last.svg';
import play from '../../assets/play.svg';
import next from '../../assets/next.svg'
import stop from '../../assets/stop.svg'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store';
import { playAction } from '../../store/PlayingMusic/PlayingMusic';
import { NextMusic, PrevMusic } from '../../store/PlayList/PlayList';

const PlayControl = () => {
    const store = useSelector((state: RootState) =>
        state.playingMusicInfomation
    )
    /**
      * 播放列表
      */
    //   const HistoryList = useSelector((state: RootState) =>
    //     state.PlayList
    //     )
    const dispatch = useDispatch<AppDispatch>();

    const handlerPlay = () => {

        dispatch(playAction(!store.isPlay))
    }
    const onNext = () => {
        // HistoryList.currentMusic +=1
        dispatch(NextMusic())


    }
    const onPrev = () => {
        // HistoryList.currentMusic +=1
        dispatch(PrevMusic())


    }
    return (
        <div className="playerControls">
            <div className="lastControl" onClick={onPrev} >
                <img src={last} alt="last song" title='last song' />
            </div>
            {
                store.isPlay ? <div className="stopcontrol" onClick={handlerPlay}>
                    <img src={stop} alt="stop" title='stop' /></div>
                    : <div className="playcontrol" onClick={handlerPlay}>
                        <img src={play} alt="play" title='paly' />
                    </div>
            }

            <div className="nextControl" onClick={onNext}>
                <img src={next} alt="next song" title='next' />

            </div>
        </div>
    )
}
export default PlayControl