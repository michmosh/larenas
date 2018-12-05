import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./header.css";

export default class Header extends React.Component {
  appName;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      appName: props.appName,
      lng : props.config.lng
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  selectedLng(data){
      this.setState({
          lng : data.target.value
      })
      this.props.setSelectedLng(data.target.value);
  }

  render() {
    return (
      <header className="blueviolet">
        <nav >
            <div>
                <div>
                    <Link to="/" className="brand"> {this.props.config.appName} </Link>
                </div>
                <ul className="nav-collapsed">
                {this.props.config[this.state.lng].navLinks.map((link , index)=>{
                    return (
                        <li className="nav-item" key={index}>
                            <Link to={link.path}  className="nav-link">  {link.name} </Link>
                        </li>
                    )
                })}
                </ul>
            </div>
            <div>
                <select className="blueviolet" onChange={this.selectedLng.bind(this)}>
                    <option value="en">en</option>
                    <option value="es">es</option>
                </select>
                <button onClick={this.toggle} className={this.state.isOpen ? "navbar-toggler" : "navbar-toggler collapsed"}   type="button" >
                    <span className="icon-bar top-bar" />
                    <span className="icon-bar middle-bar" />
                    <span className="icon-bar bottom-bar" />
                    <span className="sr-only">Toggle navigation</span>
                </button>
            </div>
          
        </nav>
       
        
        <nav className={this.state.isOpen ? 'show' : 'hide '}>
            <ul className="nav">
            {this.props.config[this.state.lng].navLinks.map((link , index)=>{
                    return (
                        <li onClick={this.toggle} className="nav-item"  key={index}>
                            <Link to={link.path} className="nav-link">  {link.name} </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
      </header>
    );
  }
}
