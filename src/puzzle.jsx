import React, { useEffect, useState,} from "react";


const puzzle = ({letters,unseen_arr}) =>{

    const [win,setWin] = useState(false)
    const [data,setData] = useState(null)
    const generatePuzzleData =(puzzleData) =>{
        letters.forEach((letter)=> {
            if(unseen_arr.includes(letter)){
                puzzleData+='_ '
            }
            else{
                puzzleData+=letter + ''
            }
        })
        return puzzleData
    }
    
    
    return(
        <>
            <p>{generatePuzzleData('')}</p>
        </>
    )
        
    }

    

export default puzzle