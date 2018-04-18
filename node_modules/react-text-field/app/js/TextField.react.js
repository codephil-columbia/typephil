'use strict'

let React = require('react');
let UUID = require('uuid');

let TextField = React.createClass({

  getInitialState: function() {
    this.id = UUID.v4();
    this.currentValue = "";
    return null;
  },

  componentDidMount: function() {
    this.currentValue = (this.props.value == undefined) ? "" : this.props.value;
    document.getElementById(this.id).value = this.currentValue;
  },

  componentWillReceiveProps: function(newProps) {
    this.currentValue = (newProps.value == undefined) ? "" : newProps.value;
    document.getElementById(this.id).value = this.currentValue;
  },

  onChange: function(event) {
    this.currentValue = event.nativeEvent.target.value;
    this.props.setValue(this.currentValue);
  },

  render: function() {
    return (
      <div>
        <label htmlFor={this.id}>{this.props.name}</label>
        <input style={{color: "#000000"}} type="text" className="u-full-width" placeholder={this.props.name} id={this.id} onChange={this.onChange} />
      </div>
    )

  }

});

module.exports = TextField;
