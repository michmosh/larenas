import React from 'react';
import axios from 'axios';
import './dropdown.css';
export default class Dropdown extends React.Component{
   
    constructor(props){
        super(props);
        this.selectElement = this.selectElement.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            config : props.config,
            data : [],
            dropDownOpen : false,
            selected : null
        }
    }

    componentWillMount(){
        if(this.state.config.isServerData){
            axios.get(this.state.config.url)
            .then(res=> {
               this.setState({
                   data : res.data[this.state.config.resKey] ? 
                          res.data[this.state.config.resKey] : 
                          res.data 
                });
            }
            );
        }else{
            this.state.data = this.props.config.data;
        }
    }

    selectElement(el , toggle = false){
        this.setState({selected : el});
        this.props.selectedDropDown(el); 
        if(toggle )this.toggleDropDown();
    }
    toggleDropDown(){
        debugger;
        this.setState({dropDownOpen : !this.state.dropDownOpen})
    }

    render(){
        return (
            <div className="dropdown-wrapper" style={{width: this.state.config.width ? this.state.config.width : '20rem' }}  >
                <div style={{display:this.state.dropDownOpen ? "none" :"block"  }} className="dropdown-title">
                    {this.state.selected ? 
                        <div className="dropdown-item dropdown flex" >
                            <span className="dropdown-item-title">{this.state.selected.name}</span>   
                            <img className="dropdown-image" src={this.state.selected.flag} />
                            <i onClick={()=>{this.selectElement(null, false)}} className="fa fa-close"></i>
                        </div> 
                        : 
                        <div className="dropdown-item dropdown flex" onClick={this.toggleDropDown}>
                            <span className="dropdown-item-title">{this.state.config.placeholder}</span>   
                        </div> 
                    }
                </div>
                <ul style={{display:this.state.dropDownOpen ? "block" :"none" }}>
                    {this.state.data.map(( el, index )=>{
                        return(
                            <li className="dropdown-item dropdown" key={index} onClick={()=>{this.selectElement(el, true)}} value={index}>
                                <div className="flex">
                                    { Object.keys(el).map((key,index)=>{
                                        if(key in this.state.config.displayKeys){
                                            if(this.state.config.displayKeys[key] === "string") return <span key={index} className="dropdown-item-title">{el[key]}</span>
                                            if(this.state.config.displayKeys[key] === "number") return <span key={index} className="dropdown-item-title">{el[key]}</span>
                                            if(this.state.config.displayKeys[key] === "image") return <img key={index} className="dropdown-image" src={el[key]} />
                                        }  
                                       
                                    })}
                                         
                                   
                                    {/* <span className="dropdown-item-title">{el.name}</span> 
                                    {el.flag || el.image ?   
                                    <img className="dropdown-image" src={el.flag} />
                                    :
                                    ''
                                    } */}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

// example usage 
{/* <Dropdown 
config={{
    name:'countries' , 
    isServerData : true,
    url:"https://restcountries.eu/rest/v2" , 
    resKey : null,
    width:'15rem' , 
    placeholder:'SELECT COUNTRY' , 
    displayKeys:{
        name:"string",
        flag:"image"
    }
}}
selectedDropDown={this.selectedDropDown}
/>

{this.state.country ? this.state.country.name : ''} */}