import React from "react";
import Header from "./Header/Header";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import Footer from "./Footer/Footer";
/**
 * 模板页面，
 * - 默认页面使用 header - main - 播放器 - footer
 * - 音乐播放页面 header - main - footer
 */
type layoutProps = {
    children:React.ReactNode
}
function LayoutDefault(props:layoutProps){
    return (
        <>
            <Header></Header>
            <div className="main">
                {props.children}
            </div>
            <MusicPlayer></MusicPlayer>
            <Footer></Footer>
        </>
    )
}
export default LayoutDefault