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
    const [notes, setNotes] = useLocalStorage<Notes[]>("notes",defaultNotes);

    const [newNotes, setNewNotes] = useState<{title: string , content : string}>({
        title:"",
        content: "",
    });

    const [editNotesId, setEditNotesId] = useState<number | null>(null);

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    const handleAddNotes = (): void =>{
        if(newNotes.title.trim() && newNotes.content.trim()){
            const newNoteswithId = {id: Date.now() , ...newNotes};
            setNotes([...notes, newNoteswithId])
            setNewNotes({title:"", content: ""});
        }
    };

    const handleEditNote = (id:number) : void =>{
        const noteToEdit = notes.find((note) => note.id === id);
        if(noteToEdit){
            setNewNotes({title: noteToEdit.title , content: noteToEdit.content} );
            setEditNotesId(id);
        }
    };

    const handleUpdateNote= (): void =>{
        if(newNotes.title.trim() && newNotes.content.trim()){
        setNotes(
            notes.map((note) => 
            note.id === editNotesId ? 
            {id : note.id , title: newNotes.title , content: newNotes.content}
            :note
            )
        );
        setNewNotes({title : "" , content : ""});
        setEditNotesId(null);
    }
};

if(!isMounted){
    return (null);
}

  return (
    <div>
      
    </div>
  )
}

export default notes
