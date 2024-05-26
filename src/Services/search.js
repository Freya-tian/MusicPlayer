import { HttpClient } from "../Common/HttpClient";

// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

const BASE_URL = 'http://localhost:3000'


class SearchVal extends HttpClient {
	async search(value) {
		try {
			return this.get(`/search/?value=${value}`,{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new SearchVal({
	httpProvider,
	baseURL: BASE_URL,
	// getToken,
})