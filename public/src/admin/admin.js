import React from 'react';
import './admin.css';
import RoomsAdmin from './rooms-admin/rooms-admin';
import ArticlesAdmin from './articles-admin/articles-admin';
import GalleryAdmin from './gallery-admin/gallery-admin';
import BarAdmin from './bar-admin/bar-admin';
export default class Admin extends React.Component {
    constructor(props){
        super(props);
        this.getEditView = this.getEditView.bind(this);
        this.state = {
            data : [] , 
            editView : ''
        }   
    }

    validateForm(){

    }

    getEditView(view){
        this.setState({editView : view})
        this.switchView();
    }

    switchView(){
        switch(this.state.editView){
            case "rooms":
                return <RoomsAdmin config={this.props.config}  />;
            case 'articles' :
                return <ArticlesAdmin config={this.props.config} />;
            case 'gallery' :
                return <GalleryAdmin config={this.props.config} />;
            case 'bar' :
                return <BarAdmin config={this.props.config} />;
            default : return '';

        }
    }

    render(){
        return (
            <div className="admin-container"> 
               <div className="side-nav blueviolet">
                    <ul className="admin-nav">
                        <li onClick={()=>{this.getEditView('articles')}}>Articles</li>
                        <li onClick={()=>{this.getEditView('rooms')}}>Rooms</li>
                        <li onClick={()=>{this.getEditView('gallery')}}>Gallery</li>
                        <li onClick={()=>{this.getEditView('bar')}}>Bar & Restaurant</li>
                    </ul>
                </div>
               <div className="admin-wrapper">
                    {this.switchView()}
               </div>
            </div>
        )
    }
}