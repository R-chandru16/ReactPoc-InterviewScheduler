import axios from "axios";

const Candidate_Baseurl="https://localhost:44348/api/Candidate";

class CandidateService{
  
   
    GetAllCandidates(){
        return axios.get(Candidate_Baseurl+"/GetAllCandidates");
    }
   
    AddCandidate(candidate){
        return axios.post(Candidate_Baseurl+"/AddCandidate",candidate);
    }
  

    GetCandidateById(id){
        return axios.get(Candidate_Baseurl+"/GetCandidateById/"+id);
    }

    UpdateCandidate(id, candidate){
        return axios.put(Candidate_Baseurl+"/UpdateCandidate?id="+id,candidate);
    }

    DeleteCandidate(id)
    {
        return axios.delete(Candidate_Baseurl+"/DeleteCandidate?id="+id);
    }



    GetAllCandidateAvailabilities(){
        return axios.get(Candidate_Baseurl+"/GetAllCandidateAvailabilities");
    }
   
    AddCandidateAvailability(candidateavailability){
        return axios.post(Candidate_Baseurl+"/AddCandidateAvailability",candidateavailability);
    }
  

    GetCandidateAvailabilityById(id){
        return axios.get(Candidate_Baseurl+"/GetCandidateAvailabilityById/"+id);
    }

    UpdateCandidateAvailability(id, candidateavailability){
        return axios.put(Candidate_Baseurl+"/UpdateCandidateAvailability?id="+id,candidateavailability);
    }

    DeleteCandidateAvailability(id)
    {
        return axios.delete(Candidate_Baseurl+"/DeleteCandidateAvailability?id="+id);
    }

}

export default new CandidateService()