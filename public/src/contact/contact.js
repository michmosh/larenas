import React from 'react';
import axios from 'axios';
import './contact.css';

export default class Contact extends React.Component {
    constructor(props){
        super(props);
        this.onChnageHandler = this.onChnageHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.whatsappUrl = `https://wa.me/${props.config.whatsappContact}?text=${this.props.config.whatsappTextMessage}` ;
        this.state = {
            mailSent : false,
            formControls:{
                name:'',
                email:'',
                message : ''
            }
            
        }
    }

    onChnageHandler(event){
        let controlName = event.target.name;
        let formControls = {...this.state.formControls};
        formControls[controlName] = event.target.value;
        this.setState({
            formControls :formControls
        })
    }

    handleSubmit(event){
        let mailObject = {
            name : this.state.formControls.name , 
            email : this.state.formControls.email , 
            message : this.state.formControls.message 
        }
        axios.post(`${this.props.config.apiUrl}/contacts/send-mail` ,mailObject)
            .then(res=>{
               this.setState({mailSent : true})
            })
        event.preventDefault();
    }

    validateForm(){

    }

    render(){
        return (
            <div className="form-container"> 
                { ! this.state.mailSent ?
                    <form onSubmit={this.handleSubmit}>
                        <h2>Send us an email</h2>
                        <label htmlFor="name"> Name:</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChnageHandler} placeholder="Name"/>
                        <label htmlFor="email"> Email:</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.onChnageHandler} placeholder="Email"/>
                        <label htmlFor="message"> Message:</label>
                        <textarea name="message" onChange={this.onChnageHandler} placeholder="Message"></textarea>
                        <button className="button peach-gradient" type="submit">Send</button>
                    </form>
                :
                    <h2>Thank You for youe email !!  we will contact you soon</h2>
                }
                <h2> Or contact us on whatsapp <a rel="noopener noreferrer" href={this.whatsappUrl} target="_blank"><i className="fa fa-whatsapp"></i></a></h2>
            </div>
        )
    }
}