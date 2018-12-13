import React from 'react';
import { Link } from "react-router-dom"; 
import './home-image.css';

export default class HomeImage extends React.Component{

    componentDidMount(){
        this.props.unmountTopImage(false) // dont render 
    }
    
    componentWillUnmount(){
        this.props.unmountTopImage(true) // render
    }

    render(){
        return (
            <div className="flex-container">
                <div>
                    <Link to="/rooms"><p className="image-title">{this.props.config[this.props.config.lng].homeImageTitle || ''}</p></Link>
                </div>
            </div>
        )
    }
}