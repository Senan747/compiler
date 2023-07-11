import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [language, setLanguage] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [rows, setRows] = useState('25')

  const fetchData = async () => {
    const code = encodeURIComponent(input);
    const encodedLanguage = encodeURIComponent(language);
    const encodedInput = encodeURIComponent('7');

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

  const renderList = () => {
    const listItems = [];
    for (let i = 1; i < 25; i++) {
      listItems.push(<li key={i}>{i}</li>);
    }
    return listItems;
  };

  return (
    <div className='flex flex-row h-screen w-screen bg-gega-dark'>

      {/* 
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleRun}>Run</button>
      <div>Result: {result}</div> */}
      <div className='m-9 border-2 border-gega-green min-w-[700px]'>
        <div className=''>
          <select value={language} onChange={handleSelection}>
            <option value="">Select a language</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">GoLang</option>
            <option value="cs">C#</option>
            <option value="js">NodeJS</option>
          </select>
          <button className='border-none bg-gega-green text-black' onClick={handleRun}>Run</button>
        </div>
        <div className='flex flex-row'>
          <div className='flex flex-col min-w-[20px] text-gega-white'>
            {
              <ul>{renderList()}</ul>
            }
    
          </div>
          <div>
            <textarea name="input" id="" cols="85" rows={rows}></textarea>
          </div>
           
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default MyComponent;
