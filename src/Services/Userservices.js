import { HttpClient } from "../Common/HttpClient";
import {getToken} from '../Common/token-manager'
// import { getToken } from './token-manager'
import httpProvider from '../Common/FetchProvider'

// const BASE_URL = 'http://localhost:3000'


class Userservices  extends HttpClient {
	
	async tRegister(data) {
		try {
			
			return this.post('/user/register',{data:data})
		} catch (e) {
			throw Error(e)
		}
	}
	async Login(data) {
		try {
			console.log(data);
			return this.post('/user/login',{data:data,headers:{
				'Content-Type': 'application/json',
			}})
		} catch (e) {
			throw Error(e)
		}
	}
	async getUser() {
		try {
			
			return this.get('/user/userinfo',{headers:{
				'Content-Type': 'application/json',
			}})
		} catch (e) {
			throw Error(e)
		}
	}
	
}

export default new Userservices({
	httpProvider,
	baseURL: 'http://localhost:3000',
	getToken
})