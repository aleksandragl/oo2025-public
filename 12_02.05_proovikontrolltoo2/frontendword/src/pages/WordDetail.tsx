import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Word } from '../models/Word';
import { Link } from 'react-router-dom';

function WordDetail() {
  const { wordId } = useParams();
  const [word, setWord] = useState<Word | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/words/${wordId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch word: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setWord(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, [wordId]);

  if (!word) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Word Details</h2>
      <div><strong>Type:</strong> {word.type}</div>
      <div><strong>Description:</strong> {word.description}</div>
      <div><strong>Manager:</strong> {word.manager?.name || 'Unknown'}</div>
      <Link to={`/edit-word/${word.typeId}`}>
        <button>Edit Word</button>
      </Link>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default WordDetail;