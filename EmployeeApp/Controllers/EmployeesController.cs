using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.Model;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Controllers
{

    public class EmployeesController : ODataController
    {
        private service con;

        public EmployeesController()
        {
            con = new service("bolt://localhost:7687", "neo4j", "123456789");
        }

        [ODataRoute()]
        [EnableQuery]
        public IEnumerable<EmployeeModel> Get()
        {
            List<EmployeeModel> result = con.GetEmployee();
            return result;
        }

        [EnableQuery]
        public IActionResult Post([FromBody]EmployeeModel e)
        {
            con.AddEmployee(e);
            return Ok("Works");
        }

        [EnableQuery]
        [HttpPut]
        public IActionResult Put([FromODataUri] int key,[FromBody] EmployeeModel e)
        {
            con.UpdateEmployee(e);
            return Ok("Update Works");
        }

        [EnableQuery]
        [ODataRoute()]
        public IActionResult Post([FromODataUri] int key,[FromBody] EmployeeID empid)
        {
            con.DeleteEmployee(empid);
            return Ok("Delete Works");

        }
    }
}