import React from 'react'; 
import './gallery.css';
import axios from 'axios';

export default class Gallery extends React.Component{
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
        axios.get(`${this.props.config.apiUrl}/gallery`)
            .then(res => {
                this.setState({
                    data : res.data
                })
            })
    }

    render(){
        return (
            <div>
                <div className="container">
                    {this.state.data.map(item=>{
                        return (
                            <div key={item._id} className="gallery-item">
                                <h5 className="title">{item.title}</h5>
                                <img className="gallery-image" src={`${this.props.config.imagePath}/${item.imageUrl}`} alt={item.title}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}