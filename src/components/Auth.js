export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
    return fetch(`${BASE_URL}/sign-up`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        .then(res => res.json())
    })   
}

export function login(email, password) {
    return fetch(`${BASE_URL}/sign-in`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        .then(res => res.json())
    })   
}