import React from 'react'; 
import styles from'./img-input.css';
import Config from '../config'; 

export default class ImgInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.inputOpenFileRef = React.createRef()
        this.state  = {
            data : props.data.src , 
            preview : false , 
            isEdit : props.isEdit
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return  nextProps.isOpen ?   {isOpen :true}  : {isOpen :null} // <- this is setState equivalent
    }

    componentDidUpdate(prevProps, prevState){
        return this.props.isOpen ? this.inputOpenFileRef.current.click() :  null;
    }
    
    handleChange(event){
        let image = event.target.files[0];
        this.setState({
            data:  URL.createObjectURL(image),
            preview: true,
            isEdit:false
        });
        this.props.uploadedImage(image);
    }
    
    render(){
        return (
            <div className={this.props.hidden ? "img-upload " + styles.hidden : "img-upload"}>
                <label htmlFor={this.state.data || this.props.defaultImage}>
                    <img className={this.props.className} src={this.state.isEdit ? `${Config.imagePath}/${this.state.data}`: this.state.data || this.props.defaultImage} alt={this.props.alt}/>
                </label>
                <input ref={this.inputOpenFileRef} id={this.state.data || this.props.defaultImage} type="file" onChange={this.handleChange} />
            </div>
        )
    }
}