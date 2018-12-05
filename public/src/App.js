import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./header/header";
import PageFooter from "./footer/footer";
import Main from "./main/main";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config
    };
    this.state.config.lng = "en";
  }

  setSelectedLng(lng){
    let config = {...this.state.config}
    config.lng = lng
    this.setState({
      config : config
    })
  }

  appName = "L`ARENA";
  render() {
    return (
      <Router>
          <div className="app-container">
            <Header config={this.state.config} setSelectedLng={this.setSelectedLng.bind(this)}/>
            <Main config={this.state.config} />
            <PageFooter config={this.state.config} />
          </div>
      </Router>
    );
  }
}

export default App;
