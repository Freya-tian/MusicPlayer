import {getToken} from './token-manager';
export class HttpClient  {
    constructor(options){
        if(!options.baseURL) {console.log(options.baseURL);}
        this.httpProvider = options.httpProvider;
        this.baseURL = options.baseURL
		
    }
	getToken(){
		return getToken()
	}
    buildRequest (options = {}) {
		const token = this.getToken()
		// Добавляем хедеры
		let headers = {
			// 'Content-Type': 'application/json',
			// 'application/json'
			// 'Charset':'utf-8'
			Authorization: token ? `Bearer ${token}` : '',
		}
		if (options.headers) {
			headers = {
				...headers,
				...options.headers
			}
			
		}
		
		return {
			baseURL: this.baseURL,
			
			...options,
			headers,
		}
	}
    checkPath(path) {
		if (!path.startsWith('/')) {
			throw Error('Path should start with /', path)
		}
	}
	
	async get (path, options) {
		this.checkPath(path)
		return this.httpProvider.get(path, this.buildRequest(options))
	}
	
	async post (path, options) {
		console.log(path);
		this.checkPath(path)
		return this.httpProvider.post(path, this.buildRequest(options))
	}
	
	async put (path, options) {
		this.checkPath(path)
		return this.httpProvider.put(path, this.buildRequest(options))
	}
	
	async delete (path, options) {
		this.checkPath(path)
		return this.httpProvider.delete(path, this.buildRequest(options))
	}
}