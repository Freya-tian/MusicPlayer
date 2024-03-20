import { HttpClient } from "../Common/HttpClient";

// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

const BASE_URL = 'http://localhost:3000/api'


class RecommendList extends HttpClient {
	async fetchRecommendList() {
		try {
			return this.get('/api/recommend')
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