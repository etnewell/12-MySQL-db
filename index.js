

const inquirer = require("inquirer");
var mysql = require("mysql");
const path = require("path");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "emp_manage_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    homePg();
  });

// Server create request declarations ------------

function createEmp(id, firstName, lastName, roleId, managerId) {
    console.log("Inserting a new employee...\n");
    intId = parseInt(id);
    intRoleId = parseInt(roleId);
    intManId = parseInt(managerId);
    var query = connection.query(
      "INSERT INTO employee SET ?",
      {
        id: intId,
        first_name: firstName,
        last_name: lastName,
        role_id: intRoleId,
        manager_id: intManId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " here!\n");
      }
    );
    console.log(query.sql);
    homePg();
};

function createRole(id, title, salary, departmentID) {
    console.log("Inserting a new role...\n");
    intId = parseInt(id);
    intDepId = parseInt(departmentID);
    var query = connection.query(
      "INSERT INTO role SET ?",
      {
        id: intId,
        title: title,
        salary: salary,
        department_id: intDepId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " here!\n");
      }
    );
    console.log(query.sql);
    homePg();
};

function createDepartment(id, name) {
    console.log("Inserting a new department...\n");
    intId = parseInt(id);
    var query = connection.query(
      "INSERT INTO department SET ?",
      {
        id: intId,
        name: name,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " here!\n");
      }
    );
    console.log(query.sql);
    homePg();
};    

 // Server edit request declarations -----------
 function updateEmp(id, firstName, lastName, roleId, managerId) {
    console.log("Updating...\n");
    intId = parseInt(id);
    intRoleId = parseInt(roleId);
    intManId = parseInt(managerId);
    var query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
            first_name: firstName,
            last_name: lastName,
            role_id: intRoleId,
            manager_id: intManId,
        },
        {
            id: intId,
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " updated!\n");
      }
    );
    console.log(query.sql);
    homePg();
  };
  
  function updateRole(id, title, salary, departmentID) {
    console.log("Updating...\n");
    intId = parseInt(id);
    intDepId = parseInt(departmentID);
    intSalary = parseInt(salary);
    var query = connection.query(
      "UPDATE role SET ? WHERE ?",
      [
        {
            title: title,
            salary: intSalary,
            department_id: intDepId,
        },
        {
            id: intId,
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " updated!\n");
      }
    );
    console.log(query.sql);
    homePg();
  };

  function updateDepartment(id, name) {
    console.log("Updating...\n");
    intId = parseInt(id);
    var query = connection.query(
      "UPDATE department SET ? WHERE ?",
      [
        {
            name: name,
        },
        {
            id: intId,
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " updated!\n");
      }
    );
    console.log(query.sql);
    homePg();
  };


//   Server delete request declarations

function deleteEmp(id) {
    console.log("Deleting...\n");
    intId = parseInt(id);
    connection.query(
      "DELETE FROM employee WHERE ?",
      {
        id: intId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " deleted!\n");

      }
    );
    homePg();
  };

  function deleteRole(id) {
    console.log("Deleting...\n");
    intId = parseInt(id);
    connection.query(
      "DELETE FROM role WHERE ?",
      {
        id: intId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " deleted!\n");
      }
    );
    homePg();
  };

  function deleteDepartment(id) {
    console.log("Deleting...\n");
    intId = parseInt(id);
    connection.query(
      "DELETE FROM department WHERE ?",
      {
        id: intId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " deleted!\n");

      }
    );
    homePg();
  };

// Server view request declarations

