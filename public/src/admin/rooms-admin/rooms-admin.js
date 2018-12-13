import React from 'react';
import axios from 'axios';
import './rooms-admin.css';
import Modal from '../../modal/modal';
import RoomFormTemplate  from '../../modal/templates/rooms/room-form';
import DeleteTemplate from '../../modal/templates/delete/delete';

export default class RoomsAdmin extends React.Component {
    constructor(props){
        super(props);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.index = 0 ;
        this.state = {
          data : [],
          modalOpen : false , 
          modalData : {}
        }   
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        axios.get(`${this.props.config.apiUrl}/rooms`)
            .then(res =>{
                this.setState({data : res.data})
            })
    }

    setFormData(item){
        let data = new FormData();
        if(item._id) data.append('id' , item._id) ;
        data.append('title' , item.title);
        data.append('description' , item.description);
        data.append('lng' , item.lng === "undefined" ? 'en' : item.lng);
        typeof item.mainImage !== 'object' ? 
            data.append('mainImage' , item.mainImage) :  
            data.append('mainImage' , item.mainImage , item.mainImage.name);
        for(let i = 0 ; i < item.images.length ; i++){
            typeof item.images[i] !== 'object' ? 
                data.append('images' , item.images[i]) :
                data.append('images' , item.images[i] , item.images[i].name);
        }
        return data;
    }

    addItem(item){
        const data = this.setFormData(item);
        axios.post(`${this.props.config.apiUrl}/rooms` ,data )
         .then(res=>{
             this.setState({
                 data :[...this.state.data , res.data] 
             })
             this.hideModal();
         });
     }
 
     deleteItem( item){
         axios.delete(`${this.props.config.apiUrl}/rooms` ,{params:{room:item}})
            .then(res=>{
                this.state.data.splice(this.index , 1);
                this.setState({
                    data :this.state.data
                })
                this.hideModal();
            });
     }
 
     editItem(item){
        const data = this.setFormData(item);
        axios.put(`${this.props.config.apiUrl}/rooms` ,data  )
         .then(res=>{
             let data = this.state.data;
             data[this.index] = res.data;
            this.setState({
                data :data
            })
             this.hideModal();
         });
     }

    showModal(data , event , type , index){
        this.index = index;
        this.setState({
            modalOpen : true ,
            modalData : data , 
            modalType : type
        })
        event.preventDefault();
    }

    actions(action , data){
        switch(action){
            case "edit":
                return this.editItem(data , this.index)
            case "add":
               return this.addItem(data)
            case "delete":
               return this.deleteItem(data,this.index)
            default : return false;
        }
    }

    hideModal(){
        this.setState({
            modalOpen : false,
            modalData:{}
        })
    }

    render(){
        const baseModalDataObject = {title:""  , description:"" , lng:"en" ,mainImage:"" , images :[] };
        return (
            <div> 
                <h1> Welcome admin </h1>
                <button className="button success" onClick={(event)=>{this.showModal(baseModalDataObject , event , 'add',false)}}> Add +</button>
                <Modal show={this.state.modalOpen} type={this.state.modalType}  handleClose={this.hideModal} actions={(action , data)=>{this.actions(action , data)}} >
                    {
                        this.state.modalOpen && this.state.modalType  !== "delete" ? 
                        <RoomFormTemplate 
                            defaultImage={this.props.config.defaultImage} 
                            data={this.state.modalData} 
                            actions={this.modalActions}
                            type={this.state.modalType} 
                        />
                        :
                        <DeleteTemplate 
                            data={this.state.modalData} 
                            type={this.state.type} 
                        />
                    }
                </Modal>
                <div className="articles-container">
                    {this.state.data.map((item,index)=>{
                        return (
                            <div className="admin-item" key={item._id}>
                                <form encType="multipart">
                                    <h3> {item.title}</h3>
                                    <div className="admin-input">{item.description}</div>
                                    <img className="main-image" src={`${this.props.config.imagePath}/${item.mainImage}`} alt="room"/>
                                    <div className="images-wrapper">
                                       { item.images.map((img,i)=>{
                                           return(
                                               <img className="room-images" key={i} alt="room" src={`${this.props.config.imagePath}/${img}`} />
                                           )
                                        })}
                                    </div>
                                    <div className="flex form-button-wrraper">
                                        <button className="button danger" onClick={(event)=>{this.showModal(item , event , 'delete' ,index)}}> 
                                            delete 
                                            <i style={{paddingLeft:'0.5rem'}} className="fa fa-trash"></i>
                                        </button> 
                                        <button className="button edit" onClick={(event)=>{this.showModal(item , event , 'edit', index)}}> 
                                            edit
                                            <i style={{paddingLeft:'0.5rem'}} className="fa fa-edit"></i>
                                        </button> 
                                    </div>
                                </form>
                            </div>
                        )
                    })}
              </div>
            </div>
        )
    }
}