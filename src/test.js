import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


    const list = ["hi", "hello", "yay", "wow", "word", "mehhh", "wowword"]
    const wordMap = list.map((word) => word); 
    console.log(wordMap); 

    if (list.hasOwnProperty('hello')){
        console.log("yeet1")
    }


    if (list.hasOwnProperty('nope')){
        console.log("yeet2")
    }
    else{
        console.log("yeet2")
    }

