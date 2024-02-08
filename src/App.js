import NavBar from "./navBar-comp/nav";
import './App.css'
import MainPage from "./Home/MainPage";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductCreation from "./Products/productCreation";
import CustomerComp from "./Customers/customer";
import TransactionsComp from "./Transactions/transactions";


function App() {
  return (
    <div className="App">
      <Router>
      <NavBar/>
        <Switch>
          <Route path="/main" exact  component={MainPage}/>
          <Route path="/product" exact component={ProductCreation}/>
          <Route path="/product" exact component={ProductCreation}/>
          <Route path="/customer" exact component={CustomerComp}/>
          <Route path="/transaction" exact component={TransactionsComp}/>
          <Route   component={MainPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
