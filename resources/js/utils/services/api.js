import {config} from '../../config'

let baseUrl = config.baseURL




let access_token = localStorage.getItem('access_token');
let headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
}
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    headers['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

export async function get(url) {
    status = true;
    let urlFinal = url
    if (urlFinal[0] == '/') {
        urlFinal = urlFinal.substring(1)
    }

    let newUrl = `${baseUrl}${urlFinal}`

    let result = fetch(newUrl, {
            method: 'GET',
            headers,
        })
        .then((response) => {
            //validar status de la peticion
            status = response.ok
            if (response.status == 401) {
                localStorage.clear()
                window.location = `${baseUrl}login`
            }

            return response.json()
        })
        .then(resp => {
            if (status == 'true') {
                return { data: resp }
            } else {
                throw (resp)
            }
        })
    return result
}

export async function post(url, params={}, notBaseUrl = false) {
    if (params.toLocaleString() == "[object FormData]") {
        delete headers['Content-Type']
        console.log(headers['Content-Type']);
    } else {
        headers['Content-Type'] = 'application/json'
        params = JSON.stringify(params)
    }
    status = true;

    let urlFinal = url
    if (urlFinal[0] == '/') {
        urlFinal = urlFinal.substring(1)
    }

    let newUrl = notBaseUrl ? url : `${baseUrl}${urlFinal}`
    let result = fetch(newUrl, {
            method: 'POST',
            body: params,
            headers,
        })
        .then((response) => {
            //validar status de la peticion
            status = response.ok
            if (response.status == 401) {
                localStorage.clear()
                window.location = `${baseUrl}login`
            }
            return response.json()
        })
        .then(resp => {
            if (status == 'true') {
                return { data: resp }
            } else {
                throw (resp)
            }
        })
    return result
}
