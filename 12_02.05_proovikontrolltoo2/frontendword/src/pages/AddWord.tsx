import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddWord() {
  const wordRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const managerRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const addWord = () => {
    const wordType = wordRef.current?.value;
    const description = descriptionRef.current?.value;
    const managerId = managerRef.current?.value;

 
    if (!wordType || !description || !managerId) {
      toast.error("Please fill out all fields");
      return;
    }

    const newWord = {
      type: wordType,
      description: description,
      manager: { id: Number(managerId) },
    };

    fetch("http://localhost:8080/words", {
      method: "POST",
      body: JSON.stringify(newWord),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          toast.error(json.message);
        } else {
          toast.success('Word added successfully!');
          navigate("/");  
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while adding the word.");
      });
  };

  return (
    <div>
      <h2>Add New Word</h2>
      <label>Type</label> <br />
      <input ref={wordRef} type="text" /> <br />
      <label>Description</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Manager</label> <br />
      <select ref={managerRef}>
        <option value="1">Manager 1</option>
        <option value="2">Manager 2</option>
        <option value="3">Manager 3</option>
      </select> <br />
      <button onClick={addWord}>Add Word</button>
      <ToastContainer />
    </div>
  );
}

export default AddWord;