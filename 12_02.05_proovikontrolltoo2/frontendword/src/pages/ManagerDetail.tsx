import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Word } from '../models/Word';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManagerDetail() {
  const { managerId } = useParams<{ managerId: string }>();
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    
    fetch(`http://localhost:8080/words/by-manager/${managerId}`)
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Failed to fetch words: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then(data => {
        setWords(data);
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(`Error loading words: ${error.message}`);
      });
  }, [managerId]);

  if (words.length === 0) {
    return (
      <div>
        <h1>Words for Manager {managerId}</h1>
        <p>No words found for this manager.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Words for Manager {managerId}</h1>
      {words.map((word) => (
        <div key={word.typeId} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>Word: {word.type}</h3>
          <div><strong>Description:</strong> {word.description}</div>
          <div><strong>Manager:</strong> {word.manager?.name || 'Unknown Manager'}</div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default ManagerDetail;
