import React , { useState } from 'react'
import '../css/Contact.css';
import Loader from '../components/Loader';
import {BiCheckCircle} from 'react-icons/bi';
const Input = ({placeholder, name, type, value, handleChange, newClass}) => (
  <input 
      placeholder={placeholder}
      type={type} 
      name={name} 
      value={value}
      onChange= {(e) => handleChange(e,name)} 
      className={`inputBox ${newClass}`}    
    />
)

const SubmissionForm = () => {

    const [nameRed, setNameRed] = useState(false);
    const [emailRed, setEmailRed] = useState(false);
    const [messageRed, setMessageRed] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);   
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name:"",
        email:"",
        message:""
    });

    const { name, email, message } = data;

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSuccess(false);
        if(!name || !email || !message){
            if(!name) setNameRed(true);
            else setNameRed(false);

            if(!email) setEmailRed(true);
            else setEmailRed(false);

            if(!message) setMessageRed(true);
            else setMessageRed(false);

            return;
        }
        try {
            setNameRed(false);
            setEmailRed(false);
            setMessageRed(false);
            setIsLoading(true);
            const response = await fetch(
                "https://v1.nocodeapi.com/sravyasri/google_sheets/reiBKHjmlNvAoCks" , {
                method: 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify([[name, email, message, new Date().toLocaleString()]])
                }
            );
            
            await response.json();

            setData({...data, 
            name:"",
            email:"",
            message:""
            });
            setIsLoading(false);
            setIsSuccess(true);
            console.log(data);    
           /* setTimeout(function () {
                setIsSuccess(false);
            }, 5000);  */
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <div className="formBox">
            <h1 className='text-white text-3xl'>Mess Feedback Form</h1>
            {isSuccess && <div style={{color:'green', display:'flex', alignItems:'center'}}><BiCheckCircle style={{fontSize:'18px'}}/><p style={{margin:'0'}}>Message Sent</p></div>}
            <div className="inputBoxes">
                <Input placeholder="Name" name="name"  type="text" handleChange={handleChange} newClass={nameRed ? ("name redBox") : ("name")} value={name}/>
                <Input placeholder="Email" name="email"  type="email" handleChange={handleChange} newClass={emailRed ? ("email redBox") : ("email")} value={email}/>
                <textarea placeholder="Enter your message" name="message" type="text" onChange= {(e) => handleChange(e,name)} className={messageRed ? ("inputBox message redBox") : ("inputBox message")} value={message}/>
                {isLoading ? (<Loader text="Sending"/>) :
                (<button onClick={handleSubmit} className="submitBtn" >
                    Send
                </button>)}
            </div>
        </div>
        
    );
}

export default SubmissionForm;