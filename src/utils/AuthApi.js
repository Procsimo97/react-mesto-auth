class AuthApi{
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _validateQuerry(res) {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    register({email, password}) {
          return fetch(`${this.baseUrl}/signup`, 
        {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })   
        .then(this._validateQuerry.bind(this))
           
    }

    login({email, password}) {
        return fetch(`${this.baseUrl}/signin`, 
        {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })
            .then(this._validateQuerry.bind(this))
            .then((res) => {
                if(res.token) {
                  localStorage.setItem('jwt', res.token);
                  return res;
                } else {
                    return;
                }
            
        })   
    }
    
    getContent(token) {
        return fetch(`${this.baseUrl}/users/me`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(this._validateQuerry);
    }
}

 const apiAuth = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
 })

 export default apiAuth;