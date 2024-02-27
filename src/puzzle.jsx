import React, { useEffect, useState,} from "react";


const puzzle = ({letters,unseen}) =>{
    //no use state because we do not want continous updates through renders. Done all in 1 render
    const [puzzleData,setPuzzleData]= useState([])
    const [haveWon,setHaveWon] = useState(false)


    const updatePuzzleData = () =>{
        let new_puzzle_data = letters.map((letter)=>(
            //if its unseen then display it as an underscore, otherwise, display it as the letter + space
            unseen.has(letter.toLowerCase()) ? '_ ' : letter + ' '
            
        )).join('')
            console.log("from function:"  + new_puzzle_data)
          
    }
    /*i want a re-render every time puzzle data changes. This way i can check if puzzle data includes a '_'
    ONLY at every update instead of right at the beginning
    */
    useEffect(()=>{
        updatePuzzleData();
        
        return () =>{
            if(!puzzleData.includes('_')){
                
            }
        }
        
    },[puzzleData])
    return(
        <>
            
       
        
        <p>{puzzleData}</p>
        
        </>
            
        
        
        
    )
}
export default puzzle