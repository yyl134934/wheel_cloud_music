import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import router from './routes';
import store from './store';

function App() {
  const routes = createBrowserRouter(router);

  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
