import React from "react";
import Home from "./containers/Home/Home";
import 'primereact/resources/themes/saga-orange/theme.css';        // theme
import "primereact/resources/primereact.min.css";                  // core css
import "primeicons/primeicons.css";                                // icons


const App = () => {
  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
}

export default App;