import './Header.scss'
import logo from '/logo.svg'
import search from '../../assets/search.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
/**
 * 网页菜单栏
 * - logo
 * - 音乐馆一级菜单，二级菜单
 * - 搜索框
 * - 用户头像
 * @returns 
 */
function Header(){
    const [state,setState] = useState('')
    useEffect(()=>{
        window.addEventListener('scroll',handlerscroll)
        return(()=>window.removeEventListener('scroll',handlerscroll))
    })
    const handlerscroll = ()=>{
        const scrollHigh = document.documentElement.scrollTop
        if(scrollHigh < 350){
            setState('')
        }else{
            setState('scrolled')
        }
    }
return (
    <header className= {`hearContainer ${state}`}>
        <div className="Container">
            <div className="LOGOContainer"><img className='logo' src={logo} alt="logo" /></div>
            <div className="MenuContainer">
                <div className="musicHall vistedSite">
                    <span>Mucis Hall</span>
                    <nav className="secondMenu">
                        <a className="vistedSite">Main</a>
                        <a>Rank</a>
                        <a>Singer</a>
                        <a>Song List</a>
                    </nav>
                </div>
                <nav className="myMusic">
                   <a><span>My Music</span></a>
                </nav>
            </div>
            <div className="searchContainer">
                <input className="searchInput" type="text" />
                <div className="search">
                    <img className='searcIcon' src={search} width="20" height='20'></img>
                </div>
            </div>
            <Link to ='/Login' className="userContainer">
                <span className="loginIcon"></span>
            </Link>
            <div className="userContainer_Logined">
                <div className="messageUser">
                    <a><span className="messageaIcon"></span></a>
                </div>
                <div className="loginUser">
                    <a><img className="userAvatar"></img></a>
                </div>
            </div>
        </div>
    </header>
)
}
export default Header