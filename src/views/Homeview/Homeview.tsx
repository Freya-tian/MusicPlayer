import Homeblock from '../../Compoents/Homeblock/Homeblock'
import './Homeview.scss'
import album from '../../assets/album.jpg'
import { useEffect, useState } from 'react'
import { recommendList } from '../../Services/index.js'
// import LayoutDefault from '../../layouts/LayoutDefaule.js'
// import { BlockID } from '../../Compoents/Homeblock/Homeblock'
export interface ReconmendListResponse {
    recommendlist: { Introduction: string, MusicList_ID: number, Play_times: number, image: string, list_Name: string }[],
    types: { Tag_ID: number, Tag_Name: string, group: string }[]
}
const Homeview = () => {
    const [list, setrecommendlist] = useState<ReconmendListResponse>();
    // const [bolckid] = useState(1)
    // const [types,settypes] = useState<{Tag_ID:number,Tag_Name:string,group:string}[]>();

    useEffect(() => {
        async function getdata() {
            await recommendList.fetchRecommendList().then((res: ReconmendListResponse) => {
                const result = res as ReconmendListResponse
                setrecommendlist({
                    recommendlist: [...result.recommendlist],
                    types: [...result.types]
                })

            })

        }
        getdata()

    }, [])


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
                <Homeblock {...list} id={1} ></Homeblock>
                <Homeblock id={2}></Homeblock>
            </main>
        

    )
}
export default Homeview