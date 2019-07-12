import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';

const App = () => {
  // const[show, setShow] = React.useState(true);
  // setTimeout(()=> (setShow(false)) , 3000)
  
  return (
    <div>
       <Layout>
         <BurgerBuilder />
       </Layout>
    </div>
  );
}

export default App;
