import { HttpClient } from "../Common/HttpClient";

// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

const BASE_URL = 'http://localhost:3000'


class RankList extends HttpClient {
	async fetchRankList() {
		try {
			return this.get('/rank/',{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}

	async getMusic(ID) {
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

export default new RankList({
	httpProvider,
	baseURL: BASE_URL,
	// getToken,
})