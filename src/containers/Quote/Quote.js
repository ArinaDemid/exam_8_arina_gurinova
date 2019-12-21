import React, {Component} from "react";
import {Card, CardText, CardBody, CardTitle} from 'reactstrap';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Quote.css';

class Quote extends Component {

  state = {
    id: ''
  };

  async componentDidMount() {
    this.setState({id: this.props.id});
  } 

  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.state.id) {
      this.setState({id: prevProps.id});
    }
  }
  
  render() {
    return (
      <div>
        <Card className="Quote_block">
          <CardBody>
            <NavLink to={'/quotes/' + this.state.id + '/edit'}><i className="button_edit fas fa-edit" style={{fontSize: '20px'}}/></NavLink>
            <Button className="button_delete" color="link" 
              onClick={event => this.props.delete(event, this.state.id)}>
              <i className="far fa-trash-alt" style={{fontSize: '20px'}}/>
            </Button>
            <CardTitle>Author: {this.props.author}</CardTitle>
            <CardText>Text: {this.props.text}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
};

export default Quote;
