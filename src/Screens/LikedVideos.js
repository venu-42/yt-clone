import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header/Header'
import InfiniteCustomScroll from '../components/InfiniteScroll/InfiniteScroll'
import { VideoContainer } from '../components/Video/Video'
import { getLikedvieos } from '../redux/actions/likedvideos.actions'

const LikedVideos = () => {
    const likedVideos = useSelector(state=>state.likedVideos);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getLikedvieos())
    },[dispatch])
    return (
        <>
        <Header />
        {likedVideos.body&&
            <InfiniteCustomScroll length={likedVideos.body?.length} hasMore={likedVideos.nextPageToken?true:false} fetchData={()=>{dispatch(getLikedvieos())}}>
                {likedVideos.body.map(video=>(
                    <VideoContainer video={video} />
                ))}
            </InfiniteCustomScroll>
        }
        </>
    )
}

export default LikedVideos
