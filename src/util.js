export function getUserDate(){
    const data = sessionStorage.getItem('userDate');

    if (data != undefined) {
        return JSON.parse(data);        
    }

    return null;    
}

export function setUserDate(date){
    sessionStorage.setItem('userDate', JSON.stringify(date));    
}

export function clearUserDate(){
    sessionStorage.removeItem('userDate');    
}