import Homeblock from '../../Compoents/Homeblock/Homeblock'
import './Homeview.scss'
import album from '../../assets/album.jpg'
import { useEffect } from 'react'
import {recommendList} from '../../Services/index.js'

const Homeview = () => {
    // const [homedata,sethomedata] = useState({
    //     hotCategory:[],
    //     hotRecommend:[],
    //     newLanList:[],
    //     newSonglist:[],
    // })
    useEffect(()=>{
        async function getdata() {
            const data = await  recommendList.fetchRecommendList()
            console.log(data);
        }
      
        getdata()
      
    },[])

    return (
        <main className="MainContainer">
            
                <div className="BannerContainer">
                    <div className="bgimgContainer">
                        <img className='bannerBg' src={album} alt="" />
                    </div>
                    <div className="ablumimgContainer">
                        <img className='banner' src={album} alt="" />
                    </div>
                    <div className="controlContainer">
                        <div className="last">
                            <span></span>
                        </div>
                        <div className="next">
                            <span></span>
                        </div>
                    </div>

                </div>
                <Homeblock></Homeblock>
                <Homeblock></Homeblock>
        </main>
    )
}
export default Homeview