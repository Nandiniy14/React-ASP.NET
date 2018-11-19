using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.Model;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Controllers
{
    public class EmployeeIDController : ODataController
    {
        private service con;

        public EmployeeIDController()
        {
            con = new service("bolt://localhost:7687", "neo4j", "123456789");
        }
        public IActionResult Post([FromBody] EmployeeID empid)
        {
            con.DeleteEmployee(empid);
            return Ok("Delete Works");

        }

    }
}