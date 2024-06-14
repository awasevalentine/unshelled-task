import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Posts from './views/post';
import EditPost from './views/post/EditPost';
import ViewItem from './views/post/component/viewItem';



function App() {
  return (
    <div className="h-full">
        <Router>
          <Routes>
            <Route path='' element={<Posts />} />
            <Route path='/edit-post' element={<EditPost />} />
            <Route path='/post-details/:id' element={<ViewItem />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
