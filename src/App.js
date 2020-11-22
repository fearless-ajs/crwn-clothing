import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount(){
       this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

           //Checks if the user is logged in
           if(userAuth){
               //Checks if they have a record in the databse
               //If not, it'll be created AND returned
               const userRef = await createUserProfileDocument(userAuth);
               userRef.onSnapshot(snapShot => { //Get the snapShot of the user data
                   this.setState({
                        currentUser: {
                            id: snapShot.id, //the record id
                            ...snapShot.data() //And other record data
                        }
                   });
               });

           } else {
               this.setState({
                  currentUser: userAuth,
               });
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
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/signin' component={SignInAndSignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
