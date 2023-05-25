import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { RouterProvider, createBrowserRouter, useRoutes } from "react-router-dom";
import router from "./routes";

function App() {
  const routes=createBrowserRouter(router);

  return (
    <div className="App">
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <RouterProvider router={routes} />
    </div>
  );
}

export default App;
