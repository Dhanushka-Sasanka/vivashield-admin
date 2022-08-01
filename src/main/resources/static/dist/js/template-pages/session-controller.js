$(document).ready(function () {

    function getAllSessionDetails() {
        // var nic = $('#passengerSearchNIC').val();
        $.ajax({
            type: "GET",
            url: `${BASE_URL}api/session`,
            async: false,
            dataType: "json",
            success: function (response) {
                loadSessionTable(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    getAllSessionDetails();

    function loadSessionTable(response) {
        $('#sessionTable').empty();

        for (let a in response) {
            let details = response[a];
            let evaluatorName = details.evaluatorName;
            let sessionID = details.sessionID;
            let sessionName = details.sessionName;
            let startDate = details.startDate;
            let startTime = details.startTime;
            let status = details.status;


            let tableRow = "<tr>" +
                "<td class='text-center text-danger text-truncate'>" + evaluatorName + "</td>" +
                "<td class='text-center text-primary'>" + sessionID + "</td>" +
                "<td class='text-center text-primary'>" + sessionName + "</td>" +
                "<td class='text-center'>" + startDate + "</td>" +
                "<td class='text-center'>" + startTime + "</td>" +
                "<td class='text-center'>" + status + "</td>" +
                // "<td class='text-center text-danger'>" + button + "</td>" +
                "</tr>";

            $('#sessionTable').append(tableRow);
        }

    }


    $('#add_session_btn').click(function () {

        let sessionName = $('#session_name').val();
        let evaluatorName = $('#evaluator_name').val();
        let startedDate = $('#start_date').val();
        let startedTime = $('#start_time').val();

        // console.log(`${email} : ${password}`);


        $.ajax({
            type: "POST",
            url: `${BASE_URL}api/session`,
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                    sessionName: sessionName,
                    evaluatorName: evaluatorName,
                    startTime: startedTime,
                    startDate: startedDate,
                    status: "ON GOING"
                }),
            success: function (res) {
                console.log(res);
                swal({
                    title: "Success...!",
                    text: `New Session has been updated..!. Session ID :${res.sessionID}`,
                    icon: "success",
                });
            },
            error: function (err) {
                console.log(err);
            }
        });

    });


});