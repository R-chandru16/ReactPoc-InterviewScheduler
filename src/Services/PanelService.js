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


   
}

export default new PanelService()