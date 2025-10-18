import {axiosInstance} from './axios';  

export async function getStreamtoken(){
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}