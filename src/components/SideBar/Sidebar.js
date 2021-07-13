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
                            <Link className="nav-item__link" to='/'>
                                <AiFillHome /> <span>Home</span>
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
                            <Link className="nav-item__link" to='/likedvideos'>
                            <AiFillLike /> Liked Videos
                            </Link>
                        </li> */}
                        <li className='nav-item'>
                            <Link className="nav-item__link" to='/likedvideos'>
                            <AiFillLike /> <span>Liked Videos</span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-item__link" to='/subscriptions'>
                            <MdSubscriptions /> <span>Subscriptions</span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-item__link" to='/'>
                            <RiPlayList2Fill /> <span>Your Playlists</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
