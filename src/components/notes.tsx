"use client";
import { useState, useEffect } from "react"


type Notes = {
    id:number;
    title:string;
    content:string;
};

const defaultNotes : Notes[] = [
    {
        id : 1,
        title:"Meeting Schedule",
        content:"Discussion on recent project",
    },
    {
        id:2,
        title:"Attended Lecture",
        content:"DBMS Lectures",
    },
    {
        id:3,
        title:"Read Book",
        content:"Read a book on C++ Programming",
    },
];

function useLocalStorage<T>(key:string, initialValue:T){
    const [storedValue,setStoredValue ] = useState<T>(initialValue);
    useEffect(()=>{
         if(typeof window !== "undefined"){
            try{
                const item = window.localStorage.getItem(key);
                if (item){
                    setStoredValue(JSON.parse(item));
                }
         }
         catch(error){
            console.error(error)
         }
    }
    },[key]);

    const setValue=(value:T | ((val:T) => T)) => {
        try{
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if(typeof window !== "undefined"){
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch(error){
            console.error(error);
        }

    };
   return [storedValue, setValue] as const;
}

const notes = () => {
    
  return (
    <div>
      
    </div>
  )
}

export default notes
