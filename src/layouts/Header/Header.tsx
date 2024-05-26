import './Header.scss'
import logo from '/logo.svg'
import search from '../../assets/search.svg'
import message from '../../assets/comment.svg'
import { useEffect, useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommentServes } from '../../Services/index.js'

import { RootState } from '../../store/store.js';
import { useSelector } from 'react-redux';
/**
 * 网页菜单栏
 * - logo
 * - 音乐馆一级菜单，二级菜单
 * - 搜索框
 * - 用户头像
 * @returns 
 */
type responsecomments = {
    Avatar: string,
    Comment_id: number,
    Music_id: number,
    User_ID: number,
    User_Name: string,
    text_comment: string,
    time_publish: string,
    children: replyResponse[]
}
type replyResponse = {
    comment_id: number,
    id: number,
    publish_reply_user_id: number,
    publish_name: string,
    publish_user_avatar: string,
    publish_time: string,
    text: string,
    to_user_name: string,
}
function Header() {
    const [state, setState] = useState('')
    const [inputVal, setinputVal] = useState('')
    const navigate = useNavigate();
    const userdata = useSelector((state: RootState) =>
        state.userInfo
    )
    const [messages, setmessage] = useState<replyResponse[]>([])
    const [showMssages, setshow] = useState(false)
    const [text, setText] = useState('')
   
    const [reply_comment_id, setreply_comment_id] = useState('')
    
    const [reply_to_userId, setreply_to_userId] = useState('')
    const [reply,setreply]=useState(false)
    const [showblockid,setshowblockid]=useState(0)
   
    const textRef = useRef(null)
   
    const handleCommentSubmit = () => {      
            
                const data = {
                    text_comment: text,
                    time_publish: new Date(Date.now()).toLocaleString(),
                    publish_reply_user_id: userdata.user.userid,
                    to_user_id: reply_to_userId,
                    comment_id: reply_comment_id
                }
                CommentServes.postReply(data).then((res) => {
                    console.log(res);

                })
                console.log(data);          


       
    }

    const handleOnchange = (event) => {
        setText(event.target.value)
        
    }
    const handleReply = (event) => {
        console.log(event.target.title);
        setreply(!reply)     
        reply?setshowblockid(parseInt(event.target.accessKey)):setshowblockid(0)
        
        setreply_comment_id(event.target.id)
        console.log(event.target.parentNode);
        setreply_to_userId(event.target.parentNode.title)
       

    }
    useEffect(() => {
        window.addEventListener('scroll', handlerscroll)
        if (userdata.logined) {
            const source = new EventSource(`http://localhost:3000/comment/sse/?userid=${userdata.user.userid}`);
            source.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const message = data.message;
                setmessage(message)

            };

        }
        return (() => window.removeEventListener('scroll', handlerscroll))

    }, [userdata.logined])
    const handlerscroll = () => {
        const scrollHigh = document.documentElement.scrollTop
        if (scrollHigh < 350) {
            setState('')
        } else {
            setState('scrolled')
        }
    }
    const handleSearch = () => {
        navigate(`/search?value=${inputVal}`)
        //    history.push({pathname:'/search',search:`?/value=${inputVal}`})
    }
    const handleClick=()=>{
        setshow(!showMssages)
        messages.map((item)=>{
            CommentServes.updateReply(item.id).then((res)=>{
                console.log();
                
            })
        })
    }

    return (
        <header className={`hearContainer ${state}`}>
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
                        <Link to='/My' ><span>My Music</span></Link>
                    </nav>
                </div>
                <div className="searchContainer">
                    <input className="searchInput" type="text" onChange={(e) => setinputVal(e.target.value)} />
                    <div className="search" onClick={handleSearch}>
                        <img className='searcIcon' src={search} width="20" height='20'></img>
                    </div>
                </div>
                {
                    userdata.logined ? <div className="userContainer_Logined">
                        <div className="messageUser" onClick={handleClick }>
                            <a><img className="messageaIcon" src={message} /></a>
                            {messages.length>0?<div className='countMessage'>{messages.length}</div>:''}
                        </div>
                        <div className="loginUser">
                            <a><img className="userAvatar" src={"http://localhost:3000/" + userdata.user.avatar}></img></a>
                        </div>
                    </div> :
                        <Link to='/Login' className="userContainer">
                            <span className="loginIcon"></span>
                        </Link>
                }
                {
                    showMssages ?
                        <ul className="messagesContainer">
                            {messages.map(item => <li>
                                <div className="replyAvatar">
                                    <img src={`http://localhost:3000/${item.publish_user_avatar}`} alt="" />
                                </div>
                                <div className="contentContainer" title={item.publish_reply_user_id.toString()}>

                                    <div className="user_nick_time">
                                        <span className="user_nick">{item.publish_name}</span>
                                        <span className="time">{item.publish_time.split('T')[0]}</span>

                                    </div>
                                    <p className="content">{`comment to you: ${item.text}`}</p>
                                    <span className="opretion" id={item.comment_id.toString()} title={item.publish_name} accessKey={item.id.toString()} onClick={handleReply}>reply</span>
                                </div>
                                
                                
                                
                                
                            </li>)}
                           {
                            reply?<div className="inputText" >
                            <div id="textareaHigh">

                                <textarea onChange={handleOnchange} ref={textRef} />
                                
                            </div>

                            <input type="button" value="submit" onClick={handleCommentSubmit} />
                        </div>:''
                           } 
                        </ul>
                        : ''
                }


            </div>
        </header>
    )
}
export default Header