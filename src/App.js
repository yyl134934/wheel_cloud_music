import { GlobalStyle } from "./style";
import { renderRouter } from "react-router-config";
import { IconStyle } from "./assets/iconfont/iconfont";
import router from "./routes";

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {renderRouter(router)}
    </div>
  );
}

export default App;
