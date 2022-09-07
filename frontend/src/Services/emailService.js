const EmailService = {
    sendEmail : (requestOptions) => {
        fetch('http://localhost:8081/api/emails/sendEmail', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
        })
    },

    sendEmailWithLink : (requestOptions) => {
        fetch('http://localhost:8081/api/emails/sendEmailLink', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
        })
    },
}

export default EmailService