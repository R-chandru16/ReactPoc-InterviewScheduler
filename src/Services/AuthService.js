import axios from "axios";

const User_Baseurl="https://localhost:44348/api/Users";


class AuthService{
  
   
    login(user){
        return axios.post(User_Baseurl+"/LoginUser",user);
    }

    Register(user){
        return axios.post(User_Baseurl+"/AddUser",user);
    }

   
}

export default new AuthService()