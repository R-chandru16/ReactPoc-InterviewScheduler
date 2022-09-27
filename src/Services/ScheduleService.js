import axios from "axios";

const Schedule_Baseurl="https://localhost:44348/api/Schedule";

class ScheduleService{
  
   
    GetAllSchedules(){
        return axios.get(Schedule_Baseurl+"/GetAllSchedules");
    }
   
    AddSchedule(schedule){
        return axios.post(Schedule_Baseurl+"/AddSchedule",schedule);
    }
  

    GetScheduleById(id){
        return axios.get(Schedule_Baseurl+"/GetScheduleById/"+id);
    }

    UpdateSchedule(id, schedule){
        return axios.put(Schedule_Baseurl+"/UpdateSchedule?id="+id,schedule);
    }

    DeleteSchedule(id)
    {
        return axios.delete(Schedule_Baseurl+"/DeleteSchedule?id="+id);
    }

    
}

export default new ScheduleService()