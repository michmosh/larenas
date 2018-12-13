import React from 'react';
import { Link } from "react-router-dom";
import './top-image.css'; 
export default class TopImage extends React.Component{
    interValId; 
    isVisible = true;
    constructor(props){
        super(props);
        this.imageClass = props.config.topImages[1] ; 
        this.state = {
            imageClass : this.imageClass , 
            isVisible : this.isVisible,
            imagesArray : props.config.topImages
        }
    }

    componentDidMount (props) {
        this.loopImages();
    }

    componentWillUnmount(){
        clearInterval(this.interValId);
    }
    
    loopImages(){
        this.setState({isVisible : true});
        let counter = 0 ; 
        this.interValId =  setInterval(()=>{
            for( let i in this.state.imagesArray){
                if(counter < this.state.imagesArray.length){
                    this.setState({imageClass : this.state.imagesArray[counter]})
                }else{
                    counter  = 0
                    this.setState({imageClass : this.state.imagesArray[counter]})
                }
            }
            counter++
        } , 3000 , this.imageClass)
    }

    stopCarusl(){
      clearInterval(this.interValId);
      this.setState({isVisible : !this.isVisible})
    }

    render(){
            // let style = `
            // .top-image::before{
            //     content: "" ;
            //     display: block;
            //     position: fixed;
            //     left: 0;
            //     top: 0;
            //     width: 100%;
            //     height: 40vh;
            //     z-index: -10;
            //     background:url(${this.state.imageClass}) no-repeat center center;
            //     background-size: cover;
            //     background-repeat: no-repeat;
            //     transition: background-image 0.5s linear;
            //     max-width:100%;
            // }`
      return (
        <div class="top-image-wrapper">
            {/* <style>{style}</style> */}
            <div className={"card card-image with-transition"} style={{backgroundImage:`url(${this.state.imageClass})`}}>
                <div className="background-cover">
                    <div className="inner-image-div">
                        <h2 className="card-title h2 my-4 py-2">{this.props.config.appName}</h2>
                        {
                            this.props.showButton !== false ? 
                                <Link to="/rooms" className="btn"><i className="fa fa-clone left"></i> View Rooms</Link> :
                                ''
                        }
                                
                        <div className="orange-text">
                        {
                            this.state.isVisible ? 
                                <i className="fa fa-pause-circle" onClick={this.stopCarusl.bind(this)}> </i> :
                                <i className="fa fa-play-circle" onClick={this.loopImages.bind(this)}> </i> 
                        }
                            <p>
                                <i className="fa fa-camera-retro"></i>
                                Photography : olaschidas.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )  
    }
}
