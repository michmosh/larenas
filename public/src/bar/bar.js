import React from 'react'; 
import './bar.css';
import axios from 'axios';

export default class Bar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data :[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        axios.get(`${this.props.config.apiUrl}/resturante`)
            .then(res => {
                this.setState({
                    data : res.data
                })
            })
    }

    render(){
        return (
            <div className="bar-container">
                {this.state.data.map(item=>{
                    return (
                        <div key={item._id} className="bar-item">
                            <h2 className="bar-title">{item.title}</h2>
                            <p>{item.body}</p>
                            <div className="bar-images-wrapper">
                            {item.image.map((img,index)=>{
                                return <img key={index} className="bar-image" src={`${this.props.config.imagePath}/${img}`} alt={item.title}/>
                            })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}