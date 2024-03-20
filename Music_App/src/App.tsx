import {  useEffect, useRef } from 'react'

import LayoutDefault from './layouts/LayoutDefaule';
import './App.css'
import music from './assets/music.mp3'
import { FormatTime } from './Common/helper'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from './store/store';
import { getAudioInfo,changecurrentTimeAndprogress ,musicEnd} from './store/PlayingMusic/PlayingMusic';
import Homeview from './views/Homeview/Homeview';

function App() {
  const store = useSelector((state: RootState) =>
    state.playingMusicInfomation
  )
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 使用useRef 监听audio,解决了audio内容变化引起的渲染问题
   */
  const audioRef = useRef(new Audio(''))
/**
 * 根据audio自带属性readyState来判断音乐资源是否准备好，预防出现读取不到audio时间的状况（nan)
 */

  useEffect(() => {
    
    if (audioRef === null) {
      dispatch(getAudioInfo({
        isPlay: false,
        allTime: "00:00",
        currentTime: "00:00",
        volume: 0,
        ended: false,
        progress: '0',
      }))
    }else if(audioRef.current.readyState === 4){
      const allTime = FormatTime(audioRef.current.duration)
      // const minutes=  String(Math.floor(audioRef.current.duration / (60))).padStart(2, '0')

      
      // const seconds =  String(Math.floor(audioRef.current.duration % 60)).padStart(2, '0')
      const current = FormatTime(audioRef.current.currentTime)
      const progress = Math.floor(audioRef.current.currentTime / audioRef.current.duration) * 100;
      dispatch(getAudioInfo({
        isPlay: store.isPlay,
        allTime:  allTime,
        currentTime: current,
        volume: audioRef.current.volume,
        ended: audioRef.current.ended,
        progress: progress + '%',
      }))
    }
  }, [audioRef.current.readyState])

  /**
   * 通过store中的isPlay属性控制音乐是否播放
   */
  useEffect(() => {
    const currentRef = audioRef.current
    if (currentRef === null) {
      return
    }
    if (store.isPlay) {
      currentRef.play()
    } else {
      currentRef.pause()
    }

  }, [store.isPlay])

  /**
   * audio组件时间在变化是更改store中的属性
   */
  const updateCurrentTime = () => {
    const currentRef = audioRef.current
    const current = FormatTime(currentRef.currentTime)
    const progress = (currentRef.currentTime / currentRef.duration) * 100;
    
    

      dispatch(changecurrentTimeAndprogress({currentTime:current,progress:`${progress}%`}))
      if(progress === 100){
        dispatch(musicEnd(false))
        // dispatch(changecurrentTimeAndprogress({currentTime:"00:00",progress:`0%`}))
  
      }

  }


  return (
    <>
      <audio preload='auto' src={music} id='music' onTimeUpdate={updateCurrentTime} ref={audioRef}></audio>
      <LayoutDefault>
        <Homeview></Homeview>
      </LayoutDefault>
    </>
  )
}

export default App
