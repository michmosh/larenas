import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './main.css';
import TopImage from '../top-image/top-image';
import Home from '../home/home';
import Rooms from '../rooms/rooms';
import Gallery from '../galery/galery';
import Bar from '../bar/bar';
import Contact from '../contact/contact';
import Login from '../login/login';
import Room from '../room/room';
export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lng:props.config.lng
        }
    }

    componentDidUpdate(props , old_props){
        this.setLanguage(props.config.lng)
    }

    setLanguage(lng){
        if(lng !== this.state.lng){
            this.setState({
                lng : lng
            })
        }
    }

    render(){
        return (
            <main>
                <TopImage config={this.props.config}></TopImage>
                <div className="main-wrapper">
                    <Route exact path="/" render={()=><Home config={this.props.config}/>}/>
                    <Route path="/home" render={()=><Home config={this.props.config}/>}/>
                    <Route path="/galery" render={()=><Gallery config={this.props.config}/>} />
                    <Route exact path="/rooms" render={()=><Rooms config={this.props.config}/>} />
                    <Route path="/bar-restaurant" render={()=><Bar config={this.props.config}/>} />
                    <Route path="/contact-us" render={()=><Contact config={this.props.config}/>} />
                    <Route path="/login" render={()=><Login config={this.props.config}/>} />
                    <Route path="/rooms/:id" render={(props)=><Room config={this.props.config} {...props}/>} />
                </div>
            </main>
            
        )
    }
}