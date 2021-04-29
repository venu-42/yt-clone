import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfiniteCustomScroll from '../components/InfiniteScroll/InfiniteScroll';
import { getSubscriptions } from '../redux/actions/subscriptions.actions';
import { ChannelSearch } from './SearchScreen/SearchScreen';

const Subscriptions = () => {
    const dispatch = useDispatch();
    const subscriptions =useSelector((state) => state.subscriptions);
    useEffect(() =>{
        dispatch(getSubscriptions())
    },[])
    return (
        <>
            {subscriptions.body?.length&&
                <InfiniteCustomScroll length={subscriptions.body?.length} hasMore={false} >
                    {subscriptions.body.map((subsc)=>(
                        <ChannelSearch item={subsc} type="subscription" key={subsc.snippet.resourceId.channelId} />
                    ))}
                </InfiniteCustomScroll> 
            }
        </>
    )
}

export default Subscriptions
