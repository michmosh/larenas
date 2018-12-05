import React from 'react'; 
import ImgInput from '../../../img-input/img-input';
export default class BarFormTemplate extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.openImageInput = this.openImageInput.bind(this);
        this.state  = {
            data : {
                title : '' , 
                body : '' ,
                lng : 'en',
                image:[]
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

    action(event){
        event.preventDefault();
        this.props.modalActions(this.props.type , this.state.data);
    }

    handleClose(event){
        this.setState({
            data : {
                title : '' , 
                body : '' ,
                lng : 'en',
                image:[]
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
        let data = {...this.state.data};
        index !== false ? data.image[index] = image : data.image.push(image);
        return this.setState({data:data , inputOpen :false , type : 'add'}); 
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
            <select className="form-control" name="lng" value={this.state.data.lng} onChange={this.handleChange} > 
                <option value="en"> EN </option>
                <option value="es"> ES </option>
            </select> 
            <label htmlFor="body"> Description </label>
            <textarea className="admin-input" name="body" value={this.state.data.body} onChange={this.handleChange}></textarea>
            <ul className="images-array">
                {
                    this.state.data.image.map((el ,index )=>{
                        let image = el instanceof File ?  URL.createObjectURL(el) : el;
                        return (
                            <li key={index}>
                                <ImgInput 
                                    alt="bar" 
                                    data={{src:`${image}`}} 
                                    uploadedImage={(el)=>{this.uploadedImage(el , index)}} 
                                    defaultImage={this.props.defaultImage} 
                                    isEdit={this.state.type === 'edit' ? true : false}
                                />
                            </li>
                        )
                    })
                }
                 <li>
                    <button onClick={this.openImageInput}>
                        <img src="images/add.png"  alt="add" />
                    </button>
                            <ImgInput 
                                hidden={true}
                                alt="room" 
                                data={{src:'images/add.png'}} 
                                isOpen={this.state.inputOpen} 
                                uploadedImage={(image)=>{this.uploadedImage(image , false)}}
                                isEdit={false}
                            />
                </li>
            </ul> 
            
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