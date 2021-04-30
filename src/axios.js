/* eslint-disable no-unused-vars */
import axios from 'axios';
const {REACT_APP_ytClone_API_KEY,REACT_APP_ytCloneExceed_API_KEY,REACT_APP_netflix_API_KEY}=process.env;
// console.log(REACT_APP_netflix_API_KEY,process.env)
const instance = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:REACT_APP_ytClone_API_KEY
    }
})

const URLandPARAMS = (req)=>(
    {
        url:req.url,
        params:req.params
    }
)

instance.interceptors.request.use(request => {
    // console.log('Starting Request', JSON.stringify(URLandPARAMS(request), null, 2))
    return request
  })

export default instance;