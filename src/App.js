import React from 'react';
import {Container} from 'reactstrap';
import Navigation from './components/UI/Navigation/Navigation';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes';
import NewQuote from './containers/NewQuote/NewQuote';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Quotes}/>
          <Route path="/categories/:name" exact component={Quotes}/>
          <Route path="/quotes" exact component={Quotes}/>
          <Route path="/quotes/:id/edit" exact component={NewQuote}/>
          <Route path="/add-quote" exact component={NewQuote}/>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}
  
export default App;
