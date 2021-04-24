/* eslint-disable no-unused-vars */
import axios from 'axios';
const ytCloneExceed='AIzaSyBWoq3PTTUUdFjBqYbr7WDFeYHDe5Ajqm4'
const ytClone='AIzaSyAyBC0U1zPxljyMpxw9QG0C09OuddjxKZs';
const netflixClone='AIzaSyAmsAmcTlwv0LuAQPlUi2Or-TdpbT6fN_k'


const instance = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:netflixClone
    }
})

export default instance;