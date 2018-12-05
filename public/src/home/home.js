import React from 'react'; 
import './home.css';
import axios from 'axios';
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lng:props.config.lng , 
            articles :[]
        }
    }

    componentDidMount(){
        this.getData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.config.lng !== prevState.lng) {
          return ({ lng: nextProps.config.lng }) // <- this is setState equivalent
        }else{
            return null
        }
      }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.config.lng !== this.state.lng){
            this.getData();
        }
    }

    getData(){
        axios.get(`${this.props.config.apiUrl}/articles`,{
            params:{
                lng : this.props.config.lng
            }
        }).then(res => {
                this.setState({
                    articles : res.data
                })
            })
            .catch(e=>{

            })
    }


    render(){
        return (
            <div className="flex-container">
                {this.state.articles.map((article , index)=>{
                    return (
                        <div key={index} className="column">
                            <h3> {article.title}</h3>
                            <p>{article.body}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}