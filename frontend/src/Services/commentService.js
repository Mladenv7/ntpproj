const CommentService = {

    getAllComments : (setComments) => {
        fetch('http://localhost:8081/api/comments')
        .then((response) => response.json())
        .then((responseJson) => {
            setComments(responseJson)
        })
    },

    getNrReported : (setComments) => {
        fetch('http://localhost:8081/api/comments/nrReports')
        .then((response) => response.json())
        .then((responseJson) => {
            setComments(responseJson)
        })
    },


    getCommentsOfAd : (id, setCommentsData) => {
        fetch('http://localhost:8081/api/comments/ofAd/'+id)
        .then((response) => response.json())
        .then((responseJson) => {
            setCommentsData(responseJson)
        })
    },

    sendComment : (requestOptions) => {
        fetch('http://localhost:8081/api/comments/new', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    deleteComment : (id, requestOptions) => {
        fetch('http://localhost:8081/api/comments/delete/'+id, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },

    updateComment : (requestOptions) => {
        fetch('http://localhost:8081/api/comments/update', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
    },
}

export default CommentService