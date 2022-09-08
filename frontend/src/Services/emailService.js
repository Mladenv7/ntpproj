import UserService from "./userService"

const EmailService = {
    sendEmail : (requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
        fetch('http://localhost:8081/api/emails/sendEmail', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
        })
    },

    sendEmailWithLink : (requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
        fetch('http://localhost:8081/api/emails/sendEmailLink', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
        })
    },
}

export default EmailService