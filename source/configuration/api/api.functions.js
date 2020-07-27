import axios from "axios";

import { BASE_URL } from "./api.types"

export const postApi = (data) => {
    console.log("Data: ", data)
    return axios({
        method: 'post',
        url: `${BASE_URL}${data.endpoint}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export const queryGetApi = (data) => {
    console.log("Token: ", data.cancel.token);
    return axios({
        method: 'get',
        url: `${BASE_URL}${data.endpoint}`,
        cancelToken: data.cancel.token,
        params: {
            email: data.emailkey
        },
        data: JSON.stringify(data)
    })
}