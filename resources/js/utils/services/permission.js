import { post } from './api'
export async function updatedPermission(data) {
    try {
        let route = '/api/permission/updated_permission'
        let result = await post(route,data)
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}


export async function sendPermissionApi(permission) {
    let save_permissions_api = localStorage.getItem('save_permissions_api') ? JSON.parse(localStorage.getItem('save_permissions_api')): []
    save_permissions_api.push(permission)
    return localStorage.setItem('save_permissions_api', JSON.stringify(save_permissions_api))
}


export function verifiedSavePermissionApi(permission) {
    let save_permissions_api = localStorage.getItem('save_permissions_api') ? JSON.parse(localStorage.getItem('save_permissions_api')): []
    return save_permissions_api.find(p => p == permission) == permission
}