import React from 'react'; 
import './modal.css'

export default class Modal extends React.Component{
    constructor(props){
        super(props);
        this.children = props.childern;
        this.handleClose = this.handleClose.bind(this);
        this.state = {
           show : props.show  , 
           modalClassName : "modal display-none"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show : nextProps.show
        })
    }
    
    componentDidUpdate(prevProps, prevState){
     if(prevState.show !== this.state.show){
       this.setModalClass()
     }
     
    }

    setModalClass(){
        this.setState({
            modalClassName : this.state.show ? "modal display-block" : "modal display-none"
        })
    }

    handleClose(event){
        this.props.handleClose(event);
    }

    modalActions(action , data){
       this.props.actions(action , data)
    }

  

    render(){
        return (
            <div className={this.state.modalClassName}>
            <section className={"modal-main " + this.props.type}>
              {
                  React.cloneElement(this.props.children , {
                      data : this.props.children.props.data,
                      type:this.props.type ,
                      handleClose : (event)=>{
                        this.handleClose(event)
                      },

                      modalActions:this.modalActions.bind(this)
                  })
              }
              <button className="modal-close" onClick={this.handleClose}>
                <i className="fa fa-close"></i>
              </button>
            </section>
          </div>
        )
    }
}