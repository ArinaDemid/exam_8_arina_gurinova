import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from '../../axios-api';
import {CATEGORIES} from '../../constants';

class NewQuote extends Component {

  state = {
    author: '', 
    text: '',
    category: CATEGORIES[0]
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      const response = await axios('/quotes/' + this.props.match.params.id  + '.json');
      if (response.status === 200) {
        const quotes = response.data;
        this.setState({author: quotes.author, text: quotes.text, category: CATEGORIES[0]});
      }
    }
  }

  valueChange = event => this.setState({[event.target.name]: event.target.value});

  submit = async event => {
    event.preventDefault();

    const quote = {
      author: this.state.author,
      text: this.state.text,
      category: this.state.category
    };
    
    if (this.props.match.params.id) {
      const put = {
        author: this.state.author,
        text: this.state.text,
        category: this.state.category
      };
      await this.putQuote(put);
    } else {
      await this.postQuote(quote);
    }

    this.setState({author: '', text: '', category: CATEGORIES[0]});
    this.props.history.push('/');
  };

  async postQuote(quote){
    await axios.post('/quotes.json', quote);
  }

  async putQuote(put){
    await axios.put('/quotes/' + this.props.match.params.id + '.json', put);
  }

  render() {
    let titlePage = null;
    if(this.props.match.params.id) {
      titlePage = <h2 className="NewQuote_title">Edit a quote</h2>
    } else {
      titlePage = <h2 className="NewQuote_title">Submit new quote</h2>
    }

    let formQuote = null;
    if (this.state) {
      formQuote = (
        <div className="NewQuote_block">
        {titlePage}
          <Form className="NewQuote_form" onSubmit={this.submit}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input type="select" name="category" id="category" value={this.state.category} onChange={this.valueChange}>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 NewQuote_group">
              <Label for="author">Author</Label>
              <Input required type="text" name="author" id="author" onChange={this.valueChange} value={this.state.author}
              />
            </FormGroup>
            <FormGroup className="NewQuote_group">
              <Label for="text">Quote text</Label>
              <Input type="textarea" name="text" id="text" onChange={this.valueChange} value={this.state.text}/>
            </FormGroup>
            <Button type="submit" className="NewQuote_button">Save</Button>
          </Form>
        </div>
      )
    }

    return (
      <div>
        {formQuote}
      </div>
    )
  }
};

export default NewQuote;