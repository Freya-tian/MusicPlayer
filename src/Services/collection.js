import { HttpClient } from "../Common/HttpClient";
import httpProvider from "../Common/FetchProvider";
const Base_URL = 'http://localhost:3000'
class Collection extends HttpClient{
    async postCollection(data){
        try{
            return this.post('/collection/',{data:data,headers:{
                'Content-Type': 'application/json',
            }})
        }catch(e){
            throw Error(e)
        }
    }
    async deleteCollection(data){
        try{
            return this.delete('/collection/delete',{data:data,headers:{
                'Content-Type': 'application/json',
            }})
        }catch(e){
            throw Error(e)
        } 
    }
    async getCollectionList(userID){
        try{
            return this.get(`/collection/collectionList/?user_id=${userID}`,{headers:{
                'Content-Type': 'application/json',
            }})
        }catch(e){
            throw Error(e)
        } 
    }
}
export default new Collection({
    httpProvider,
    baseURL:Base_URL
})