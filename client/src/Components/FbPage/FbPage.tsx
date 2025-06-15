import React, { useEffect, useState } from 'react'
import './FbPage.css'
import { useNavigate } from 'react-router-dom'
import { Facebook } from '../Data/data'

const FbPage: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errormessage, setErrorMessage] = useState("");
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger animations on load
        setAnimate(true);
    }, []);

    const facebookRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setButtonSpinner(true);

        try {
            const response = await fetch('http://localhost:3001/user/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ password, email })
            });

            const data = await response.json();
            if (data.success) {
                document.cookie = data.setCookie;
                navigate('/login');
            } else {
                setErrorMessage(data.message || "Something went wrong.");
            }
        } catch (error) {
            setErrorMessage(`Error has occurred: ${error}`);
        } finally {
            setButtonSpinner(false);
        }
    }

    return (
        <div className='w-screen overflow-hidden bg-black h-[100vh] custom-container'>
            <div
                id='parentDiv'
                className={`flex items-center justify-around mx-auto max-w-[2000px] text-center relative top-[110px] custom-wrapper ${animate ? 'fade-slide-in-left' : 'initial-left'}`}
            >
                <div className={`text-container ${animate ? 'fade-slide-in-right' : 'initial-right'}`}>
                    <div className='text-blue-500 font-serif font-bold sm:text-lg md:text-lg lg:text-7xl xl:text-7xl text-center'>
                        <h3>Meta</h3>
                    </div>
                    <div className='sm:text-lg md:text-lg lg:text-xl xl:text-xl text-white font-bold font-sans w-[100%]'>
                        <p>Connect with friends and the world around you on Facebook.</p>
                    </div>
                </div>

                <div className={`form-box bg-[whitesmoke] h-[410px] w-[40%] rounded-xl ${animate ? 'fade-slide-in-right' : 'initial-right'}`}>
                    <form onSubmit={facebookRegister}>
                        <div className='text-center text-lg p-3'>
                            <input className='border-2 border-solid border-green-600 w-[99%] text-center text-lg p-3 focus:border-purple-500 focus:outline-purple-500 rounded-md'
                                onChange={(e) => setEmail(e.target.value)} type='email' value={email} placeholder='Enter Email' required />
                        </div>
                        <div className='text-center text-lg p-3'>
                            <input className='border-2 border-solid border-green-600 w-[99%] text-center text-lg p-3 focus:border-purple-500 focus:outline-purple-500 rounded-md'
                                onChange={(e) => setPassword(e.target.value)} type='password' value={password} placeholder='Enter Password' required />
                        </div>
                        <div>
                            <button className='bg-blue-600 w-[90%] text-white text-lg p-2 border-none outline-none cursor-pointer hover:bg-green-500' type='submit'>
                                {buttonSpinner ? <span className="spinner"></span> : <span>Create Your Meta Account</span>}
                            </button>
                        </div>
                        {errormessage && (
                            <div className="text-red-500 text-center mt-4 font-semibold"> {errormessage} </div>
                        )}
                        <div className='flex items-center justify-center mx-auto max-w-[800px]'>
                            <div className='w-[41%] object-contain h-[10%]'>
                                <img src={Facebook[0].metaImage} alt='meta-image' loading='lazy'></img>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FbPage;