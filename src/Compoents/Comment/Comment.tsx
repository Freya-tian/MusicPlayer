import './Comment.scss'

import { CommentServes } from '../../Services/index.js'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.js';
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';

interface commentProps {
    musicId: number
}
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
    publish_reply_user_id:number,
    publish_name: string,
    publish_user_avatar:string,
    publish_time: string,
    text: string,
    to_user_name: string,
}
const Comment = ({ musicId }: commentProps) => {
    const userdata = useSelector((state: RootState) =>
        state.userInfo
    )

    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [textlength, settextlength] = useState(0)
    const [reply_comment_id, setreply_comment_id] = useState('')
    const [reply_type, setreply_type] = useState('')
    const [reply_to_userId, setreply_to_userId] = useState('')

    const [reply_id, setreply_id] = useState('')
    const textRef = useRef(null)
    const [comments, setcommets] = useState<responsecomments[]>([])
    const handleCommentSubmit = () => {

        if (userdata.logined) {
            if (textRef.current && !textRef.current.value.includes('@', 0)) {
                const data = {
                    Music_id: musicId,
                    text_comment: text,
                    time_publish: new Date(Date.now()).toLocaleString(),
                    Publish_user_id: userdata.user.userid

                }
                CommentServes.postComment(data).then((res) => {
                    textRef.current ? textRef.current.value = '' : ''
                    settextlength(0)
                })
            } else if (textRef.current && textRef.current.value.includes('@', 0)) {
                const data = {
                    Music_id: musicId,
                    text_comment: text,
                    time_publish: new Date(Date.now()).toLocaleString(),
                    publish_reply_user_id: userdata.user.userid,
                    to_user_id: reply_to_userId,
                    reply_type: reply_type === 'comment' ? 0 : 1,
                    reply_id: reply_type === 'comment' ? null : reply_id,
                    comment_id: reply_comment_id
                }
                CommentServes.postReply(data).then((res) => {
                    console.log(res);

                })
                console.log(data);

            }


        } else {
            navigate('/Login')
        }

    }

    const handleOnchange = (event) => {
        setText(event.target.value)
        settextlength(event.target.value.length)
    }
    const handleReply = (event) => {
        console.log(event.target.title);

        textRef.current ? textRef.current.value = `@${event.target.title}:` : ''
        setreply_comment_id(event.target.id)
        console.log(event.target.parentNode);
        setreply_to_userId(event.target.parentNode.title)
        setreply_type(event.target.accessKey)

    }
    useEffect(() => {
        CommentServes.getComment(musicId).then((res: responsecomments[]) => {
            console.log(res);
            const arr = new Array<responsecomments>()
            res.map(item => {
                const data = {
                    Avatar: item.Avatar,
                    Comment_id: item.Comment_id,
                    Music_id: item.Music_id,
                    User_ID: item.User_ID,
                    User_Name: item.User_Name,
                    text_comment: item.text_comment,
                    time_publish: item.time_publish,
                    children: new Array<replyResponse>()
                }
                arr.push(data)
                // setcommets(arr)
            })
            // setcommets(arr)
            console.log(arr);
            console.log(comments);
            return arr
            
        }).then((arr:responsecomments[]) => {
            CommentServes.getallReply(musicId).then((res: replyResponse[]) => {
                console.log(res);
                
                res.map((item: replyResponse) => {
                    // arr.map((element)=>{
                    //     if(element.Comment_id ===)
                    // })

                    arr.find((element:responsecomments) => element.Comment_id === item.comment_id)?.children.push(item)
                    console.log(arr.find((element:responsecomments) => element.Comment_id = item.comment_id));


                })
                console.log(arr);
                setcommets(arr)
            })
        })
    }, [musicId])

    return (
        <div className="comment">
            <div className="commentsContainer">
                {
                    comments.map((item) =>
                        <div className="All">
                            <div className="commentContent" >
                                <div className="Avatar">
                                    <img src={`http://localhost:3000/${item.Avatar}`} alt="" />
                                </div>
                                <div className="contentContainer" title={item.User_ID.toString()}>

                                    <div className="user_nick_time">
                                        <span className="user_nick">{item.User_Name}</span>
                                        <span className="time">{item.time_publish}</span>

                                    </div>
                                    <p className="content">{item.text_comment}</p>
                                    <span className="opretion" id={item.Comment_id.toString()} title={item.User_Name} accessKey='comment' onClick={handleReply}>reply</span>
                                </div>

                            </div>
                            {item.children.length === 0 ?"":item.children.map(element=>
                                <div className="replyContent" >
                                    <div className="replyAvatar">
                                        <img src={`http://localhost:3000/${element.publish_user_avatar}`} alt="" />
                                    </div>
                                    <div className="contentContainer" title={element.publish_reply_user_id.toString()}>

                                        <div className="user_nick_time">
                                            <span className="user_nick">{element.publish_name}</span>
                                            <span className="time">{element.publish_time}</span>

                                        </div>
                                        <p className="content">{`@ ${element.to_user_name} : ${element.text}`}</p>
                                        <span className="opretion" id={element.id.toString()} title={element.publish_name} accessKey='reply' onClick={handleReply}>reply</span>
                                    </div>

                                </div>
                            )
                                
                                }
                        </div>
                    )
                }

            </div>
            <div className="inputText">
                <div id="textareaHigh">

                    <textarea onChange={handleOnchange} ref={textRef} />
                    <span>{textlength}/1000</span>
                </div>

                <input type="button" value="submit" onClick={handleCommentSubmit} />
            </div>

        </div>)

}

export default Comment