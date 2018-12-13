import React from 'react'; 
import styles from './room-form.css';
import ImgInput from '../../../img-input/img-input';

export default class RoomFormTemplate extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.openImageInput = this.openImageInput.bind(this);
        this.state  = {
            data : {
                title : '' , 
                mainImage:'' ,
                images:[] , 
                description : '' ,
                lng:'en'
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
            data :{
                title : '' , 
                mainImage:'' ,
                images:[] , 
                description : '' ,
                lng:'en'
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

    uploadedImage(type , image , index){
        let data;
       switch(type){
           case "mainImage":
                data = {...this.state.data} 
                data.mainImage = image;
                return this.setState({data:data , inputOpen :false});
            case 'imagesArray':
                data = {...this.state.data};
                index !== false ? data.images[index] = image : data.images.push(image);
                return this.setState({data:data , inputOpen :false , type : 'add'}); 
            default:
                return null;
       }
      
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
            <label htmlFor="article"> Description </label>
            <textarea className="admin-input" name="description" value={this.state.data.description || '' } onChange={this.handleChange}></textarea>
            <ImgInput 
                alt="room" 
                data={{src:`${this.state.data.mainImage}`}} 
                uploadedImage={(image)=>{this.uploadedImage('mainImage' ,image)}} 
                defaultImage={this.props.defaultImage} 
                isEdit={this.state.type === 'edit' ? true : false}
                className="main-image"
            />

             <ul className="images-array">
                {
                    this.state.data.images.map((el ,index )=>{
                        let image = el instanceof File ?  URL.createObjectURL(el) : el;
                        return (
                            <li key={index}>
                                <ImgInput 
                                    alt="room" 
                                    data={{src:`${image}`}} 
                                    uploadedImage={(el)=>{this.uploadedImage('imagesArray',el , index)}} 
                                    defaultImage={this.props.defaultImage} 
                                    isEdit={this.state.type === 'edit' ? true : false}
                                    className="images-array"
                                />
                            </li>
                        )
                    })
                }
                 <li>
                    <button onClick={this.openImageInput}>
                        <img src="images/add.png" className={styles.img + ' images-array'} alt="add" />
                    </button>
                            <ImgInput 
                                hidden={true}
                                alt="room" 
                                data={{src:'images/add.png'}} 
                                isOpen={this.state.inputOpen} 
                                uploadedImage={(image)=>{this.uploadedImage('imagesArray' ,image , false)}}
                                isEdit={false}
                                className="images-array"
                            />
                </li>
            </ul> 
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