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
        return axios.get(Job_Baseurl+"/GetJobByID?id="+id);
    }

    UpdateJob(job){
        return axios.put(Job_Baseurl+"/UpdateJob?id=",job);
    }

    DeleteJob(jobID)
    {
        return axios.delete(Job_Baseurl+"/DeleteJob?id="+jobID);
    }

  
}

export default new JobService()