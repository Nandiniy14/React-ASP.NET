using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeeApp.Model;


namespace EmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
         
        // GET: api/Employee

        [HttpGet]
        public IEnumerable<EmployeeModel> Get()
        {
            List<EmployeeModel> result;
            using (var getData = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                 result= getData.GetEmployee();

            }
            return result; 
        }
        
        // GET: api/Employee/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Employee
        [HttpPost]
        public EmployeeModel Post([FromBody]EmployeeModel e)
        {
            using (var insertData = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                insertData.AddEmployee(e);
            }
            return e;
        }

        // PUT: api/Employee/5
        [HttpPut]
        public EmployeeModel Put([FromBody] EmployeeModel e)
        {
            using (var update = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                update.UpdateEmployee(e);
            }
            return e;
        }

        // DELETE: api/ApiWithActions/5
       /* [HttpDelete]
        public string Delete([FromBody] EmployeeID empid)
        {
            using (var deleteData = new service("bolt://localhost:7687", "neo4j", "123456789"))
            {
                deleteData.DeleteEmployee(empid);
            }
            return "Sucessfully Deleted";

        } */
    }
}
