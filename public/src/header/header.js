import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Dropdown from "../dropdown/dropdown";

export default class Header extends React.Component {
  appName;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.selectedLng = this.selectedLng.bind(this);
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
          lng : data.name
      })
      this.props.setSelectedLng(data.name);
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
            <Dropdown 
                config={{
                    name:'lng' , 
                    isServerData : false,
                    resKey : null,
                    width:'3rem' , 
                    placeholder:'' , 
                    displayKeys:{
                        name:"string",
                        flag:"image"
                    },
                    data:[...this.props.config.languages],
                    selected:this.props.config.languages[0]
                }}
                selectedDropDown={this.selectedLng}
                isCancelSelected={false}/>
                
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
