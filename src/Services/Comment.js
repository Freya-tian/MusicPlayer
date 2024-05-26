import { HttpClient } from "../Common/HttpClient";

// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

const BASE_URL = 'http://localhost:3000'


class CommentServes extends HttpClient {
	async postComment(data) {
		try {
			return this.post('/comment/',{data:data,
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	async getComment(musicID) {
		try {
			return this.get(`/comment/?musicID=${musicID}`,{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	async postReply(data) {
		try {
			return this.post(`/comment/reply`,{data:data,
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	async getallReply(musicID) {
		try {
			return this.get(`/comment/reply/?musicID=${musicID}`,{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	async updateReply(id) {
		try {
			return this.put(`/comment/reply/?replyid=${id}`,{
				headers:{
					'Content-Type': 'application/json',
				}
			})
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new CommentServes({
	httpProvider,
	baseURL: BASE_URL,
	// getToken,
})