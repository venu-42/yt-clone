/* eslint-disable no-unused-vars */
import axios from 'axios';
const ytCloneExceed='AIzaSyBWoq3PTTUUdFjBqYbr7WDFeYHDe5Ajqm4'
const ytClone='AIzaSyAyBC0U1zPxljyMpxw9QG0C09OuddjxKZs';
const netflixClone='AIzaSyAmsAmcTlwv0LuAQPlUi2Or-TdpbT6fN_k'


const instance = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:ytClone
    }
})

const URLandPARAMS = (req)=>(
    {
        url:req.url,
        params:req.params
    }
)

instance.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(URLandPARAMS(request), null, 2))
    return request
  })

export default instance;