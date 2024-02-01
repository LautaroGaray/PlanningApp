import axios from 'axios';

class ApiService{

  GetData = async (baseUrl, endpoint) => {
    try {        
      
        const response = await axios.get(`${baseUrl}${endpoint}`);       
        return response.data.Data;
      } catch (error) {        
        return {None:"3"}
      }
  };
  PutData = async (baseUrl, endpoint) =>{
    try {          
        const url = `${baseUrl}${endpoint}`;
        const response = await axios.put(url);
        if (response.status === 200) {   
          return true;
        } else {
          alert('Error en la solicitud: Estado HTTP ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
  }
  PutDataWhitBody = async(baseUrl, endpoint, data)=>{
      try {          
        let request = {
          id: data.id,
          idGroup: data.idGroup?data.idGroup:0,
          idProject: data.idProject?data.idProject:0,
          name: data.Name?data.Name:'',
          description: data.Description? data.Description:'',
          status:  data.Status?data.Status:'0',
          agent: data.Agent?data.Agent:'',
          priority: data.Priority?data.Priority:'LOW',
          dateModified: data.DateModified?data.DateModified:'',
          dateAdd: data.DateAdd?data.DateAdd:''
        }     
        
        const url = `${baseUrl}${endpoint}`;
        const response = await axios.put(url, request);
        if (response.status === 200) {   
          return true;
        } else {
          alert('Error en la solicitud: Estado HTTP ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
  }
  Delete = async (baseUrl, endpoint) =>{
    try {          
        const url = `${baseUrl}${endpoint}`;
        const response = await axios.delete(url);
        if (response.status === 200) {   
          return true;
        } else {
          alert('Error en la solicitud: Estado HTTP ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
  }

}

export default ApiService;