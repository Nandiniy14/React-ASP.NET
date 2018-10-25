import React, { Component } from 'react';

export class RegisteredEmployees extends Component {

   
    componentDidMount() {
        fetch('api/Employee', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseObj) => {
                console.log(responseObj);
            })
    }
    render() {
        return (
            <div>
                <h5>
                    Sample
                    </h5>
            </div>

            );
    }
}