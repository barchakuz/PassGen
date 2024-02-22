import { useCallback, useEffect, useState , useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);
  const passwordGenerator = useCallback( () =>{
    let pass = "";
    let str = "ABCEDEFGHJKLMNOPQRSTWUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "1234567890";
    if(charAllowed) str += "~!@#$%^&*()<>?{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]);
  const passwordSelector = useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  },[password,length])
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed,passwordGenerator]);
  
  return (
    <>
    <h1 className='ext-3xl font-bold text-6xl py-2 mx-48'>Password Generator</h1>
      <div  className='bg-gray-200 rounded w-fit px-2 py-2  mx-auto'>
        <div>
          <input type="text" 
          value={password} 
          ref={passRef}
          className='bg-gray-300 border-2 w-96 h-15' readOnly/>
          <button className='bg-blue-200 white w-20'
          onClick={passwordSelector}>COPY</button>
        </div>

        <div className='space-x-2'>
          <input type="range"
          
          name="Character"
          min={8}
          max={100}
          value={length}  
          onChange={(e)=> setLength(e.target.value)}/>
          <label htmlFor="Character" >Lenght : {length}</label>
          <input type="checkbox" 
          name="Num"
          value={numberAllowed}
          onChange={()=> {setNumberAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="Num"> Number</label>
          <input type="checkbox" 
          name="Char"
          value={charAllowed}
          onChange={()=> {setCharAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="Char"> Character</label>
        </div>
       </div> 
    </>
  )
}

export default App
