import React, { Component } from 'react';
import './RegisteredEmployees.css';
import Table1 from './Table1'



export class RegisteredEmployees extends Component {

    constructor() {
        super();
        this.state = {employee:[] }
    }
    componentDidMount() {
        fetch('odata/Employees', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseObj => {
                console.log(responseObj);
                /*let content =
                    responseObj.map((e) => {
                            return (
                                <div>
                                    <Table striped bordered condensed hover>
                                        <tbody>
                                        <tr>
                                                <td>{e.empid}</td>
                                                <td>{e.name}</td>
                                                <td>{e.phone}</td>
                                                <td>{e.designation}</td>
                                            </tr>
                                       </tbody>
                                    </Table>  

                                </div>
                            );
                        });
                    */

                this.setState({ employee: responseObj.value });
                console.log(this.state.employee);
            })
    }

   

    render() {
       
        
        return (
            <div className="container">
                <Table1 data={this.state.employee} />
              
            </div>

            );
    }
}