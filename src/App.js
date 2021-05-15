import './App.css';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentContainer from "./components/students/StudentContainer";

function App() {
  return (
      <div className="App">
        <StudentContainer/>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              transition={Slide}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              limit={1}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      </div>
  );
}

export default App;
