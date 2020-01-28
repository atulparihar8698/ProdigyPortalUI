import axios from 'axios';

const baseURL='http://localhost:8089/prodigyportal';

const CreateEmployee =(obj)=>{
    axios.post(baseURL+'createemployee',obj)
    .then(response =>{
        console.log(response)
    })
    .catch(error =>{
            console.log(error);
          
    });
}

export const GetDesignation =() =>{
   
    var data=axios.get(baseURL+'/designasion/all',{})
    .then (Response =>{
       return Response.data ;
    })
    .catch(error =>{
            console.log(error);
    })
    return data;
}