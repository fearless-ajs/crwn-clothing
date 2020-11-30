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