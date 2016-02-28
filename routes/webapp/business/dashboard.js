var auth = require('../../../lib/auth');

exports.get = function (req, res) {
	var employeeId = req.user[0]._id;
	var employeename = req.user[0].fname;

    //delete me
    var employeeLastName = req.user[0].lname;
    var employeePhone = req.user[0].phone;
    var employeePermission = req.user[0].permissionLevel;
    var walkinsAllowed = req.user[0].walkins;

    console.log("First name: " + employeename);

    var companyName = req.user[0].company;

    var page; // page to load
    if (req.user[0].permissionLevel < 3)
        page = 'business/level_2/dashboard';
    else
        page = 'business/level_3/dashboard';

    res.render(page, {title: 'Express',
		eid: employeeId,
		employeeName: employeename,
        employeeLast: employeeLastName,
        employeePhone: employeePhone,
        employeePermission: employeePermission,
        walkinsAllowed: walkinsAllowed,
        companyName: companyName,
		message: req.flash("permission"),
	});
};
