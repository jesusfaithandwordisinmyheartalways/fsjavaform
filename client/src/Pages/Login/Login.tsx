




import React, { useEffect, useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom'
import './Login.css'
import { Facebook } from '../../Components/Data/data'







const Login:React.FC = () => {
    const [ userEmail, setUserEmail ] = useState<string>('')
    const [ userPassword, setUserPassword ] = useState<string >('')
    const [ errormessage, setErrorMessage ] = useState("");
    const [ inputRef ] = useState('')
    const [ buttonSpinner, setButtonSpinner ] = useState(false);
    const navigate = useNavigate()





        const facebookLogin = async (e: React.FormEvent) => {
            e.preventDefault()
            
            setButtonSpinner(true);
    
            try {
                const response = await fetch('http://localhost:3001/account/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ password: userPassword, email: userEmail })
                })
    
                const data = await response.json();
                if(data.success) {
                    navigate('/login-success')
                    setButtonSpinner(false)
                } else {
                    setErrorMessage(data.message || "Something went wrong." );
                    setButtonSpinner(false);
                }
            }catch(error) {
                setErrorMessage(`Error has occurred:  ${error}`)
            } finally {
                setButtonSpinner(false);
            }
        }
    
    


  return (
    <>

    <div className=' w-screen overflow-hidden bg-[whitesmoke] h-[100vh] custom-container '>
        <div className='flex items-center justify-center mx-auto max-w-[1000px] text-center  custom-wrapper-login'>



           <div className='bg-black h-[410px] w-[40%] rounded-xl relative top-[110px]'>

                <form onSubmit={facebookLogin}>
                    <div className='  text-center text-lg p-3'>
                        <input  className=' border-2 border-solid border-green-600 w-[99%] text-center text-lg p-3
                        focus:border-purple-500 focus:outline-purple-500 rounded-md' 
                        onChange={(e) => setUserEmail(e.target.value)} type='email' value={userEmail} placeholder='Email' required />
                    </div>


                    <div className='text-center text-lg p-3'>
                        <input  className=' border-2 border-solid border-green-600 w-[99%] text-center text-lg p-3
                        focus:border-purple-500 focus:outline-purple-500 rounded-md' 
                        onChange={(e) => setUserPassword(e.target.value)} type='password' value={userPassword} placeholder='Password' required />
                    </div>


                    <div>
                    <button
                        className='bg-blue-600 w-[90%] text-white text-lg p-2 border-none outline-none cursor-pointer hover:bg-green-500'
                        type='submit'  >
                    { buttonSpinner ? (
                        <span className="spinner"></span>
                    ) : (
                    <span>Login Meta Account</span>
                    )}
                </button>
                
                    </div>
                    
                    
                    
                    
                    { errormessage && (
                    <div className="text-red-500 text-center mt-4 font-semibold"> {errormessage} </div>
                    )}



                    <div className=' flex items-center justify-center mx-auto max-w-[800px]' >
                       <div className='w-[41%] object-contain h-[10%]'>
                       <img src={Facebook[0].fbImage} alt='meta-image' loading='lazy'></img>
                       </div>


                        </div>





                </form>

</div>










        </div>
    </div>
    
    
    
    
    </>
  )
}

export default Login
