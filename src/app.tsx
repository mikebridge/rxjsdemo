import * as React from "react";
//import * as ReactDOM from "react-dom";
import "./app.css";
//import {RaisedButton} from "material-ui";

import getMuiTheme from "material-ui/styles/getMuiTheme";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {Counter} from "./counter/counter";
class App extends React.Component<{}, {}> {


  render() {
      return (

              <div className="App">
                  <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Counter start={60} increment = {-1} />
                  </MuiThemeProvider>

              </div>

      );
  }
}

export default App;
