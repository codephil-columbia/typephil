import React, { Component } from 'react';
import Button from 'react-button-component';


const Redirect = Button.extend`

`

export default class RedirectPage extends Component{
    constructor(props){
        super(props)
        
        this.state = {

        };

    }

    render(){
        return (
            <div>
               <Redirect onClick={() => this.props.history.push('/')}>Enter</Redirect>
            </div>
        )
    }

}
