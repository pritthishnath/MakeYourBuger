import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import "./App.css";

const App = () => {
  // const[show, setShow] = React.useState(true);
  // setTimeout(()=> (setShow(false)) , 3000)

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
