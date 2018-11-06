import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EmployeeForm } from './components/EmployeeForm';
import { RegisteredEmployees } from './components/RegisteredEmployees';
import { GoogleLogin } from 'react-google-login';


export default class App extends Component {
  displayName = App.name

    constructor() {
        super();
        this.state = { isAuthenticated: false, token: '', user: null }
    }
    googleResponse = (response) => {
        console.log(response);
        console.log(response.profileObj);
        this.setState({ isAuthenticated: true });
    };
    render() {
        let content = !!this.state.isAuthenticated ?
            (
                
                <div>
                    
                    <Layout>
                        <Route exact path='/' component={Home} />
                        <Route path='/employeeform' component={EmployeeForm} />
                        <Route path='/registered' component={RegisteredEmployees} />
                    </Layout>

                </div>
            ) : 
            (
                
                <div>
                    
                    <GoogleLogin
                        clientId="938470707842-c9bb0d3fo6jbikpmpbhccn2l99e9ljrv.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                       
                     />
                       
                </div>
              
                
            );
    return (
        <div>
            {content}
            </div>
    );
  }
}
