import axios from "axios";

const Panel_Baseurl="https://localhost:44348/api/Panel";

class PanelService{
  
   
    GetAllPanels(){
        return axios.get(Panel_Baseurl+"/GetAllPanels");
    }
   
    AddPanel(panel){
        return axios.post(Panel_Baseurl+"/AddPanel",panel);
    }
  

    GetPanelById(id){
        return axios.get(Panel_Baseurl+"/GetPanelById/"+id);
    }

    UpdatePanel(id, panel){
        return axios.put(Panel_Baseurl+"/UpdatePanel?id="+id,panel);
    }

    DeletePanel(id)
    {
        return axios.delete(Panel_Baseurl+"/DeletePanel?id="+id);
    }

    GetAllPanelAvailabilities(){
        return axios.get(Panel_Baseurl+"/GetAllPanelAvailabilities");
    }
   
    AddPanelAvailability(panelavailability){
        return axios.post(Panel_Baseurl+"/AddCandidateAvailability",panelavailability);
    }
  

    GetPanelAvailabilityById(id){
        return axios.get(Panel_Baseurl+"/GetPanelAvailabilityById/"+id);
    }

    UpdatePanelAvailability(id, panelavailability){
        return axios.put(Panel_Baseurl+"/UpdatePanelAvailability?id="+id,panelavailability);
    }

    DeletePanelAvailability(id)
    {
        return axios.delete(Panel_Baseurl+"/DeletePanelAvailability?id="+id);
    }


   
}

export default new PanelService()