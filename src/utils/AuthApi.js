class AuthApi{
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _validateQuerry(res) {
        if(res.ok){
            console.log(res);
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    register({email, password}) {
        return fetch(`${this.baseUrl}/sign-up`, 
        {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })   
        .then((response) => {
            console.log(response);
            return response.json();
        })
           
    }

    login({email, password}) {
        return fetch(`${this.baseUrl}/sign-in`, 
        {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })
            .then(this._validateQuerry.bind(this))
            .then((data) => {
                if(data.jwt) {
                  localStorage.setItem('jwt', data.jwt);
                  return data;
                }
            
        })   
    }
    
    getContent = (token) => {
        return fetch(`${this.baseUrl}/users/me`, 
        {
            method: 'GET',
            headers: {...this.headers,
                'Autorization' : `Bearer ${token}`
            },
        })
        .then(this._validateQuerry.bind(this))
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