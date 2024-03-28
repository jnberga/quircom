import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL;


import BGreg from '../assets/bgreg.png';
import logo2 from '../assets/Icon2.png';


const Reg = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    userName: '',
    eMail: '',
    passWord: '',
    contactNum: '',
    country: '',
    accType: '',
    aggRee: false,
  });

  const [invalidFields, setInvalidFields] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Reset invalid fields
    setInvalidFields({});

    // Validation checks
    const errors = {};
    if (formData.firstName.length == 0) {
      errors.firstName = 'Please input your first name'
    }
    if (formData.surName.length == 0) {
      errors.surName = 'Please input your last name'
    }
    if (formData.userName.length == 0) {
      errors.userName = 'Please input your username'
    }
    if (formData.passWord.length == 0) {
      errors.passWord = 'Please input your password'
    }
    if (formData.contactNum.length !== 11) {
      errors.contactNum = 'Contact number must be at least 11 characters';
    }
    if (!formData.eMail.includes('@')) {
      errors.eMail = 'Please enter a valid email address';
    }
    if (!formData.country || !formData.accType) {
      errors.country = 'Please select a country';
      errors.accType = 'Please select an account type';
    }
    if (!formData.aggRee) {
      errors.aggRee = 'Please agree to the terms and conditions';
    }

    // Set invalid fields state
    setInvalidFields(errors);

    // If there are any errors, stop form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/users`, formData);
      console.log(response.data);
      // Handle success (e.g., showing a success message or redirecting the user)
      e.target.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error during registration: ", error.response);
      // Handle error (e.g., showing an error message)
    }
  };

  return (
    <section className="">
      <div className="flex xl:none xl:justify-start h-screen mb-[200px] md:mb-0 justify-center" style={{background: `url(${BGreg})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
        <div className='flex flex-col mt-[60px] xl:ml-[150px] md:h-[700px] bg-[beige] bg-opacity-80 md:bg-[beige] w-screen md:w-[650px] px-[20px] py-[30px] rounded-[10px] md:shadow-[2px_2px_5px_5px_rgba(0,0,0,0.15)]'>
        <h2 className='text-center mx-[20px] mt-[10px] text-[30px] text-[#1D5B79] font-extrabold drop-shadow-xl'>Create Account</h2>
          <div className="container mx-auto mt-8">
            <form className="w-full max-w-screen-ss mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="firstName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full text-[12px] p-3 border rounded ${invalidFields.firstName ? 'border-red-500' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {invalidFields.firstName && <p className="text-red-500">{invalidFields.firstName}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="lastName" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="surName"
                    value={formData.surName}
                    onChange={handleChange}
                    className={`w-full text-[12px] p-3 border rounded ${invalidFields.surName ? 'border-red-500' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {invalidFields.surName && <p className="text-red-500">{invalidFields.surName}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="Username" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`w-full text-[12px] p-3 border rounded ${invalidFields.userName ? 'border-red-500' : ''}`}
                    placeholder="Enter your username"
                  />
                  {invalidFields.userName && <p className="text-red-500">{invalidFields.userName}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="password" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="passWord"
                    value={formData.passWord}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${invalidFields.passWord ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                  {invalidFields.passWord && <p className="text-red-500">{invalidFields.passWord}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                <label htmlFor="contactNumber" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNum"
                    value={formData.contactNum}
                    onChange={handleChange}
                    className={`w-full text-[14px] p-2.5 border rounded ${invalidFields.contactNum ? 'border-red-500' : ''}`}
                    placeholder="Enter your contact number"
                  />
                  {invalidFields.contactNum && <p className="text-red-500 text-sm">{invalidFields.contactNum}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="country" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${invalidFields.country ? 'border-red-500' : ''}`}>
                    <option value="">Select Country</option>
                    <option value="Philippines">Philippines</option>
                  </select>
                  {invalidFields.country && <p className="text-red-500 text-sm">{invalidFields.country}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label htmlFor="email" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="eMail"
                    value={formData.eMail}
                    onChange={handleChange}
                    className={`w-full text-[12px] p-3  border rounded ${invalidFields.eMail ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                  {invalidFields.contactNum && <p className="text-red-500 text-sm">{invalidFields.eMail}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label htmlFor="accountType" className="block text-[#1D5B79] text-sm font-bold mb-2">
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accType"
                    value={formData.accType}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${invalidFields.accType ? 'border-red-500' : ''}`}>
                    <option value="">Select Account Type</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                  </select>
                  {invalidFields.accType && <p className="text-red-500 text-sm">{invalidFields.accType}</p>}
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="agree"
                    name="aggRee"
                    checked={formData.aggRee}
                    onChange={handleChange}
                    className={`mr-2 ${invalidFields.aggRee ? 'border-red-500' : ''}`}
                  />  
                  <label htmlFor="agree" className='text-[14px]'>
                    I agree to the <Link className='text-[#1D5B79] font-medium'><u>terms and conditions</u></Link>
                  </label>    
                </div>
                {invalidFields.aggRee && <p className="text-red-500 text-center text-sm">{invalidFields.aggRee}</p>}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#FE6D30] w-[150px] text-white p-2 rounded-full hover:bg-[#EA580C] hover:w-[155px] focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img className='hidden top-[25%] xl:flex absolute left-[62%] h-[400px] translate-x-[-0%] mx-auto' src={logo2}/>
        </div>
      </div>
    </section>
    
  )
}

export default Reg