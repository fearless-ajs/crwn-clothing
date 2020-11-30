import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from "../../redux/cart/cart.selectors";

import './cart-dropdown.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropDown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))}
        </div>
        <CustomButton >Go To Checkout</CustomButton>
    </div>

);
//To pull the data from our redux
const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});
export default connect(mapStateToProps)(CartDropDown);