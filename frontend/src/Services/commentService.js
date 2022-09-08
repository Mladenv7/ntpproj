import UserService from "./userService"

const CommentService = {

    getAllComments : (setComments) => {
        fetch('http://localhost:8081/api/comments', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setComments(responseJson)
        })
    },

    getNrReported : (setComments) => {
        fetch('http://localhost:8081/api/comments/nrReports', {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setComments(responseJson)
        })
    },


    getCommentsOfAd : (id, setCommentsData) => {
        fetch('http://localhost:8081/api/comments/ofAd/'+id, {method: "GET", headers : {"Authorization": "Bearer "+UserService.getToken()}})
        .then((response) => response.json())
        .then((responseJson) => {
            setCommentsData(responseJson)
        })
    },

    sendComment : (requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
        fetch('http://localhost:8081/api/comments/new', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    deleteComment : (id, requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
        fetch('http://localhost:8081/api/comments/delete/'+id, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    updateComment : (requestOptions) => {
        requestOptions.headers.Authorization = "Bearer "+UserService.getToken()
        fetch('http://localhost:8081/api/comments/update', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },
}

export default CommentService