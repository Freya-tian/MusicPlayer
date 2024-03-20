import './Axis.scss'
/**
 * 进度条的公共组件；通过type 来控制进度条类型；通过progress 来控制进度条的进度位置
 * - 音乐播放进度条
 * - 声音进度条
 */
type ProgressProps = {
    progress:string,
    type:string
}
const  Axis  =  ({progress}:ProgressProps) =>{

    return (
        <div className="Axis">
            <div className="progess" style={{width:progress}} 
            ></div>
        </div>
    )
}
export default Axis