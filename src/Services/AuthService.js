import axios from "axios";

const Employee_Baseurl="https://localhost:44348/api/Users";

class AuthService{
  
   
    login(user){
        return axios.post(Employee_Baseurl+"/LoginUser",user);
    }

    Register(user){
        return axios.post(Employee_Baseurl+"/AddUser",user);
    }

  
}

export default new AuthService()