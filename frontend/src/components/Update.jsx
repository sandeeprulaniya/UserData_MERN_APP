import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [age,setAge] = useState();
    const {id} = useParams();
    const navigate = useNavigate();

    const getSingleUser = async()=>{

        const response  = await fetch(`http://localhost:4000/${id}`)

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
        }
        if (response.ok) {
           setName(result.name);
           setAge(result.age);
           setEmail(result.email);
        }

    }
    
    const handleUpdate = async(e)=>{
        e.preventDefault();

        const addUser = {
            name,email,age
        }

        const response = await fetch(`http://localhost:4000/${id}`,{
            method:"PUT",
            body: JSON.stringify(addUser),
            headers:{
                "Content-Type":"application/json",
            }
        });

        const result = await response.json();
       
        if(!response.ok){ 
            console.log(result.error);
        } 

        if(response.ok){
            console.log(result);
            setAge();
            setEmail();
            setName();
            navigate("/all");
        }


   }

    useEffect(()=>{
        getSingleUser();
    },[])
   

  return (
    <div className='container my-2'>
    <h2 className='text-center'> Edit the Details:</h2>
    <form onSubmit={handleUpdate}>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>{
        setName(e.target.value)
    }} />
  </div>
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>{
        setEmail(e.target.value)
    }} />
  </div>
  <div className="mb-3">
    <label  className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>{
        setAge(e.target.value)
    }}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Update
