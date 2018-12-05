import React from 'react'; 
import './room.css'
import axios from 'axios';
export default class Room extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            room:{
                title : '',
                lng: '' ,
                mainImage : '',
                images : [] , 
                description : ''
            }
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.getData(params.id);
    }

    getData(id){
        axios.get(`${this.props.config.apiUrl}/rooms/${id}`)
            .then(res => {
                this.setState({
                    room : res.data
                })
            })
            .catch(e=>{

            })
    }

    render(){
        return (
                <div className="room-wrapper">
                    {
                        this.state.room._id ? 
                        <div key={this.state.room._id}>
                            <h4>{this.state.room.title}</h4>
                            <p>{this.state.room.description}</p>
                            <img className="item-image" src={`${this.props.config.imagePath}/${this.state.room.mainImage}`} alt="room"/>
                            <div className="images-wrapper">
                                { this.state.room.images.map((img,i)=>{
                                    return(
                                        <img className="room-images" key={i} alt="room" src={`${this.props.config.imagePath}/${img}`} />
                                    )
                                })}
                            </div>
                    
                        </div>
                        :
                        ''
                    }
                    
                </div>
        )
    }
}