$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
                submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var address = $("input#address").val();
            var city = $("input#city").val();
            var zip = $("input#zip").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var unavailable = "";
            var unavailableCheckboxes = document.getElementsByName('unavailable-to-meet[]');
            var unavailableVals = "";
            for (var i=0, n=unavailableCheckboxes.length; i<n; i++) {
                if (unavailableCheckboxes[i].checked) {
                    unavailableVals += ","+unavailableCheckboxes[i].value;
                }
            }
            if (unavailableVals) unavailable = unavailableVals.substring(1);
            var children = $("input#number-children").val();
            var childrenAges = $("input#ages-children").val();
            var currentSG = $("input#current-sg").val();
            var currentSGLeader = $("input#current-sg-leader").val();
            var notes = $("textarea#notes").val();
            var subject = $("input#_subject").val();
            var gotcha = $("input#_gotcha").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://formspree.io/khamilton@wccstl.org",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                    address: address,
                    city: city,
                    zip: zip,
                    phone: phone,
                    email: email,
                    unavailable: unavailable,
                    children: children,
                    childrenAges: childrenAges,
                    currentSG: currentSG,
                    currentSGLeader: currentSGLeader,
                    notes: notes,
                    _subject: subject,
                    _gotcha: gotcha,
                    _replyto: email
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent.</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#signUpForm').trigger("reset");
                    $('div').removeClass("floating-label-form-group-with-value");

                    // Hide the success message
                    $(function() {
                        setTimeout(function() {
                            $('#success').html("")
                        }, 5000);
                    });
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');

                    //clear all fields
                    $('#signUpForm').trigger("reset");
                    $('div').removeClass("floating-label-form-group-with-value");

                    // Hide the fail message
                    $(function() {
                        setTimeout(function() {
                            $('#success').html("")
                        }, 5000);
                    });
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
