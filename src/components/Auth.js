export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
    return fetch(`${BASE_URL}/sign-up`, 
    {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })   
        .then(res => res.json())
    
}

export function login(email, password) {
    return fetch(`${BASE_URL}/sign-in`, 
    {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(res => res.json())
        .then((data) => {
            if(data.jwt) {
              localStorage.setItem('jwt', data.jwt);
              return data;
            }
        
    })   
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, 
    {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Autorization' : `Bearer ${token}`
        },
    })
    .then(res => res.json())
}