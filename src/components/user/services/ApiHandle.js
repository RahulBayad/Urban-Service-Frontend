import axios from "axios";

const carpenter = ['bed','cupboard','door','drill','furniture','window' , 'balcony']
const ac = ['service','repair','installation'];
const laptop = ['windows','apple','desktop','upgrade'];
const tv = ['repair','installation','uninstallation'];
const fridge = ['doubleDoor','singleDoor','sidebyside'];
const washingmachine = ['repair','installation','uninstallation'];
const ro = ['service','repair','installation'];
const oven = ['repair'];
const geyser = ['repair','servicing','installation'];
const mensSpa = ['painrelief','stressrelief','postworkout','relaxation'];
const womensSpa = ['painrelief','stressrelief','postworkout','skincare'];
const electrician = ['switch','light','mcb','wiring','inverter','fan','doorbell'];
const plumber = ['bathFitting','drainage','tap','basin','grouting','filterTap','toilet','tank','motor','pipe'];
const mensSalon = ['haircut','detan','facial','pedicure','haircolor','massage','ayurvedicMassage'];
const womensSalon = ['package','waxing','facial','manicure','pedicure','threading','detan','haircare'];


export const ApiHandle =async (category , type)=>{
    
    try{
        if(category === "salonForMen"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db7a6df8bfd55ddf7f647b"});

            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "salonForWomen" ){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db7b51f8bfd55ddf7f6487"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};   
        }
        if(category === "electrician"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db65bff8bfd55ddf7f6470"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};     
        }
        if(category === "plumber"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db65e8f8bfd55ddf7f6471"});
            // console.log("types is ",types);        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            // console.log("filtered type is ",filteredType);        
            // console.log("filtered type id is ",filteredType[0]._id);        
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})
            // console.log("services are",services);

            return {types :types.data.data , services : services.data.data};   
        }

        if(category === "carpenter" && carpenter.includes(type)){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory: "65db73baf8bfd55ddf7f6478"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "menSpa"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db636cf8bfd55ddf7f6460"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};  
        }
        if(category === "womenSpa"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db6395f8bfd55ddf7f6461"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "ac"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db617df8bfd55ddf7f6454"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};   
        }
        if(category === "fridge"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db6252f8bfd55ddf7f6459"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "oven"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db62fdf8bfd55ddf7f645c"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};   
        }
        if(category === "laptop"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db61d6f8bfd55ddf7f6457"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};     
        }
        if(category === "washingmachine"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db6286f8bfd55ddf7f645a"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "geyser"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db631af8bfd55ddf7f645d"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "ro"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db62b9f8bfd55ddf7f645b"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }
        if(category === "tv"){
            let types = await axios.post("http://localhost:4001/type/type/getBySubcategory",{subcategory:"65db6222f8bfd55ddf7f6458"});
                        
            let filteredType = types.data.data.filter((fnd)=>(fnd.link === type));
            let services = await axios.post("http://localhost:4001/service/service/services" , {type : filteredType[0]._id})

            return {types :types.data.data , services : services.data.data};    
        }

        

    }catch(err){
        console.log(err);
        return null;
    }

}