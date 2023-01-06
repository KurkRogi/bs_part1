function sendMail(form) {

    emailjs.send("service_ospxcqq","rosie",{
        project_request: form.projectsummary.value,
        from_email: form.emailaddress.value,
        from_name: form.name.value,
        })
        .then(
            function(response) {
                console.log("Success", response);
            },
            function(error) {
                console.log("Error", error);
            }
        );
    return false;
}