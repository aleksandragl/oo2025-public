import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Word } from '../models/Word';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10); 
  const [sort, setSort] = useState<string>('type,asc');

  useEffect(() => {
    fetch(`http://localhost:8080/words?page=${page}&size=${size}&sort=${sort}`)
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Failed to fetch words: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then(data => {
        setWords(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(`Error loading words: ${error.message}`);
      });
  }, [page, size, sort]);

  const changePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(event.target.value));
    setPage(0);
  };

  return (
    <div>
      <h1>Words</h1>


      <button onClick={() => setSort('type,asc')}>Sort A-Z</button>
      <button onClick={() => setSort('type,desc')}>Sort Z-A</button>


      <div>
        <label>Words per page: </label>
        <select value={size} onChange={handleSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>


      {words.length === 0 ? (
        <p>No words found.</p>
      ) : (
        words.map(word => (
          <div key={word.typeId}>
            <div>{word.type}</div>
            <Link to={`/word-detail/${word.typeId}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))
      )}


      <div>
        <button disabled={page === 0} onClick={() => changePage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainPage;