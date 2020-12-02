export const addItemToCart = (cartItems, cartItemToAdd) => {
    //Find if the new item already exist in cartItems object
    const existingCartItem = cartItems.find(
        cartItem  => cartItem.id === cartItemToAdd.id
    );

    //If the item findings returns true
    if (existingCartItem) {
        //map() function returns a new object,
        // since react will not rerender if the object doesn't change
        return cartItems.map(cartItem =>
            //Increment the quantity value if already exists
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }
    //This part runs If this function is fired for the first time, i.e the first time the item will be added
    //Quantity property gets attached the first time around since this
    //If block won't run when it's a new item
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};

export const removeItemFromCart =  (cartItems, cartItemToRemove) => {
    //Check if the item exists in the list
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    //Then check if quantity is equal to 1, if yes remove the entire item instead
    // of decreasing the value of quantity to zero
    if(existingCartItem.quantity === 1){
        //Using the filter() to remove the item
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    //Else reduce the value of quantity of the item
    return cartItems.map(cartItem =>
        //Check from the cartItems list where an item id matches our target
        //Then reduce its quantity
        cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    )

}