import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";


class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount(){
        const { setCurrentUser } = this.props;

       this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
           //Checks if the user is logged in
           if(userAuth){
               //Checks if they have a record in the database
               //If not, it'll be created AND returned
               const userRef = await createUserProfileDocument(userAuth);
               userRef.onSnapshot(snapShot => { //Get the snapShot of the user data
                   setCurrentUser({
                            id: snapShot.id, //the record id
                            ...snapShot.data() //And other record data
                   });
               });

           } else {
              setCurrentUser(userAuth);
           }

        });
    }

    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                {/*Place any universal component like header and*/}
                {/*footer or modals that is required to run no matter*/}
                {/*the page we are on*/}
                <Header/>
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route  path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    {/*Redirects user to homepage if the user is logged already*/}
                    <Route exact path='/signin' render={() =>
                        this.props.currentUser? (<Redirect to = '/' />
                        ): (
                            <SignInAndSignUpPage />
                            )
                    }
                    />
                </Switch>
            </div>
        );
    }
}



//Now we need the current user value
const mapStateToProps =  createStructuredSelector ({
    currentUser: selectCurrentUser
});

//This component only sets the value of current user, it doesn't actually needs it value
//So we use mapDispatchToProps function to set the value of user in redux
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
