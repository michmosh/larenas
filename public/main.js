import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from './main.css';
import TopImage from '../top-image/top-image';
import Rooms from '../rooms/rooms';
import Gallery from '../galery/galery';
import Bar from '../bar/bar';
import Contact from '../contact/contact';
import Login from '../login/login';
import Room from '../room/room';
import HomeImage from '../home-image/home-image';
import Articles from '../articles/articles';
export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.unmountTopImage = this.unmountTopImage.bind(this);
        this.state = {
            lng:props.config.lng,
            TopImage : true,
            topImageButton:true
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

    unmountTopImage(showTopImage){
        this.setState({
            TopImage:showTopImage
        })
    }

    showTopImageButton(isRenderButton){ // boolean
        this.setState({
            topImageButton:isRenderButton
        })
    }

    render(){
        let backgroundStyle = {
            background:`url(${this.props.config.topImages[1]})`,
            backgroundRepeat:'no-repeat',
            backgroundAttachment:'fixed',
            maxWidth: '100%' , 
            backgroundSize:'cover'
        }
        return (
            <main className={this.state.TopImage ? '' : backgroundStyle}>
                {
                    this.state.TopImage ? 
                        <TopImage config={this.props.config} showButton={this.state.topImageButton}></TopImage>:
                        ''
                }
                
                <div className={this.state.TopImage ? styles.mainWrapper +' '+ styles.backgroundColor : styles.mainWrapper}>
                    <Route exact path="/" render={()=><HomeImage unmountTopImage={(showTopImage)=>{this.unmountTopImage(showTopImage)}} config={this.props.config}/>}/>
                    <Route path="/home" render={()=><HomeImage unmountTopImage={(showTopImage)=>{this.unmountTopImage(showTopImage)}} config={this.props.config}/>}/>
                    <Route path="/articles" render={()=><Articles config={this.props.config}/>}/>
                    <Route path="/galery" render={()=><Gallery config={this.props.config}/>} />
                    <Route exact path="/rooms" render={()=><Rooms config={this.props.config} renderButton={(renderButton)=>{this.showTopImageButton(renderButton)}}/>} />
                    <Route path="/bar-restaurant" render={()=><Bar config={this.props.config}/>} />
                    <Route path="/contact-us" render={()=><Contact config={this.props.config}/>} />
                    <Route path="/login" render={()=><Login config={this.props.config}/>} />
                    <Route path="/rooms/:id" render={(props)=><Room config={this.props.config} {...props}/>} />
                </div>
            </main>
            
        )
    }
}