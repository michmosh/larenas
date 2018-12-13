import React from 'react'; 
import './rooms.css'
import axios from 'axios';
import { Link } from "react-router-dom";
export default class Rooms extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rooms:[],
            lng:props.config.lng
        }
    }

    componentDidMount(){
        this.getData();
        this.props.renderButton(false)
    }

    getData(){
        axios.get(`${this.props.config.apiUrl}/rooms`)
            .then(res => {
                this.setState({
                    rooms : res.data
                })
            })
            .catch(e=>{

            })
    }

    componentWillUnmount(){
        this.props.renderButton(true) // render
    }

    render(){
        return (
                <div className="content">
                {this.state.rooms.map((room,index)=>{
                    return (
                        <Link to={`/rooms/${room._id}`} key={index} className="item-with-image" >
                            <div>
                                <h4>{room.title}</h4>
                                <img className="item-image" src={`${this.props.config.imagePath}/${room.mainImage}`} alt="room"/>
                                <p>{room.description}</p>

                            </div>
                        </Link>
                    )
                })}
                </div>
        )
    }
}