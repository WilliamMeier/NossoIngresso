// Navbar Scroll
$(function () {
    // Navbar Scroll
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });

    // Modal video
    $('#modal-video1').on('hidden.bs.modal', function (e) {
        // do something...
        $('#modal-video1 iframe').attr("src", $("#modal-video1 iframe").attr("src"));
    });
    $('#modal-video2').on('hidden.bs.modal', function (e) {
        // do something...
        $('#modal-video2 iframe').attr("src", $("#modal-video2 iframe").attr("src"));
    });


    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Enviar email
    $("#sendEmail").click(function() {
        var name = $("#name");
        var email = $("#email");
        var subject = $("#subject");
        var body = $("#message");
        if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(body)) {
            $.ajax({
                url: 'sendEmail.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    name: name.val(),
                    email: email.val(),
                    subject: subject.val(),
                    body: body.val(),
                }, success: function (response) {
                    if (response.status == "success")
                        swal("Bom trabalho", "Email enviado com sucesso!", "success");
                        else {
                            swal("Algo de errado aconteceu!", "Verifique se os dados estão preenchidos corretamente", "error")
                            console.log(response);
                        }
                },
            });
        }
    });
    function isNotEmpty(caller) {
        if (caller.val() == "") {
            caller.css('border', '1px solid red');
            return false;
        } else {
            caller.css('border', '');
        } return true;
    }

    // Instafeed
    var userFeed = new Instafeed({
        get: 'user',
        userId: '6939402136',
        limit: 8,
        resolution: 'standard_resolution',
        accessToken: '6939402136.1677ed0.23a44830af044b90bdf8dcafce659344',
        sortBy: 'most-recent',
        template: '<div id=instaimg class="col-6 col-md-3 py-0 px-0 py-md-2"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="instagram-img pb-2 pb-md-0"/></a></div>'
    });

    userFeed.run();
});
