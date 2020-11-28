import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from "../../assets/crown.svg";

import './header.styles.scss';
import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden }) => (
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
          <CartIcon />
      </div>
      {
          hidden ? null :
              <CartDropDown />
      }

  </div>
);

// Get user and cart state from the root reducer
//To be used anywhere we need properties from our reducer
const mapStateToProps = ({user: { currentUser }, cart: { hidden } }) => ({
   currentUser,
   hidden
});

//connect is a higher order component
export default connect(mapStateToProps)(Header);