function readEmp() {
    console.log("Retrieving...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });
    homePg();
  }

  function readRole() {
    console.log("Retrieving...\n");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });
    homePg();
  }

  function readDepartment() {
    console.log("Retrieving...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });
    homePg();
  }


// Nav menu Declarations ------------

const initQ = [
    {
     type: 'list',
     name: 'initChoice',
     message: 'Would you like to access data?',
     choices: [
         'Yes',
         'No',

     ]
    },

];




const refQ = [
    {
     type: 'list',
     name: 'tableChoice',
     message: 'What data do you want to handle?',
     choices: [
         'Departments',
         'Roles',
         'Employees',
     ]
    },
    {
     type: 'list',
     name: 'crudChoice',
     message: 'What do you want to do to the data?',
     choices: [
         'Create',
         'Edit',
         'Delete',
         'View',
     ]
}
];

// -------------------------------------------

// Employee question declarations

const newEmpQ = [
    {
    type: 'input',
    name: 'first_name',
    message: "What's the employee's first name?"
   },
   {
    type:'input',
    name: 'last_name',
    message: "What's the employee's last name?"
   },
   {
       type:'input',
       name: 'empId',
       message: "What's the employee's id number?"
   },
   {
       type:'input',
       name: 'roleId',
       message: "What's the employees role id?"
   },
   {
    type:'input',
    name: 'mangId',
    message: "What's the employees manager id?"
},
];

const editEmpQ = [
    {
        type:'input',
        name: 'empId',
        message: "What's the employee's id number?"
    },
    {
        type: 'input',
        name: 'first_name',
        message: "What's the employee's first name?"
   },
   {
        type:'input',
        name: 'last_name',
        message: "What's the employee's last name?"
   },
   {
       type:'input',
       name: 'roleId',
       message: "What's the employees role id?"
   },
   {
        type:'input',
        name: 'mangId',
        message: "What's the employees manager id?"
},
];

const delEmpQ = [
    {
        type: 'input',
        name: 'idIn',
        message: 'What is the ID of the employee you would like to remove?'
    },
    {
        type: 'list',
        name: 'delConfirm',
        message: 'Are you sure that you want to delete this?',
        choices: [
            'Yes',
            'No',
        ]
    } 
];
// const viewEmpQ = [
//     {
//         type: 'input',
//         name: 'idIn',
//         message: 'What is the ID of the employee you would like to view?'
//     },
// ];

// ------------------------------------

// Declarations for Department Questions

const newDepQ = [
    {
        type: 'input',
        name: 'dep',
        message: "What's the new department's name?"
    },
    {
        type:'input',
        name: 'id',
        message: "What's the new department's ID number?"
    },
];
const editDepQ = [
    {
        type:'input',
        name: 'idIn',
        message: "What's the new department's ID number?"
    },
    {
        type: 'input',
        name: 'depNewName',
        message: "What's the department's new name?"
    },
];

const delDepQ = [
    {
        type: 'input',
        name: 'idIn',
        message: 'What is the ID of the department you would like to remove?'
    },
    {
        type: 'list',
        name: 'delConfirm',
        message: 'Are you sure that you want to delete this?',
        choices: [
            'Yes',
            'No',
        ]
    } 
];
// const viewDepQ = [
//     {
//         type: 'input',
//         name: 'idIn',
//         message: 'What is the ID of the department you would like to view?'
//     },
// ];
// ---------------------------

// Declarations for role questions

const newRoleQ = [
    {
        type: 'input',
        name: 'roleId',
        message: "What is the ID of the role?"
   },
   {
        type:'input',
        name: 'title',
        message: "What's the title of the role?"
   },
   {
       type:'input',
       name: 'salary',
       message: "What's the role's salary?"
   },
   {
       type:'input',
       name: 'depId',
       message: "What's the department id?"
   },
];

const editRoleQ = [
    {
        type: 'input',
        name: 'roleId',
        message: "What is the ID of the role?"
   },
   {
        type:'input',
        name: 'title',
        message: "What's the title of the role?"
   },
   {
       type:'input',
       name: 'salary',
       message: "What's the role's salary?"
   },
   {
       type:'input',
       name: 'depId',
       message: "What's the department id?"
   },
];

const delRoleQ = [
    {
        type: 'input',
        name: 'idIn',
        message: 'What is the ID of the role you would like to remove?'
    },
    {
        type: 'list',
        name: 'delConfirm',
        message: 'Are you sure that you want to delete this?',
        choices: [
            'Yes',
            'No',
        ]
    } 
];

// More nav declarations for funcitonality Employee

const newEmpInit = function () {
    inquirer.prompt(newEmpQ).then((response) => {
        resp = response;
        console.log(resp);

        var first = response.first_name;
        var last = response.last_name;
        var id = response.empId;
        var roleId = response.roleId;
        var managerId = response.mangId;

        createEmp(id, first, last, roleId, managerId)
});
};

const editEmpInit = function () {
    inquirer.prompt(editEmpQ).then((response) => {
        resp = response;
        console.log(resp);
        
        var first = response.first_name;
        var last = response.last_name;
        var id = response.empId;
        var roleId = response.roleId;
        var managerId = response.mangId;

        updateEmp(id, first, last, roleId, managerId)
});
};

const delEmpInit = function () {
    inquirer.prompt(delEmpQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.idIn

        if (response.delConfirm === 'Yes'){
        deleteEmp(id)};
});
};

