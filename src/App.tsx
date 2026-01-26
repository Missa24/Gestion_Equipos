import { ToastContainer } from "react-toastify";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

function App() {

  return (
    <>
      <div className="overflow-auto">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
