/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './_header.scss';
import {IoNotificationsSharp} from 'react-icons/io5'
import {MdApps,BsSearch,FaVideo,GiHamburgerMenu} from 'react-icons/all';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Header = ({toggleHandler}) => {
    const dispatch = useDispatch();
    
    const logoutHandler = ()=>{
        dispatch(logout());
    }
    
    return (
        <nav className="navbar navbar-expand">
            <div className='mr-3 text-large' style={{cursor:'pointer'}} onClick={toggleHandler} ><GiHamburgerMenu/></div>
            <a className="navbar-brand" href="/">
                <img src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png" alt='home' width='30px' />
                <p className='home__btn'>YOUTUBE</p>
            </a>
            
            <div className='search__bar'>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <div><BsSearch className=' vertical-align-middle' /></div>
                </form>
            </div>
            <ul className="navbar-nav ml-auto align-items-center">
                <li>
                    <a className="nav-link" href="#"><FaVideo /></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="#"><IoNotificationsSharp /></a>
                </li>
                <li>
                    <a className="nav-link" href="#"><MdApps /></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="https://lh3.googleusercontent.com/ogw/ADGmqu8lCkKRc9CXtoT02KLdxBKuWguOeGQvbp2nrHanMRo=s32-c-mo" alt="dp"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Profile</a>
                        <a className="dropdown-item" href="#">Settings</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" onClick={logoutHandler} >Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header
