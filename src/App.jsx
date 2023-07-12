import React, { useEffect, useState } from 'react';
import {FaAngleRight} from 'react-icons/fa'

const MyComponent = () => {
  const [language, setLanguage] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [output, setOutput] = useState('');
  const [rows, setRows] = useState('25')
  const [error, setError] = useState("")
  const [userInput, setUserInput] = useState("")

  const fetchData = async () => {
    const code = encodeURIComponent(input);
    const encodedLanguage = encodeURIComponent(language);
    const encodedInput = encodeURIComponent(userInput);
    const data = `code=${code}&language=${encodedLanguage}&input=${encodedInput}`;

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    };

    try {
      const response = await fetch('https://api.codex.jaagrav.in', config);
      const responseData = await response.json();
      setResult(JSON.stringify(responseData));
      setOutput(responseData.output); 
      setError(responseData.error)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelection = (e) => {
    setLanguage(e.target.value);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleRun = () => {
    if (language && input) {
      fetchData();
    }
  };
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  }
  const handleKeyEvent = (event) => {
    if(event.key === 'Enter'){
      handleRun();
    }
  }

  const renderList = (rows) => {
    const listItems = [];
    for (let i = 1; i < rows; i++) {
      listItems.push(<li key={i}>{i}</li>);
    }
    return listItems;
  };

  return (
    <div className='flex flex-row h-screen w-screen bg-gega-dark'>
      <div className='m-9 border-2 border-gega-green min-w-[700px] min-h-[700px]'>
        <div className='flex flex-row justify-between my-2'>
          <select value={language} onChange={handleSelection} className='ml-10 bg-gega-green border-none outline-none'>
            <option value="">Select a language</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">GoLang</option>
            <option value="cs">C#</option>
            <option value="js">NodeJS</option>
          </select>
          <button className='border-none bg-gega-green text-black mr-16 px-2 py-1 rounded-md' onClick={handleRun}>Run</button>
        </div>
        <div className='flex flex-row'>
          <div className='flex flex-col min-w-[30px] text-center text-gega-white'>
            {
              <ul>{renderList(rows)}</ul>
            }
          </div>
          <div className='bg-gega-light-black'>
            <textarea value={input} onChange={handleInput} className='bg-gega-light-black text-gega-white pl-1' name="input" id="" cols="85" rows={rows}></textarea>
          </div>
        </div>
      </div>
      <div className={`flex flex-col min-h-[700px] min-w-[700px] m-9 border-2 border-gega-green ${error ? 'border-red-700' : 'border-gega-green'}`}>
        <div className=''>
          <FaAngleRight className='absolute top-10 text-gega-light'/>
          <input type="text" value={userInput} onChange={handleUserInput} onKeyDown={handleKeyEvent} className='bg-gega-light-black text-gega-white w-full border-none outline-none pl-5'/>
        </div>
        <div className='text-gega-light'>
          {error}
          {output}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
