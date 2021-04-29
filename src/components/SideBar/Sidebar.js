import React from 'react'
import { AiFillHome, AiFillLike } from 'react-icons/ai'
import { MdSubscriptions } from 'react-icons/md'
import { RiHome2Line, RiPlayList2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './_sidebar.scss'



const Sidebar = () => {
    return (
        <div className='sidebar__container'>
            <div className='sidebar'>
                <div className="navbar p-0">
                    <ul className='nav flex-column w-100'>
                        <li className='nav-item'>
                            <Link to='/'>
                                <AiFillHome />&nbsp;&nbsp; Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/likedvideos'>
                            <AiFillLike />&nbsp;&nbsp; Liked Videos
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/subscriptins'>
                            <MdSubscriptions />&nbsp;&nbsp; Subscriptions
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/'>
                            <RiPlayList2Fill />&nbsp;&nbsp; Your Playlists
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
