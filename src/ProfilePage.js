import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import './style/styles.css';
import './style/ProfilePage.css';
