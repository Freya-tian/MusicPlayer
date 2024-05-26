import { HttpClient } from "../Common/HttpClient";

// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

const BASE_URL = 'http://localhost:3000'


class RecommendList extends HttpClient {
	async fetchRecommendList() {
		try {
			return this.get('/recommend/',{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}

	async getMusicList(ID) {
		try {
			return this.get(`/recommend/?listId =${ID} `,{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}

	
}

export default new RecommendList({
	httpProvider,
	baseURL: BASE_URL,
	// getToken,
})