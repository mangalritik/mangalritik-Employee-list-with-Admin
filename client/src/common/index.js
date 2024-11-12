const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    }, 
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    addEmployee : {
        url: `${backendDomin}/api/create`,
        method:"post"

    },
    updateEmployee : {
        url: `${backendDomin}/api/update`,
        method:"put"

    },
    deleteEmployee : {
        url: `${backendDomin}/api/delete/:id`,
        method:"DELETE"

    }
}

export default SummaryApi;