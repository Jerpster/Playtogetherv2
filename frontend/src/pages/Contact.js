import { useState, useEffect } from "react"
import axios from "axios"
function Contact() {

const [email, setEmail] = useState('')
const [message, setMessage] = useState('')
const [error, setError] = useState('')
const [selectData, setSelectData] = useState([])
const [selectValue, setSelectValue] = useState('')
const [user, setUser] = useState(null);


useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/login';
    }
  }, []);

useEffect( () => {
    let processing = true
    axiosFetchData(processing)
        return () => {
            processing = false
        }
    
},[]) 

const axiosFetchData = async(processing) => {
    await axios.get('http://localhost:4000/users')
    .then(res => {
        if (processing) {
            setSelectData(res.data)
        }
        })   
    .catch(error => console.log(error))
}

const axiosPostData = async() => {
    const postData = {
        email: email,
        website: selectValue,
        message: message
    }

    await axios.post('http://localhost:4000/contact', postData)
    .then(res => setError(<p className="success">{res.data}</p>))
}

const SelectDropdown = () => {
    return (
        <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            {
                selectData?.map((item, index) => (
                    <option value={item.website} key={item.website}>{item.website}</option>
                    
                ))
            
                
            }

        </select>

    )
}

const handleSubmit = (e) => {
    e.preventDefault()

    console.log(email + ' | ' + message)

    if (!message) {
        setError(<p className="required">Message is empty. Please type a message.</p>)
    } else {
        setError('')
    }
    setError('')
    axiosPostData()
}
return (
    <>
        <h1>Contact Us</h1>


        <form className="contactForm">
            <label>Email</label>
            <input type="text" id="email" name="email" value={email} onChange={ (e) => setEmail(e.target.value)} />

            <label>How did you hear about us</label>
            <SelectDropdown />


            <label>Message</label>
            <textarea id="message" name="message" value={message} onChange={ (e) => setMessage(e.target.value)}></textarea>

            {error}

            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    </>
)
}

export default Contact