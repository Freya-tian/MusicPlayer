
export class HttpClient  {
    constructor(options){
        if(options.BaseURL) {throw Error('[hTTPcLIENT]:BaseURL is empty!')}
        this.httpProvider = options.httpProvider;
        this.baseURL = options.baseURL
    }
    buildRequest (options = {}) {
		// const token = this.getToken()
		// Добавляем хедеры
		let headers = {
			'Content-Type': 'application/json',
			// Authorization: token ? `Bearer ${token}` : '',
		}
		if (options.headers) {
			headers = {
				...headers,
				...options.headers
			}
		}
		
		return {
			baseURL: this.baseURL,
			headers,
			...options,
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