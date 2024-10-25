"use client"
import React, {useState} from 'react'
// import { useRouter } from 'next/router';

function AddUser() {

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const router = useRouter();

    const  handleSubmit = async (e) =>{
        e.preventDefault();
        if(!email || !firstName || !password){
            alert("All fields must be filled");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/users",{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({firstName, email, password}),
            });
            if(res.ok){
                // router.push('/');
                console.log('Data saved');

            }else{
                throw new Error("Failed to create user");
            }

        } catch (error) {
            console.log(error)
        }

    }
    
  return (
    <div className="pt-2 p-24">
        
    <form  onSubmit={handleSubmit} className="flex flex-col gap-3">

    <div>

    <label htmlFor="firstname"> First Name </label>
    <input 
    type="text"
    placeholder="Cephas"
    className="border border-slate-300 px-8 py-2 w-72"
    id="firstname"
    onChange={(e)=>setFirstName(e.target.value)}
    value={firstName}
     />

    <label htmlFor="email"> Email </label>
    <input 
    type="text"
    placeholder="tsatsuc@gmail.com"
    className="border border-slate-300 px-8 py-2 w-72"
    id="email"
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
     />

    <label htmlFor="password"> Password </label>
    <input 
    type="password"
    className="border border-slate-300 px-8 py-2 w-72"
    id="password"
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
     />


    <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 min-w-fit"> Save</button>
    </div>

    
    </form>

    </div>
  )
}

export default AddUser