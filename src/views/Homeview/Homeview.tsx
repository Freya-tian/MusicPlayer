import Homeblock, { Rankblock } from '../../Compoents/Homeblock/Homeblock'
import './Homeview.scss'
import album from '../../assets/album.jpg'
import { useEffect, useState } from 'react'
import { recommendList, RankList } from '../../Services/index.js'
// import LayoutDefault from '../../layouts/LayoutDefaule.js'
// import { BlockID } from '../../Compoents/Homeblock/Homeblock'
export interface ReconmendListResponse {
    recommendlist: { Introduction: string, MusicList_ID: number, Play_times: number, image: string, list_Name: string }[],
    types: { Tag_ID: number, Tag_Name: string, group: string }[]
}
export interface RankListResponse {
    Music_ID: number, Title: string, Name: string, rank: number, rankID: number,
}
type listarr =
    { Music_ID: number, Title: string, Name: string, rank: number, rankID: number }


const Homeview = () => {
    const [list, setrecommendlist] = useState<ReconmendListResponse>();
    const [hot_song, setHotSong] = useState<listarr[]>([])
    const [new_song, setnewSong] = useState<listarr[]>([])
    const [Original_song, setOriginalSong] = useState<listarr[]>([])
    const inititem = {
        Music_ID: 0,
        Title: '',
        Name: '',
        rank: 0,
        rankID: 0
    }

    // const [bolckid] = useState(1)
    // const [types,settypes] = useState<{Tag_ID:number,Tag_Name:string,group:string}[]>();
    async function getrecommenddata() {
        await recommendList.fetchRecommendList().then((res: ReconmendListResponse) => {
            const result = res as ReconmendListResponse
            setrecommendlist({
                recommendlist: [...result.recommendlist],
                types: [...result.types]
            })

        })

    }
    async function getrankList() {
        await RankList.fetchRankList().then((res: RankListResponse[]) => {
            const hotsongs: Array<listarr> = [inititem]
            const newsongs: listarr[] = [inititem]
            const Original_Songs: listarr[] = [inititem]
            res.map((item: RankListResponse) => {
                switch (item.rankID) {
                    case 1:
                        // setHotSong([...hot_song],item)
                        hotsongs.push(item)
                        setHotSong([...hotsongs])
                        break;
                    case 2:
                        newsongs.push(item)
                        setnewSong([...newsongs])
                        break;
                    case 3:
                        Original_Songs.push(item)
                        setOriginalSong([...Original_Songs])


                        break

                }
            })
            // setHotSong([...hotsongs])
            console.log(res);

        })
    }
    useEffect(() => {
        getrecommenddata()
        getrankList()
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
            {/* <Homeblock id={2}></Homeblock> */}
            <div className="ranlListContainer">
                <h3>Rank</h3>
                <div className="Container">
                    <div className="hotsong">
                        <h4>Hot Song</h4>
                        <Rankblock songs={hot_song} ></Rankblock>
                    </div>
                    <div className="newsong">
                        <h4>New Song</h4>
                        <Rankblock songs={new_song} ></Rankblock>
                    </div>
                    <div className="Originalsong">
                        <h4>Original Song</h4>
                        <Rankblock songs={Original_song} ></Rankblock>
                    </div>
                </div>

            </div>

        </main>


    )
}
export default Homeview