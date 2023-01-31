import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Routes as Switch, Route } from 'react-router-dom';
import NoPageFound from './components/NoPageFound';
import LoginPage from './components/LoginPage';
import Ribbon from './components/Ribbon';
import PrivateRoute from './components/PrivateRoute'
import PrivatePrivateRoute from './components/PrivatePrivateRoute'
import HomePage from './components/Home';
import AddReport from './components/AddReport';
import AddReportFile from './components/AddReportFile';
import PDFDisplayer from './components/PDFDisplayer';

function App() {
  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar/>
    <Ribbon />
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <PrivateRoute path="/onlyAuthorizedAllowedHere/home" component={HomePage} />
      <PrivateRoute path="/onlyAuthorizedAllowedHere/addreport" component={AddReport} />
      <PrivateRoute path="/onlyAuthorizedAllowedHere/addreportfile/" component={AddReportFile} />
      <PrivatePrivateRoute path="/AuthorizedAllowedHere/pdfDisplayer/:url" component={PDFDisplayer} />
      <Route component={NoPageFound} />
    </Switch>
    </>
  );
}

export default App;