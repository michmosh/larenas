import React from 'react'; 
import './delete.css'

export default class DeleteTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            data:props.data
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data._id !== prevState.data._id ) {
          return ({ data: nextProps.data }) // <- this is setState equivalent
        }else{
            return null
        }
    }

    action(event){
        this.props.modalActions(this.props.type , this.state.data._id);
    }

    handleClose(event){
        this.props.handleClose(event);
    }
    
    render(){
        return (
            <div>
            <div> are you sure you want to delete ? {this.props.data.title} </div>
            <div className="flex form-button-wrraper">
                <button className="button danger" onClick={(event)=>{this.handleClose(event)}}> 
                    Close 
                    <i style={{paddingLeft:'0.5rem'}} className="fa fa-trash"></i>
                </button> 
                <button className="button edit" onClick={(event)=>{this.action( event)}}> 
                    {this.props.type}
                    {this.props.type === "add" ? 
                        <i style={{paddingLeft:'0.5rem'}} className="fa fa-plus"></i>
                        :
                        <i style={{paddingLeft:'0.5rem'}} className="fa fa-edit"></i>
                    }
                </button> 
            </div>
        </div>
        )
    }
}