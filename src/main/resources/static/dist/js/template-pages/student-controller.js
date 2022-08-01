$( document ).ready(function() {

    function getAllStudentDetails() {

        $.ajax({
            type: "GET",
            url: `${BASE_URL}api/student`,
            async: false,
            dataType: "json",
            success: function (response){
                console.log(response);
                loadStudentTable(response);
            },
            error: function (err){
                console.log(err);
            }
        });
    }

    getAllStudentDetails();

     function loadStudentTable(response){
        $('#studentTable').empty();

        for(let a in response){
            let details = response[a];
            let email = details.email;
            let firstName = details.firstName;
            let lastName = details.lastName;
            let password = details.password;
            let session = details.session;
            let studentID = details.studentID;

            if(!session){
                session =0;
            }

            let tableRow = "<tr><td class='text-center text-danger text-truncate'>" + studentID + "</td>" +
                "<td class='text-center text-primary'>" + firstName + "</td>" +
                "<td class='text-center text-primary'>" + lastName + "</td>" +
                "<td class='text-center'>" + email + "</td>" +
                "<td class='text-center'>" + password + "</td>" +
                "<td class='text-center'>"+ session + "</td>" +
                // "<td class='text-center text-danger'>" + button + "</td>" +
                "</tr>";

            $('#studentTable').append(tableRow);
        }

    }

    $('#student_register_btn').click(function () {
        console.log("ADASDASD");
        let firstName = $('#firstname').val();
        let lastname = $('#lastname').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let studentForm = $('#student-form');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}api/student`,
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                firstName: firstName,
                lastName: lastname,
                email: email,
                password: password
            }),
            success: function (res) {
                console.log(res);
                swal({
                    title: "Success...!",
                    text: `New Student has been updated..!. Student ID :${res.studentID}`,
                    icon: "success",
                });
                studentForm[0].reset();
            },
            error: function (err) {
                console.log(err);
            }
        });

    });




});