import React from 'react';
import axios from 'axios';
import './articles-admin.css';
import Modal from '../../modal/modal';
import ArticleFormTemplate  from '../../modal/templates/articles/articles-form';
import DeleteTemplate from '../../modal/templates/delete/delete';

export default class ArticlesAdmin extends React.Component {
    constructor(props){
        super(props);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        
        this.state = {
          data : [] , 
          modalOpen : false , 
          modalData : {}
        }   
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        axios.get(`${this.props.config.apiUrl}/articles`)
            .then(res =>{
                this.setState({data : res.data})
            })
    }

    addItem(item){
       axios.post(`${this.props.config.apiUrl}/articles` ,{article:item} )
        .then(res=>{
            this.setState({
                data :[...this.state.data , res.data] 
            })
            this.hideModal();
        });
    }

    deleteItem( item){
        axios.delete(`${this.props.config.apiUrl}/articles` ,{params:{article:item}} )
        .then(res=>{
            this.setChnagedArticle(res.data);
            this.hideModal();
        });
    }

    editItem(item ){
        axios.put(`${this.props.config.apiUrl}/articles` ,{article:item} )
        .then(res=>{
            this.setChnagedArticle(res.data);
            this.hideModal();
        });
    }

    

    setChnagedArticle(article){
        let newArray = this.state.data;
        newArray.map((el , index)=>{
            if(el._id === article._id && article.status !== "deleted"){
               newArray[index] = article;
                return this.setState({
                    data :newArray
                })
            }
            else if(el._id === article._id && article.status === "deleted"){
               newArray.splice(index ,1);
               return this.setState({
                    data :newArray
                })
            }
        })
    }

    showModal(data , event , type){
        this.setState({
            modalOpen : true ,
            modalData : data , 
            modalType : type
        })
        event.preventDefault();
    }

    hideModal(){
        this.setState({
            modalOpen : false
        })
    }

    toggleModal(){
        this.setState({
            modalOpen : !this.state.modalOpen
        })
    }

    actions(type , data){
        switch(type){
            case "edit":
                return this.editItem(data)
            case "add":
               return this.addItem(data)
            case "delete":
                return this.deleteItem(data)
            default : return false;
        }
    }
    

    render(){
        const baseModalDataObject = {title:"" , page:"" , body:"" , lng:"en"};
        return (
            <div> 
                <h1> Welcome admin </h1>
                <button className="button success" onClick={(event)=>{this.showModal(baseModalDataObject,event , 'add')}}> Add +</button>
                <Modal show={this.state.modalOpen} type={this.state.modalType}  handleClose={this.hideModal} actions={(action , data)=>{this.actions(action , data)}} >
                    {
                        this.state.modalType !== "delete" ? 
                        <ArticleFormTemplate data={this.state.modalData} actions={this.modalActions} />
                        :
                        <DeleteTemplate data={this.state.modalData} type={this.state.type} />
                    }
                </Modal>
                <div className="articles-container">
                    {this.state.data.map(item=>{
                        return (
                            <div className="admin-item" key={item._id}>
                                <form>
                                    <h3> {item.title}</h3>
                                    <h4>{item.page}</h4> 
                                    <div className="admin-input">{item.body}</div>
                                    <button className="button danger" onClick={(event)=>{this.showModal(item , event , 'delete')}}> 
                                        delete 
                                        <i style={{paddingLeft:'0.5rem'}} className="fa fa-trash"></i>
                                    </button> 
                                    <button className="button edit" onClick={(event)=>{this.showModal(item , event , 'edit')}}> 
                                        edit
                                        <i style={{paddingLeft:'0.5rem'}} className="fa fa-edit"></i>
                                    </button> 
                                </form>
                            </div>
                        )
                    })}
              </div>
            </div>
        )
    }
}