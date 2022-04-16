

export const nextPage = () =>{
    return {
        type : "NEXT",
        payload : 1
    }
}

export const previousPage = () =>{
    return {
        type : "PREVIOUS",
        payload : 1
    }
}

export const setPage = (pageNumber) =>{
    return {
        type : "SETPAGE",
        payload : pageNumber
    }
}

export const setProfile = (data) =>{
    return {
        type : "SETPROFILE",
        payload : data
    }
}

export const setEducation = (data) =>{
    return {
        type : "SETEDUCATION",
        payload : data
    }
}

export const setSkill = (data) =>{
    return {
        type : "SETSKILL",
        payload : data
    }
}

export const setProject = (data) =>{
    return {
        type : "SETPROJECT",
        payload : data
    }
}

export const setSocial = (data) =>{
    return {
        type : "SETSOCIAL",
        payload : data
    }
}

