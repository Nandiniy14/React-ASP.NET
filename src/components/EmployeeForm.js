import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Label } from 'react-bootstrap';
import './EmployeeForm.css';


export class EmployeeForm extends Component {

    constructor() {
        super();
        this.state = { id: '', name: '', phone: '', designation: '' };
    }

    handleSubmit(event) {
       
        event.preventDefault();
        fetch('api/Employee', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                phone: this.state.phone,
                designation:this.state.designation
            })
        })
            .then((response) => response.json())
            .then((responseObj) => {
                alert("Registered Succesfully");
                this.setState({
                    id: '',
                    name: '',
                    phone: '',
                    designation: ''
                });
                console.log(responseObj);
            })

    }

    render() {
        return (
            <div class="container">

                <h3>
                    Add Employee
                    </h3>
                <br />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormGroup
                        controlId="id"
                    >
                        <ControlLabel>Employee ID</ControlLabel>
                        <FormControl
                            type="number"
                            value={this.state.id}
                            placeholder="Enter ID"
                            onChange={(event) => this.setState({ id: event.target.value })}
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