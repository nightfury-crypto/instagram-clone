import React from 'react';
import "./Header.css"
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';


function Header() {    
    return (
        <div className="header">
            <div className="header_image">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" ></img>
            </div>
            <div className="header_icons"></div>

            <Link to="/home">
                <IconButton>
                    <div className="header_home">
                        <HomeIcon fontSize="large" />
                    </div>
                </IconButton>
            </Link> 

            <Link to="/upload">
            <IconButton>
                <div className="header_iconForum">
                    <AddIcon fontSize="large" />
                </div>                
            </IconButton>
            </Link>


            {/* <IconButton>
                <div className="header_iconFav">
                    <FavoriteIcon fontSize="large" />
                </div>
            </IconButton> */}


            <Link to="/profile">
                <IconButton>
                    <div className="header_iconAccount">
                        <AccountCircleIcon fontSize="large" />
                    </div>
                </IconButton>
            </Link>          


        </div>
    )
}

export default Header
