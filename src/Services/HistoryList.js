import { HttpClient } from "../Common/HttpClient";

// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

const BASE_URL = 'http://localhost:3000'


class HistoryList extends HttpClient {
	async fetchHistoryList() {
		try {
			return this.get('/historyList/',{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new HistoryList({
	httpProvider,
	baseURL: BASE_URL,
	// getToken,
})