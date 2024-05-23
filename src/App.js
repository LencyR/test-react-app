import './index.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './redux/counterSlice';

// sending a GET request to jsonplaceholder to fetch the list of json posts
function PostList() {
  // useState is used to setup an initial placeholder for the posts that is to be fetched from the jsonplaceholder.
  // loading is used as another example of how useState can be used within react and to have a way to show something while the data is being fetched from jsonplaceholder.
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect is used to update the initial empty array value of the posts state with the 
  // json data fetched from the jsonplaceholder api endpoint
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    // after getting a response from the jsonplaceholder we put it into a json.
    .then(response => response.json())
    // after the data is fetched using the setPosts from the state to update the value of the posts state with the data gathered from the jsonplaceholder.
    .then(data => {
      setPosts(data);
      setLoading(false);
    })
    //error catching in case of an error happening during the fetching stage
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// this function is used to showcase the redux toolkit along with the props using the step variable and passing it into the app component
// functions such as dispatch actions and payload are used here to gather and send data and interact with the redux state manager.
function Counter({ step }) {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(step);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <div>
        <input 
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          Increment by Amount
        </button>
      </div>
    </div>
  );
}

// the main app component simply gets the two components above and renders them as well as using the props made to send it a value of 10
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter step={10} />
        <PostList />
      </header>
    </div>
  );
}

export default App;
