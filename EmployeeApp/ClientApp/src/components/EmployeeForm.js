import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Label } from 'react-bootstrap';
import './EmployeeForm.css';


export class EmployeeForm extends Component {

    constructor() {
        super();
        this.state = { empid: '', name: '', phone: '', designation: '' };
    }

    handleSubmit(event) {
       
        event.preventDefault();
        fetch('odata/Employees', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                empid: this.state.empid,
                name: this.state.name,
                phone: this.state.phone,
                designation:this.state.designation
            })
        })
            .then((response) => response.json())
            .then((responseObj) => {
                alert("Registered Succesfully");
                this.setState({
                    empid: '',
                    name: '',
                    phone: '',
                    designation: ''
                });
                console.log(responseObj);
            })

    }

    render() {
        return (
            <div className="container">

                <h3>
                    Add Employee
                    </h3>
                <br />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormGroup
                        controlId="empid"
                    >
                        <ControlLabel>Employee ID</ControlLabel>
                        <FormControl
                            type="number"
                            value={this.state.empid}
                            placeholder="Enter ID"
                            onChange={(event) => this.setState({ empid: event.target.value })}
                        />
                        <FormControl.Feedback />
                        <br />
                        <ControlLabel>Emplloyee Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Enter Name"
                            onChange={(event) => this.setState({ name: event.target.value })}
                        />
                        <FormControl.Feedback />
                        <br />
                        <ControlLabel>Contact Number</ControlLabel>
                        <FormControl
                            type="number"
                            value={this.state.phone}
                            placeholder="Enter Contact Number"
                            onChange={(event) => this.setState({ phone: event.target.value })}
                        />
                        <FormControl.Feedback />
                        <br />
                        <ControlLabel>Designation</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.designation}
                            placeholder="Enter Designation"
                            onChange={(event) => this.setState({ designation: event.target.value })}
                        />
                        <FormControl.Feedback />
                        <br />

                        <Button type="submit" > Submit </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}