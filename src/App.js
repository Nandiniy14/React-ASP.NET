import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EmployeeForm } from './components/EmployeeForm';
import { RegisteredEmployees } from './components/RegisteredEmployees';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/employeeform' component={EmployeeForm} />
            <Route path='/registered' component={RegisteredEmployees} />
      </Layout>
    );
  }
}
