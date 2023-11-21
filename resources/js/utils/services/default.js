import { get, post } from './api'
export async function uplodFile(data, route) {
    try {
        let result = await post(route, data)
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}