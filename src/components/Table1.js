import React, { Component } from 'react';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table';
import './react-bootstrap-table.min.css';
import './react-bootstrap-table.css';
import './react-bootstrap-table-all.min.css';


/*class Table1 extends Component {

    constructor(props) {
        super(props);
        
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }

     onDeleteRow(rowKeys) {
         console.log(rowKeys);
       

         fetch('api/Employee/' + rowKeys, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseObj) => {
                alert('deleted: ');
                console.log(responseObj);
            })
            
    }
    remote(remoteObj) {
        remoteObj.cellEdit = true;
       
        remoteObj.dropRow = true;
        return remoteObj;
    }
    render() {
        const cellEditProp = {
            mode: 'click'
        };
        const selectRow = {
            mode: 'checkbox' 
        };
        const options = {
            onDeleteRow: this.onDeleteRow
        };
        return (
            <div>
                <BootstrapTable data={this.props.data}
                    selectRow={selectRow}
                    remote={this.remote}
                     deleteRow={true} 
                    cellEdit={cellEditProp}
                    options={options}>
                    <TableHeaderColumn isKey dataField='empid'>
                        Employee ID
          </TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>
                        Employee Name
          </TableHeaderColumn>
                    <TableHeaderColumn dataField='phone'>
                       Contact Number
          </TableHeaderColumn>
                    <TableHeaderColumn dataField='designation'>
                        Designation
          </TableHeaderColumn>
                </BootstrapTable>
                <div>
                    <DeleteRowTable />
                </div>
            </div>

           
        );
    }
}
*/


function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
    fetch('odata/Employee', {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            empid: rowKeys
        })
    })
        .then((response) => response.json())
        .then((responseObj) => {
            alert('deleted: ');
            console.log(responseObj);
        })
}

 
const options = {
    afterDeleteRow: onAfterDeleteRow
};


const selectRowProp = {
    mode: 'checkbox'
};

class Table1 extends React.Component {

    constructor(props) {
        super(props);
        this.afterSaveCell = this.afterSaveCell.bind(this);
    }
    afterSaveCell(row) {
        alert('Update ' + row);
        console.log(row.empid);
        fetch('odata/Employees(' + row.empid+')', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        })
            .then((response) => response.json())
            .then((responseObj) => {
                alert('updated: ');
                console.log(responseObj);
            })
    }

    render() {
        const cellEdit = {
            mode: 'dbclick', 
            blurToSave: false,
            afterSaveCell: this.afterSaveCell
        };
        return (
            <BootstrapTable data={this.props.data} cellEdit={cellEdit} deleteRow={true} selectRow={selectRowProp} options={options}>
                <TableHeaderColumn dataField='empid' isKey>Employee ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Employee Name</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Contact Number</TableHeaderColumn>
                <TableHeaderColumn dataField='designation'>Designation</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}

export default Table1;