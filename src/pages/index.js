import { useEffect, useState } from 'react';
import api from '@/utils/api';
// import axios from 'axios';


export default function HomePage() {
  const [poems, setPoems] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await api.get('/all-poems');
        console.log("✅ Poems fetched successfully:", response.data);
        setPoems(response.data.poems);
      } catch (error) {
        console.error('❌ ouch! Failed to fetch poems:', error.response ? error.response.data : error.message);
      }
    };
    fetchPoems();
  }, []);

  return (
    <div>
      <h1>...just some (yummy) poems here, <br></br> 
      nothing more, <br></br>
      nothing less.</h1>
      {poems ? <pre>{JSON.stringify(poems, null, 2)}</pre> : <p>Loading...</p>}
      <button onClick={() => {
          localStorage.removeItem('token');
          document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          console.log("Logged out, token cleared");
      }}>Logout</button>
    </div>
  );
}
