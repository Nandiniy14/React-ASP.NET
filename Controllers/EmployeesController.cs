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
        [HttpGet]
        [ODataRoute()]
        [EnableQuery]
        public IEnumerable<EmployeeModel> Get()
        {
            List<EmployeeModel> result;
            using (var getData = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                result = getData.GetEmployee();

            }
            return result;
        }

        [EnableQuery]
        public IActionResult Post([FromBody]EmployeeModel e)
        {
            using (var insertData = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                insertData.AddEmployee(e);
            }
            return Ok("Works");
        }

        [EnableQuery]
        [HttpPut]
        public IActionResult Put([FromODataUri] int key,[FromBody] EmployeeModel e)
        {
           using (var update = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                update.UpdateEmployee(e);
            }
            return Ok("Update Works");
        }

        [EnableQuery]
        [ODataRoute("IDs")]
        public IActionResult Post([FromBody] EmployeeID empid)
        {
            using (var deleteData = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                deleteData.DeleteEmployee(empid);
            }
            return Ok("Delete Works");

        }
    }
}