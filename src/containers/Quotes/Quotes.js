import React, {Component} from "react";
import axios from '../../axios-api';
import Quote from '../Quote/Quote';
import { Row, Col } from 'reactstrap';
import { CATEGORIES } from "../../constants";
import { NavLink } from 'react-router-dom';

class Quotes extends Component {

  state = {
    quotes: []
  };

  async componentDidMount() {
    await this.getQuotes();
  }

  async getQuotes() {
    let url = '/quotes.json';

    if (this.props.match.params.name) {
      url += `?orderBy="category"&equalTo="${this.props.match.params.name}"`;
    }
    const response = await axios(url);
    if (response.status === 200) {
      const quotes = response.data;
      this.setState({quotes});
    }
  }

  delete = async (event, id) => {
    event.preventDefault();
    await this.deleteQuote(id);
    const quotes = {...this.state.quotes};
    delete quotes[id];
    this.setState({quotes});
  };

  async deleteQuote(id){
    await axios.delete('/quotes/' + id + '.json');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.getQuotes();
    }
  }

  render() {
    const state = this.state.quotes;
    let quotes = null;
    if (state) {
      quotes = (
        Object.keys(state).map(id => (
          <div className='Quote' key={id}>
            <Quote
              key={id}
              author={state[id].author}
              text={state[id].text}
              delete={this.delete}
              id={id}
            />
          </div>
        ))
      ) 
    } if(!state) {
      quotes = <div>There are no quotes in the database, add a quote!</div>;
    }
    return (
      <Row>
        <Col className="pt-4" xs={3}>
          <ul style={{ listStyleType: "none" }}>
            <NavLink to={'/'}>All</NavLink>
            {CATEGORIES.map(c => (
              <li key={c}>
                <NavLink to={'/categories/' + c}>{c}</NavLink>
              </li>
            ))}
          </ul>
        </Col>
        <Col className="pt-4" xs={9}>
          {quotes}
        </Col>
      </Row>
    )
  }
};

export default Quotes;