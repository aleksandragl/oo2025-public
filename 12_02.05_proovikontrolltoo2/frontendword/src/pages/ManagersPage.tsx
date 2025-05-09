
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Manager } from '../models/Manager';

function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/managers')
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Failed to fetch managers: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then(data => setManagers(data))
      .catch(error => {
        console.error('Error:', error);
        toast.error(`Error loading managers: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <h1>Managers</h1>
      {managers.length === 0 ? (
        <p>No managers found.</p>
      ) : (
        managers.map(manager => (
          <div key={manager.id}>
            <div>{manager.name}</div>
            <Link to={`/manager-detail/${manager.id}`}>
              <button>View Words</button>
            </Link>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
}

export default ManagersPage;
