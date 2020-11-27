import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from "../../assets/crown.svg";

import './header.styles.scss';
import {auth} from "../../firebase/firebase.utils";

const Header = ({currentUser}) => (
  <div className='header'>
      <Link className='logo-container' to='/' >
          <Logo className='logo'/>
      </Link>
      <div className='options'>
          <Link className='option' to='/shop'>
              SHOP
          </Link>
          <Link className='option' to='/contact'>
              CONTACT
          </Link>
          {
              currentUser ? (
                  <div className='option' onClick={() => auth.signOut()}> SIGN OUT</div>
              ): (
                  <Link className='option' to='/signin'>SIGN IN</Link>
              )

          }
      </div>
  </div>
);

// Get user state from the root reducer
//To be used anywhere we need properties from our reducer
const mapStateToProps = state => ({
   currentUser: state.user.currentUser
});

//connect is a higher order component
export default connect(mapStateToProps)(Header);