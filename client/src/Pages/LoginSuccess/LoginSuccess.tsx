




import React from 'react'




interface LoginSuccess<T> {
    success:string;
    response: number
}


const loginSuccess:LoginSuccess<string | number> = {
    success: 'You Have Successfully Created Your Meta Account',
    response: 200
}





const LoginSuccess:React.FC = () => {
  return (
    <>

        <div className='w-screen overflow-hidden bg-white min-h-screen custom-success-container '>
            <div className=' flex flex-col items-center justify-center mx-auto max-w-[1000px]'>
                <div><h3>{loginSuccess.success}</h3></div>
                 
                <div><p>Response Status {loginSuccess.response} </p></div>

            </div>
        </div>
    
    
    
    
    
    </>
  )
}

export default LoginSuccess
