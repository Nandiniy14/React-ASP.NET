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
                    var result = tx.Run("CREATE (a:Employee{empid:$e.empid,name:$e.name,phone:$e.phone,designation:$e.designation}) " +
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

        public void DeleteEmployee(EmployeeID empid)
        {
            using (var session = _driver.Session())
            {
                var res = session.WriteTransaction(tx =>
                {
                    var result = tx.Run("WITH $empid.empid AS ids MATCH(n:Employee) WHERE n.empid IN ids  DELETE n",new { empid});
                    return result;
                });
            }
        }

        public void UpdateEmployee(EmployeeModel e)
        {
            using (var session = _driver.Session())
            {
                var greeting = session.WriteTransaction(tx =>
                {
                    var result = tx.Run("Match (a:Employee{empid:$e.empid}) SET a.name=$e.name, a.phone=$e.phone,a.designation=$e.designation return a ",
                        new { e });
                    return result.Single()[0].As<string>();
                });
            }
        }

        public void Dispose()
        {
            _driver?.Dispose();
        }
    }
}
