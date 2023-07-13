import React, { useEffect, useState } from 'react';
import {FaAngleRight} from 'react-icons/fa'
import Code from '../src/Components/Code'

const MyComponent = () => {
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState("")
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  }
  const handleKeyEvent = (event) => {
    if(event.key === 'Enter'){
      handleRun();
    }
  }

  return (
    <div className='flex flex-row h-screen w-screen bg-gega-dark'>
      <div>
        <Code error={error} />
      </div>
      
      <div className={`flex flex-col min-h-[700px] min-w-[700px] m-9 border-2 border-gega-green ${error ? 'border-red-700' : 'border-gega-green'}`}>
        <div className=''>
          <FaAngleRight className='absolute top-10 text-gega-light'/>
          <input type="text" value={userInput} onChange={handleUserInput} onKeyDown={handleKeyEvent} className='bg-gega-light-black text-gega-white w-full border-none outline-none pl-5'/>
        </div>
        <div className='text-gega-light'>
          {error}
          {/* {output} */}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;


