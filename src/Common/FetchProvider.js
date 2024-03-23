export  class FetchProvider{
    conputedQueryParams(query){
        if(!query) return ''
        const queryParams = new URLSearchParams(query);
        return '?' + queryParams.toString()
    }
    request(options){
        let body=null
        if(options.path==='/user/register'){
            body = options.data            
        }else{
            body = options.data?JSON.stringify(options.data) : null; 
        }       
        
        
        return fetch(options.baseURL+options.path+this.conputedQueryParams(options.query),       
        {
            headers:options.headers,
            body,
            method:options.method
        }).then((response)=>{
            if(!response.ok) return Promise.reject(response)
            return response
        }).then((response)=>{
            if(response.status > 201) return Promise.reject(response)
            return response.json()

        }).then((data)=>{
            return data
        })
    }

    get(path,requestOptions){
        return this.request({path,method:'GET',...requestOptions})
    }
    post(path,requestOptions){
        
        return this.request({path,method:'POST',...requestOptions})
    }
    put(path,requestOptions){
        return this.request({path,method:'PUT',...requestOptions})
    }
    delete(path,requestOptions){
        return this.request({path,method:'DELETE',...requestOptions})
    }
}

const httpProvider =  new FetchProvider()
export default httpProvider