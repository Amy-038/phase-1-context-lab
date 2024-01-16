/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const employeeDetails = {};
    employeeDetails['firstName'] =firstName;
    employeeDetails['familyName'] = familyName;
    employeeDetails['title'] = title;
    employeeDetails['payPerHour'] = payPerHour;
    employeeDetails['timeInEvents'] = [];
    employeeDetails['timeOutEvents'] = [];

    return employeeDetails;
}

//console.log(createEmployeeRecord(['Amy', 'Sirma', 'relationship officer', 100]))

function createEmployeeRecords([employee, ...otherEmployees]){
    const employeeRecords = [];

    employeeRecords.push(createEmployeeRecord(employee))

    for(const member of otherEmployees){
        employeeRecords.push(createEmployeeRecord(member))
    }
    
    return employeeRecords;
}

//console.log(createEmployeeRecords([['Amy', 'Sirma', 'relationship officer', 100], ['Abigail', 'Jepng\'etich', 'head engineer', 2000]]))

function createTimeInEvent(dateStamp) {
    const dateAndTime = dateStamp.split(' ')
    const time = dateAndTime[1];
    const date = dateAndTime[0]

    const timeInObject = {}
    timeInObject['type'] = "TimeIn";
    timeInObject['date'] = date;
    timeInObject['hour'] = parseInt(time, 10);

    this['timeInEvents'].push(timeInObject)
    return this;
}

function createTimeOutEvent(dateStamp) {
    const dateAndTime = dateStamp.split(' ')
    const time = dateAndTime[1];
    const date = dateAndTime[0]

    const timeOutObject = {}
    timeOutObject['type'] = "TimeOut";
    timeOutObject['date'] = date;
    timeOutObject['hour'] = parseInt(time, 10);

    this['timeOutEvents'].push(timeOutObject)
    return this;
}

function hoursWorkedOnDate(formDate) {
    const dayConsideredArrival = this['timeInEvents'].find(day => day.date === formDate)
    const dayConsideredDeparture = this['timeOutEvents'].find(day => day.date === formDate)

    const arrivalTime = dayConsideredArrival['hour']
    const departureTime = dayConsideredDeparture['hour']

    return (departureTime - arrivalTime)/100
}

function wagesEarnedOnDate(formDate) {
    const payOwed = this['payPerHour']

    return payOwed * hoursWorkedOnDate.call(this, formDate)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
    }
    
    let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
    }
    
    /*
    We're giving you this function. Take a look at it, you might see some usage
    that's new and different. That's because we're avoiding a well-known, but
    sneaky bug that we'll cover in the next few lessons!
    As a result, the lessons for this function will pass *and* it will be available
    for you to use if you need it!
    */
    
    const allWagesFor = function () {
      const eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })
    
      const payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    
      return payable
    }