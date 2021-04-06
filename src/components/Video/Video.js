import React from 'react'
import './_video.scss'

const Video = () => {
    const videos=['video1','video2','video3','','video3','','video3','','video3','']
    return (
        <div className='video__section'>
            {
                videos.map((video,id)=>{
                    return (
                        <VideoContainer key={id} />
                    )
                })
            }
        </div>
    )
}

export default Video



const VideoContainer = ({title}) => {
    return (
        <div className='video__container'>
            <div  className='video__thumbnail'>
                <img src='https://i.ytimg.com/vi/KdtMZYO73-k/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDVQH0D4tR257aK7YOhkHWB3J6GvA' alt='thumbnail' />
                <span className="video__duration">{'6:32'}</span>
            </div>
            <div className="video__details">
                <div className="video__channelimg">
                    <img src="https://yt3.ggpht.com/ytc/AAUvwnjs39FzjzREzTGZS6kP0YEWRHsNVnAjQ2tYRoGung=s68-c-k-c0x00ffffff-no-rj" alt="channelimg"/>
                </div>
                <div className="video__content">
                    <h5 className='video__title'>{'Prelude of Pushparaj | Allu Arjun | Pushpa | Rashmika | Faasil | DSP | Sukumar | Mythri Movie Makers'}</h5>
                    <p className="channel__name">{'channel'}</p>
                    <p className="views__time">{'10K'} views . {'1 hour'} ago</p>
                </div>
            </div>
            
        </div>
    )
}