const viewEmpInit = function () {
//     inquirer.prompt(viewEmpQ).then((response) => {
//         resp = response;
//         console.log(resp);
//         readEmp();
//         homePg();
// });
readEmp()
};

// for departments

const newDepInit = function () {
    inquirer.prompt(newDepQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.id;
        var name = response.dep;

        createDepartment(id, name)
});
};

const editDepInit = function () {
    inquirer.prompt(editDepQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.idIn;
        var name = response.depNewName;

        updateDepartment(id, name)
});
};

const delDepInit = function () {
    inquirer.prompt(delDepQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.idIn

        if (response.delConfirm === 'Yes'){
        deleteDepartment(id)};
});
};

const viewDepInit = function () {
//     inquirer.prompt(viewDepQ).then((response) => {
//         resp = response;
//         console.log(resp);
//         homePg();
// });
readDepartment();
};

// For roles

const newRoleInit = function () {
    inquirer.prompt(newRoleQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.roleId;
        var title = response.title;
        var salary = response.salary;
        var departmentID = response.depId;

        createRole(id, title, salary, departmentID)
});
};

const editRoleInit = function () {
    inquirer.prompt(editRoleQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.roleId;
        var title = response.title;
        var salary = response.salary;
        var departmentID = response.depId;

        updateRole(id, title, salary, departmentID)
});
};

const delRoleInit = function () {
    inquirer.prompt(delRoleQ).then((response) => {
        resp = response;
        console.log(resp);

        var id = response.idIn;

        if (response.delConfirm === 'Yes'){
        deleteRole(id)};
});
};

const viewRoleInit = function () {
//     inquirer.prompt(viewRoleQ).then((response) => {
//         resp = response;
//         console.log(resp);
//         homePg();
// });
readRole();
};


// const newProcess = () => {
//     inquirer.prompt(refQ).then((response) => {
//         console.log(response);
// })
// };

const newReq =  function () {
inquirer.prompt(refQ).then((response) => {
            // console.log(response);
            tableReturn = response.tableChoice
            crudReturn = response.crudChoice;

        console.log(tableReturn, crudReturn);    

        if (tableReturn === 'Departments' && crudReturn === 'Create'){
            newDepInit()
        }
        else if (tableReturn === 'Roles' && crudReturn === 'Create'){
            newRoleInit();
        }
        else if (tableReturn === 'Employees' && crudReturn === 'Create'){
            newEmpInit();
        }
        else if (tableReturn === 'Departments' && crudReturn === 'Edit'){
            editDepInit();
        }
        else if (tableReturn === 'Roles' && crudReturn === 'Edit'){
            editRoleInit();
        }
        else if (tableReturn === 'Employees' && crudReturn === 'Edit'){
            editEmpInit();
        }    
        else if (tableReturn === 'Departments' && crudReturn === 'Delete'){
            delDepInit();
        }
        else if (tableReturn === 'Roles' && crudReturn === 'Delete'){
            delRoleInit();
        }
        else if (tableReturn === 'Employees' && crudReturn === 'Delete'){
            delEmpInit();
        }    
        else if (tableReturn === 'Departments' && crudReturn === 'View'){
            viewDepInit();
        }
        else if (tableReturn === 'Roles' && crudReturn === 'View'){
            viewRoleInit();
        }
        else if (tableReturn === 'Employees' && crudReturn === 'View'){
            viewEmpInit();
        }    
        else {
            console.log("Please enter a valid inquiry.")
        };

    });
};




const homePg = function () {
    inquirer.prompt(initQ).then((response) => {
        question1Return = response.initChoice;
    if (question1Return === 'Yes'){
        newReq();
    }
    else {
        return
    }; 
});
};
