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

    componentWillMount (props) {
        this.loopImages();
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
        return (
            <div>
                <div className={"card card-image with-transition"} style={{backgroundImage : `url(${this.state.imageClass})`}}>
                    <div className="background-cover">
                        <div className="inner-image-div">
                            <h2 className="card-title h2 my-4 py-2">{this.props.config.appName}</h2>
                            <Link to="/rooms" className="btn peach-gradient"><i className="fa fa-clone left"></i> View Rooms</Link>
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