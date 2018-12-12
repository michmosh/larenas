import React from 'react';
import { Link } from "react-router-dom"; 
import './home-image.css';

export default class HomeImage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        this.props.unmountTopImage(false) // dont render 
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return null
      }
    
    componentWillUnmount(){
        this.props.unmountTopImage(true) // render
    }

   


    render(){
        const backgroundStyle = {
            background:`url(${this.props.config.topImages[1]})`,
            backgroundRepeat:'no-repeat',
            backgroundPosition:'top center',
            backgroundAttachment:'fixed',
            backgroundSize: '100vw 90vh',
            maxWidth: '100%' , 
            height: '100%' ,  
            minHeight: '50vh'
        }

        return (
            <div className="flex-container">
                <div>
                    <Link to="/rooms"><p className="image-title">{this.props.config[this.props.config.lng].homeImageTitle || ''}</p></Link>
                </div>
            </div>
        )
    }
}