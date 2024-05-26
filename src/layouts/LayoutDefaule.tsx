import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from "./Header/Header";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import Footer from "./Footer/Footer";
// import music from '../assets/music.mp3'
import { FormatTime } from '../Common/helper'
import { AppDispatch, RootState } from '../store/store';
import { getAudioInfo, changecurrentTimeAndprogress, musicEnd } from '../store/PlayingMusic/PlayingMusic';
import { hastoken } from '../store/Userstore/Userstore'
import { Outlet } from 'react-router-dom';
import { fetchhistoryList, getAudio } from '../store/PlayList/PlayList.js'

import { getToken } from '../Common/token-manager';

/**
 * 模板页面，
 * - 默认页面使用 header - main - 播放器 - footer
 * - 音乐播放页面 header - main - footer
 */
// type layoutProps = {
//     children:React.ReactNode
// }



function LayoutDefault() {


  // const url = "http://localhost:3000"
  const initUser = [{
    ID: 4,
    Music_ID: 1,
    Title: "倔强",
    Name: '五月天',
    Source: "assets/刀郎/西海情歌/西海情歌.mp3",
    Lyric: "assets/周杰伦/晴天/晴天-周杰伦.lrc"
  }]
  const [palyList] = useState(initUser)

  const dispatch = useDispatch<AppDispatch>();
  /**
 * 播放列表
 */
  const HistoryList = useSelector((state: RootState) =>
    state.PlayList
  )
  /**
  * 使用useRef 监听audio,解决了audio内容变化引起的渲染问题
  */
  // const audioRef = useRef(new Audio(url + HistoryList.historyMusic[0].source))
  /**
  * 页面刷新时store数据会清空，但localstorange中token不变，判断此时用户是否登录
  */
  useEffect(() => {
    const token = getToken()
    if (token) {
      dispatch(hastoken(token))
    }
    dispatch(fetchhistoryList())
  }, [])
  const audioRef = useRef(new Audio(palyList[0].Source))
  /**
  * 
  * 当前播放信息
  */
  const store = useSelector((state: RootState) =>
    state.playingMusicInfomation
  )/**
* 根据audio自带属性readyState来判断音乐资源是否准备好，预防出现读取不到audio时间的状况（nan)
*/
  useEffect(() => {
    // setplayList(HistoryList.historyMusic)
    dispatch(getAudio())
    audioRef.current.src = HistoryList.currentUrl



  }, [HistoryList.historyMusic, HistoryList.currentUrl, HistoryList.currentMusic])


  useEffect(() => {
    console.log(audioRef.current.readyState);

    const allTime = FormatTime(audioRef.current.duration)
    const current = FormatTime(audioRef.current.currentTime)
    const progress = Math.floor(audioRef.current.currentTime / audioRef.current.duration) * 100;
    dispatch(getAudioInfo({
      isPlay: store.isPlay,
      allTime: allTime,
      currentTime: current,
      volume: audioRef.current.volume,
      ended: audioRef.current.ended,
      progress: progress + '%',
    }))
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




    dispatch(changecurrentTimeAndprogress({ currentTime: current, progress: `${progress}%` }))
    if (progress === 100) {
      dispatch(musicEnd(false))
    }

  }

  return (
    <div className='containerAll'>
      <audio preload='auto' src='' id='music' onTimeUpdate={updateCurrentTime} ref={audioRef}></audio>
      <Header></Header>
      <Outlet />
      
      <MusicPlayer></MusicPlayer>
      <Footer></Footer>
    </div>
  )
}
export default LayoutDefault

