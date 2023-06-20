import { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";
//import diaryService from "./services/diaries";

const baseUrl = 'http://localhost:3000/api'


const App = () => {
  //const [newNote, setNewNote] = useState('');
  const [ diaries, setDiaries ] = useState<DiaryEntry[]>([])

  useEffect(() => {
    axios.get(`${baseUrl}/diaries`).then(res => {
      setDiaries(res.data as DiaryEntry[] )
    })
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3 >{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;