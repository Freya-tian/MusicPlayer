import { HttpClient } from "../Common/HttpClient";
import httpProvider from "../Common/FetchProvider";
const Base_URL = 'http://localhost:3000'
class BannerData extends HttpClient{
    async getbannerData(){
        try{
            return this.get('/')
        }catch(e){
            throw Error(e)
        }
    }
}
export default new BannerData({
    httpProvider,
    BaseURL:Base_URL
})