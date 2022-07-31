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

});