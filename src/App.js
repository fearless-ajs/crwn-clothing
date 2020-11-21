import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";


function App() {
  return (
    <div>
        {/*Place any universal component like header and*/}
        {/*footer or modals that is required to run no matter*/}
        {/*the page we are on*/}
        <Header />
      <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
