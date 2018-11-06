﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.Model
{
    public class EmployeeModel
    {
        [Key]
        public int id { get; set; }
        public int empid { get; set; }
        public String name { get; set; }
        public String phone { get; set; }
        public String designation { get; set; }
    }
}
