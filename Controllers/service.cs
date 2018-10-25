using Neo4j.Driver.V1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.Model;
using Newtonsoft.Json;

namespace EmployeeApp.Controllers
{
    public class service : IDisposable
    {
        private readonly IDriver _driver;

        public service(string uri, string user, string password)
        {
            _driver = GraphDatabase.Driver(uri, AuthTokens.Basic(user, password));
        }
         
        public void AddEmployee(EmployeeModel e)
        {
            using (var session = _driver.Session())
            {
                var greeting = session.WriteTransaction(tx =>
                {
                    var result = tx.Run("CREATE (a:Employee{empid:$e.id,name:$e.name,phone:$e.phone,designation:$e.designation}) " +
                                        "RETURN a.empid + ', from node '",
                        new {e});
                    return result.Single()[0].As<string>();
                });
            }
        }

        public List<EmployeeModel> GetEmployee()
        {

            using (var session = _driver.Session())
            {
                List<EmployeeModel> employee = new List<EmployeeModel>();
                var greeting = session.WriteTransaction(tx =>
                {
                    var result = tx.Run("MATCH(a:Employee) RETURN a ");
                    foreach(var record in result)
                    {
                        var nodeProps = JsonConvert.SerializeObject(record[0].As<INode>().Properties);
                        employee.Add(JsonConvert.DeserializeObject<EmployeeModel>(nodeProps));
                    }
                    return employee;
                });
                return greeting;
            }

        }

        public void Dispose()
        {
            _driver?.Dispose();
        }
    }
}
