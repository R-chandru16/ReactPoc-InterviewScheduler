import axios from "axios";

const Job_Baseurl="https://localhost:44348/api/Jobs";

class JobService{
  
   
    GetAllJobs(){
        return axios.get(Job_Baseurl+"/GetAllJobs");
    }
   
    Addjob(job){
        return axios.post(Job_Baseurl+"/AddJob",job);
    }
  

    GetJobById(id){
        return axios.get(Job_Baseurl+"/GetJobById/"+id,id);
    }

    UpdateJob(id, job){
        return axios.put(Job_Baseurl+"/UpdateJob?id="+id,job);
    }

    DeleteJob(id)
    {
        return axios.delete(Job_Baseurl+"/DeleteJob?id="+id);
    }


    AddInterview(job){
        return axios.post(Job_Baseurl+"/AddInterviewLevel",job);
    }
    

    GetInterviewLevelById(id){
    
        return axios.get(Job_Baseurl+"/GetInterviewLevelById/"+id);
    }
    UpdateInterviewLevel(id,level){
        return axios.put(Job_Baseurl+"/UpdateInterviewLevel?id="+id,level);
    }

    GetAllInterviewLevels(){
        return axios.get(Job_Baseurl+"/GetAllInterviewLevels");
    }

    DeleteInterviewLevel(id)
    {
        return axios.delete(Job_Baseurl+"/DeleteInterviewLevel?id="+id);
    }
  
}

export default new JobService()