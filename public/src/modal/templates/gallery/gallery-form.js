import React from 'react'; 
import ImgInput from '../../../img-input/img-input';
export default class GalleryFormTemplate extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.openImageInput = this.openImageInput.bind(this);
        this.state  = {
            data : {
                title : '' , 
                imageUrl:''
            },
            inputOpen : false
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data._id !== prevState.data._id ) {
          return ({ data: nextProps.data , type : nextProps.type }) // <- this is setState equivalent
        }else{
            return null
        }
    }

    handleClose(event){
        this.setState({
            data : {
                title : '' , 
                imageUrl:''
            }
        })
       this.props.handleClose(event);
    }

    handleChange(event){
        let controlName = event.target.name;
        let formControls = {...this.state.data};
        formControls[controlName] = event.target.value;
        this.setState({data:formControls});
        event.preventDefault();
    }

    openImageInput(event){
        this.setState({
            inputOpen : true
        })
        event.preventDefault();
    }

    uploadedImage(image , index){
        let data = {...this.state.data} 
        data.imageUrl = image;
        return this.setState({data:data , inputOpen :false});
      
    }

    action(event){
        event.preventDefault();
        this.props.modalActions(this.props.type , this.state.data);
    }


    render(){
        return (
            <form>
            <label htmlFor="title"> Title</label>
            <input type="text" name="title" className="admin-input" value={this.state.data.title } onChange={this.handleChange} />
            <ImgInput 
                alt="room" 
                data={{src:`${this.state.data.imageUrl}`}} 
                uploadedImage={(image)=>{this.uploadedImage(image)}} 
                defaultImage={this.props.defaultImage} 
                isEdit={this.state.type === 'edit' ? true : false}
                className="main-image"
            />
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
        </form>
        )
    }
}