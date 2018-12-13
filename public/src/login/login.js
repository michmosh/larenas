import React from 'react';
import './login.css';
import Admin from '../admin/admin';
import axios from 'axios';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChnageHandler = this.onChnageHandler.bind(this);
        this.state = {
            isAuthenticated : false ,
            formControls : {
                email: '',
                password : ''
            }
           
        }
    }

    componentDidUpdate(props , old_props){
        
    }

    onChnageHandler(event){
        let controlName = event.target.name;
        let formControls = {...this.state.formControls};
        formControls[controlName] = event.target.value;
        this.setState({formControls:formControls});
    }

    handleSubmit(event){
        let userObject = {
            email:this.state.formControls.email , 
            password : this.state.formControls.password
        }
        axios.post(`${this.props.config.apiUrl}/login` ,userObject )
            .then(res=>{
                if(res.data === 'authenticated') this.setState({isAuthenticated : true})
            })
        event.preventDefault();
    }

    
    render(){
        return (
            <section>
                { !this.state.isAuthenticated ? 
                <div className="form-container"> 
                    <form onSubmit={this.handleSubmit}>
                        <h2>Login</h2>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" value={this.state.formControls.email} onChange={this.onChnageHandler} placeholder="Name"/>
                        <label htmlFor="password"> Password:</label>
                        <input type="text" name="password" value={this.state.formControls.password} onChange={this.onChnageHandler} placeholder="Email"/>
                        <button className="button peach-gradient" type="submit">Send</button>
                    </form>
                </div>
                :
                <Admin config={this.props.config}></Admin>
                }
            </section>
            
            
        )
    }
}