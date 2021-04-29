import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getChannelDetails } from '../../redux/actions/watchActions';

const ChannelScreen = ({match}) => {
    const {params:{channelId}}=match;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannelDetails())
    },[channelId])
    return (
        <div>
            <h2>{}</h2>
        </div>
    )
}

export default ChannelScreen
