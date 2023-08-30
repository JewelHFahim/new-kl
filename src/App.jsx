import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="font-poppins">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App;
