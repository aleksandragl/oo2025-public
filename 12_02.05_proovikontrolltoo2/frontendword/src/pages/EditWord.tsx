import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Word } from "../models/Word";

function EditWord() {
  const { wordId } = useParams();
  const [word, setWord] = useState<Word | null>(null);
  const wordRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const managerRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/words/${wordId}`)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [wordId]);

  const editWord = () => {
    const updatedWord = {
      typeId: wordId,
      type: wordRef.current?.value,
      description: descriptionRef.current?.value,
      manager: { id: Number(managerRef.current?.value) }
    };

    fetch("http://localhost:8080/words", {
      method: "PUT",
      body: JSON.stringify(updatedWord),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.status) {
          toast.error(json.message);
        } else {
          toast.success('Word updated successfully!');
          navigate("/"); // Перенаправляем на главную страницу
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while updating the word.");
      });
  };

  if (!word) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Word</h2>
      <label>Type</label> <br />
      <input ref={wordRef} defaultValue={word.type} type="text" /> <br />
      <label>Description</label> <br />
      <input ref={descriptionRef} defaultValue={word.description} type="text" /> <br />
      <label>Manager</label> <br />
      <select ref={managerRef} defaultValue={word.manager?.id ?? ''}> 
        <option value="1">Manager 1</option>
        <option value="2">Manager 2</option>
        <option value="3">Manager 3</option>
      </select> <br />
      <button onClick={editWord}>Save Changes</button>
      <ToastContainer />
    </div>
  );
}

export default EditWord;