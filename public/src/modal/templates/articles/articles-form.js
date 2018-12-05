import React from 'react'; 
import './article-form.css'

export default class ArticleFormTemplate extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state  = {
            data : {
                title : '' , 
                page: '' , 
                body : '' ,
                lng:'en'
            }
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
        event.preventDefault();
        this.props.modalActions(this.props.type , this.state.data);
    }

    handleClose(event){
       this.props.handleClose(event);
    }

    handleChange(event){
        let controlName = event.target.name;
        let formControls = {...this.state.data};
        formControls[controlName] = event.target.value;
        this.setState({data:formControls});
        event.preventDefault();
      
    }

    render(){
        return (
            <form>
            <label htmlFor="title"> Title</label>
            <input type="text" name="title" className="admin-input" value={this.state.data.title || '' } onChange={this.handleChange} /> 
            <label htmlFor="lng"> Language</label>
            <select className="form-control" name="lng" value={this.state.data.lng || ''} onChange={this.handleChange} > 
                <option value="en"> EN </option>
                <option value="es"> ES </option>
            </select> 
            <label htmlFor="page"> Page</label>
            <input type="text" name="page" className="admin-input" value={this.state.data.page || '' } onChange={this.handleChange} /> 
            <label htmlFor="article"> Article</label>
            <textarea className="admin-input" name="body" value={this.state.data.body || '' } onChange={this.handleChange}></textarea>
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
        </form>
        )
    }
}