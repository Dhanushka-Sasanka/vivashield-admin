$( document ).ready(function() {

    function getAllSessionDetails() {
        // var nic = $('#passengerSearchNIC').val();
        $.ajax({
            type: "GET",
            url: `${BASE_URL}api/session`,
            async: false,
            dataType: "json",
            success: function (response){
                loadSessionTable(response);
            },
            error: function (err){
                console.log(err);
            }
        });
    }

getAllSessionDetails();

    function loadSessionTable(response){
        $('#sessionTable').empty();

        for(let a in response){
            let details = response[a];
            let evaluatorName = details.evaluatorName;
            let sessionID = details.sessionID;
            let sessionName = details.sessionName;
            let startDate = details.startDate;
            let startTime = details.startTime;
            let status = details.status;


            let tableRow = "<tr>" +
                "<td class='text-center text-danger text-truncate'>" + studentID + "</td>" +
                "<td class='text-center text-primary'>" + firstName + "</td>" +
                "<td class='text-center text-primary'>" + lastName + "</td>" +
                "<td class='text-center'>" + email + "</td>" +
                "<td class='text-center'>" + password + "</td>" +
                "<td class='text-center'>"+ session + "</td>" +
                // "<td class='text-center text-danger'>" + button + "</td>" +
                "</tr>";

            $('#sessionTable').append(tableRow);
        }

    }

});