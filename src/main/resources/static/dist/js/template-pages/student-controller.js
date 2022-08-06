$(document).ready(function () {

    $('#set_session_card').hide();
    $('#set_detail_card').hide();


    function getAllStudentDetails() {

        $.ajax({
            type: "GET",
            url: `${BASE_URL}api/student`,
            async: false,
            dataType: "json",
            success: function (response) {
                console.log(response);
                loadStudentTable(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    getAllStudentDetails();

    function loadStudentTable(response) {
        $('#studentTable').empty();

        for (let a in response) {
            let details = response[a];
            let email = details.email;
            let firstName = details.firstName;
            let lastName = details.lastName;
            let password = details.password;
            let session = details.session;
            let studentID = details.studentID;
            let sessionName = "";
            if (session) {
                sessionName = session.sessionName;
            }

            let sessionButton = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"" + studentID + "\" onclick=\"setSession(this.id)\"> \n" +
                "<i class='fa fa-check-circle'></i>\n" +
                "<span></span></button>";

            let viewButton = "<button type=\"button\" class=\"btn btn-success btn-sm\" id=\"" + studentID + "\" onclick=\"getView(this.id)\"> \n" +
                "<i class='fa fa-eye'></i>\n" +
                "<span></span></button>";

            let tableRow = "<tr><td class=\"text-center text-danger text-truncate\">" + studentID + "</td>" +
                "<td class=\"text-center text-primary\">" + firstName + "</td>" +
                "<td class=\"text-center text-primary\">" + lastName + "</td>" +
                "<td class=\"text-center\">" + email + "</td>" +
                "<td class=\"text-center\">" + password + "</td>" +
                "<td class=\"text-center\">" + sessionName + "</td>" +
                "<td class=\"text-center\">" + sessionButton + " " + viewButton + "</td></tr>";


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

    $('#student_session_update_btn').click(function () {

        let studentId = $('#studentIDForSession').text();
        let sessionId = $('#select-session-box').val();


        console.log(`${studentId} ,${sessionId}`)

        $.ajax({
            type: "PATCH",
            url: `${BASE_URL}api/student/update-session`,
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                studentID: studentId,
                session: {
                    sessionID: sessionId
                }
            }),
            success: function (res) {
                console.log(res);
                swal({
                    title: "Success...!",
                    text: `Session has been updated..!. Student ID :${studentId}`,
                    icon: "success",
                });
                getAllStudentDetails();
            },
            error: function (err) {
                console.log(err);
            }
        });

    });


    function getAllSessionDetails() {

        $.ajax({
            type: "GET",
            url: `${BASE_URL}api/session`,
            async: false,
            dataType: "json",
            success: function (response) {
                loadSessionToSelectBox(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    getAllSessionDetails();

    function loadSessionToSelectBox(response) {

        $('#select-session-box').empty();

        for (let a in response) {
            let details = response[a];
            let evaluatorName = details.evaluatorName;
            let sessionID = details.sessionID;
            let sessionName = details.sessionName;
            let startDate = details.startDate;
            let startTime = details.startTime;
            let status = details.status;

            let tableRow = "<option value='" + sessionID + "'>" + sessionName + "</option>";

            $('#select-session-box').append(tableRow);


        }
    }


});

function setSession(studentID) {
    console.log(studentID);
    $('#set_session_card').hide();


    $('#set_session_card').show();
    $('#studentIDForSession').text(studentID);
}

function getView(studentID) {

    $('#set_detail_card').hide();

    getAllStudentDetailsByID(studentID)


}

function getAllStudentDetailsByID(sid) {

    $.ajax({
        type: "GET",
        url: `${BASE_URL}api/student/${sid}`,
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            // $('#studentHeadAwayCount').text(response.);
            $('#studentHeadAwayCount').text(response.session.awayHeadCount);
            $('#studentIDForSessionDetails').text(response.studentID);


            if (response.session.openTabUrls !== "") {
                let openUrls = response.session.openTabUrls;

                let openUrlList = openUrls.split(/##title: |##URL: /)
                // let openUrlList = openUrls.split(/##title: /)
                // let openUrlList = openUrls.split('##title:' , '##URL:');

                console.log(openUrlList);

                let orderedUrlList = removeDuplicates(openUrlList);

                console.log(removeDuplicates(openUrlList));

                orderedUrlList.shift();

                console.log(orderedUrlList);
                // let urlSplit = openUrlList.split(/##URL: /);


                for (let i = 0; i < orderedUrlList.length; i++) {
                    let title = orderedUrlList[i];
                    let url = orderedUrlList[i++];

                    let openTab = "<div class=\"alert alert-danger\" role=\"alert\">\n" +
                        "    Search Title : <span> " + title + "</span> \n" +
                        "    Url : <a href=\""+ url + " \" target='_blank' class=\"alert-link\">" + url + "</a>\n" +
                        "</div>";

                    $('#openUrlList').append(openTab);
                }

            }

            $('#set_detail_card').show(200);
        },
        error: function (err) {
            console.log(err);
        }
    });

    function removeDuplicates(arr) {
        return arr.filter((item, index) =>
            arr.indexOf(item) === index);
    }
}

