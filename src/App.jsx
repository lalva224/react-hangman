import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {arr} from './data'
import Puzzle from './puzzle'
//using state setter for use state is neccessary bc it allows react to become aware of changes. without it, bugs can easily occur.
function App() {
  //only want to render once per refresh. useEffect allows me to do it once onMount
  let [letters,setLetters] = useState([])
  useEffect(()=>{
    const index = Math.floor(Math.random()*100  % arr.length)
    const word = arr[index]
    console.log(word)
    setLetters(word.split(''))
  },[])

  
  //this will be passed to the puzzle component so it knows what to display.
  const [unseen,setUnseen] = useState([])

  //useState renders before useEffect, this means if i pass in letters in useState it will only render an empty array

  useEffect(()=>{
    setUnseen(letters)
   
   //onMount letters is an empty array, need to change on Update
  },[letters])
  //if not in unseen but in seen then a message but be sent to user that letter has already been guessed!
  
  const [seen,setSeen] = useState([])
  //store user input
  const [formData, setformData] = useState('')
  //decrements if not in unseen or seen
  const [availableGuesses, setAvailableGuesses] = useState(7)

  const [displaySeen, setDisplaySeen] = useState(false)
  const [displayWrong,setDisplayWrong] = useState(false)
  

  const handleSubmit = (event) =>{
    event.preventDefault();
    /*if letter(formData) inside unseen then remove it from unseen and the puzzle component will react dynamically,
    Then, add to seen
    */
  
   if(unseen.includes(formData)){
    console.log(seen.join(''),letters.join(''))
     removeFromUnseen(formData)
     setSeen((seen) =>[...seen,formData])
     setAvailableGuesses(availableGuesses=> availableGuesses-1)
     
   }

   //if not in unseen but in seen then an alert prompting re-try must be sent
   else if(seen.includes(formData)){
    console.log("You've already guessed this!")
    //transtion of our message
    triggerSeenTransiton()
    
   }
   
   else if(JSON.stringify(seen)===JSON.stringify(letters)){
    alert("You've won!!")
   }

   //not in seen, nor unseen, must decrement available gusses
   else{
    if(availableGuesses==0){
      alert("You Lost!")
    }
    triggerWrongTransition()
    setAvailableGuesses(availableGuesses=> availableGuesses-1)
    console.log(availableGuesses)
   }
  }

  const removeFromUnseen =(data) =>{
  
   let new_arr =unseen.filter((letter)=>letter!=data)
    setUnseen(new_arr)
  }
  
  const triggerSeenTransiton = () =>{
    setDisplaySeen(displaySeen=>!displaySeen)

    setTimeout(()=>{
      setDisplayWrong(displaySeen=>!displaySeen)
    },2000)
  }

  const triggerWrongTransition = () =>{
    setDisplayWrong(displayWrong=>!displayWrong)

    setTimeout(()=>{
      setDisplayWrong(displayWrong=>!displayWrong)
    },2000)
  }

  
  return (
    <>
      <header>
        <h1>Hangman</h1>
      </header>
      
      <div id = 'puzzle-container'>
        <Puzzle letters = {letters} unseen_arr = {unseen}/>
      </div>
      <div id = "form-container">
        <form onSubmit={handleSubmit}>
          <h4>Enter your guess</h4>
          <input onChange={(event)=>setformData(event.target.value)} maxLength='1' type ="text" id = "guess-input"></input>
          <input type = "submit" value = "Submit Guess"/>
        </form>

        <p className={displaySeen? '' : 'hide'}>You've already clicked this!</p>
        
      </div>
    </>
    
  )
  }

  

  

export default App
