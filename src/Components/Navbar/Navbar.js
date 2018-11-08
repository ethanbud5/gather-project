import React, { Component } from 'react';
import {connect} from "react-redux";
import "./Navbar.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {checkView} from "./../../ducks/reducer";
import Modal from "react-modal";
import hamburger from "./../../images/hamburger-icon.svg";

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state ={
            showModal:false,
            pin:"",
            canvasserInfoView:false,
            name:"",
            phone:"",
            statusDiv:"",
            showNav: false
        }
        this.logoutUser = this.logoutUser.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openView = this.openView.bind(this);
        this.loginCanvasser = this.loginCanvasser.bind(this);
        this.submitCanvasserInfo = this.submitCanvasserInfo.bind(this);
        this.showNav = this.showNav.bind(this);
    }
    componentDidMount(){
        this.props.checkView();
        // axios.get("/api/view").then(res=>{
        //     this.setState({navbarView:res.data})
        // }).catch((err)=>alert(err))
    }
    logoutUser(){
        axios.delete("/api/logout").then(res=>{
            this.props.checkView()
            this.props.history.push("/")
        }).catch((err)=>alert(err))
    }
    checkActive(path){
        if(this.props.path === path){
            return " active_link";
        }
        else{
            return "";
        }
    }
    closeModal(){
        this.setState({
            showModal:false,
            canvasserInfoView:false,
            statusDiv:"",
            name:"",
            phone:"",
            pin:""
        }) 
    }
    openView(){
        this.setState({
            showModal:true,
            showNav:false
        })
    }
    inputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    loginCanvasser(){
        axios.post("/api/canvasser/login",{
            pin:this.state.pin
        }).then(res=>{
            this.setState({canvasserInfoView:true})
        }).catch(err=>{
            this.setState({
                statusDiv:"Invalid Pin",
                pin:""
        })
        })
    }
    submitCanvasserInfo(){
        axios.post("/api/canvasser/addinfo",{
            name:this.state.name,
            phone:this.state.phone
        }).then(res=>{
            // console.log(res.data)
            this.closeModal()
            this.props.checkView()
            this.setState({
                name:"",
                phone:""
            })
            this.props.history.push("/enter-profile")
        }).catch(err=>{
            alert(err)
        })
    }
    showNav(){
        this.setState({showNav:!this.state.showNav})
    }
    render() {

        //TODO: make it that when someone logs out that it will redirect to the right page
        if(this.props.navbarView === "landingPage"){
                // this.props.history.push("/")
            return (
                <div>
                    <Modal 
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    onRequestClose={this.closeModal}
                    className="modal_pin"
                    shouldCloseOnOverlayClick={false}
                    
                    >
                     <div onClick={this.closeModal} className="float_right_pin_module">X</div>   
                        {this.state.canvasserInfoView?
                        <div className="enter_pin_container">
                            <h2>
                                Enter Info
                              </h2>
                              <input type="text" placeholder="Name" value={this.state.name} name="name" onChange={(e)=>this.inputChange(e)}/>
                              <input type="tel" placeholder="Phone" value={this.state.phone} name="phone" onChange={(e)=>this.inputChange(e)}/>
                              <div className="info_container_btn">
                                  <button onClick={this.closeModal} className="gray_btn">Cancel</button>
                                  <button onClick={this.submitCanvasserInfo} className="gray_btn">Finish</button>
                              </div>
                              </div>
                              :
                              <div className="enter_pin_container">
                            <h2>
                                Enter Pin
                            </h2>
                            <input type="tel" name="pin" value={this.state.pin} className="enter_pin_input" onChange={(e)=>this.inputChange(e)}/>
                            <div className="input_pin_container">
                                <button onClick={this.loginCanvasser} className="login_canvasser_btn">Next</button>
                            </div>
                            <div className="pin_status_div">{this.state.statusDiv}</div>
                        </div>
                    }
                    </Modal>
                    <header>
                        <div className="nav_container">
                        <Link to="/"><h1 className="gather_logo">Gather</h1></Link>
                            <div className={this.state.showNav?"nav_links_container show_nav":"nav_links_container"}>
                                <Link to="/" className={"nav_links"+this.checkActive("/")}><span>Home</span></Link>
                                <Link to="/about" className={"nav_links"+this.checkActive("/about")}><span>About</span></Link>
                                <span className="nav_links" onClick={this.openView}>Join Campaign</span>
                                <button className="nav_btns logout_btn" onClick={()=>window.open(process.env.REACT_APP_SERVER+"/login","_self")}>Login/Signup</button>
                            </div>
                        </div>
                        <img onClick={this.showNav} className="hamburger" src={hamburger} alt="menu"/>
                    </header>
                </div>
            );
        }
        if(this.props.navbarView === "loggedIn"){
            // this.props.history.push("/campaigns")
            return (
                <div>
                    <header>
                        <div className="nav_container">
                        <Link to="/campaigns"><h1 className="gather_logo">Gather</h1></Link>
                            <div className={this.state.showNav?"nav_links_container show_nav":"nav_links_container"}>
                                <Link to="/campaigns" className={"nav_links"+this.checkActive("/campaigns")}><span>My Surveys</span></Link>
                                <Link to="/canvassers" className={"nav_links"+this.checkActive("/canvassers")}><span>My Canvassers</span></Link>
                                <button onClick={this.logoutUser} className="nav_btns logout_btn">Logout</button>
                            </div>
                        </div>
                        <img onClick={this.showNav} className="hamburger" src={hamburger} alt="menu"/>
                    </header>
                </div>
            );
        }
        if(this.props.navbarView === "canvasserView"){
            // this.props.history.push("/enter-profile")
            return (
                <div>
                    <header>
                        <div className="nav_container">
                        <Link to="/enter-profile"><h1 className="gather_logo">Gather</h1></Link>
                        <div className={this.state.showNav?"nav_links_container show_nav":"nav_links_container"}>
                            <Link to="/enter-profile" className={"nav_links"+this.checkActive("/enter-profile")}><span>Enter New Profile</span></Link>
                            <Link to="/recently_added" className={"nav_links"+this.checkActive("/recently-added")}><span>Recently Added</span></Link>
                            <button onClick={this.logoutUser} className="nav_btns logout_btn">Logout</button>
                        </div>
                        </div>
                        <img onClick={this.showNav} className="hamburger" src={hamburger} alt="menu"/>
                    </header>
                </div>
            );
        }
        if(this.props.navbarView === ""){
            // this.props.history.push("/enter-profile")
            return (
                <div>
                </div>
            );
        }
    }
}
function mapStateToProps(state){
    return{
        navbarView:state.navbarView
    }
}

export default connect(mapStateToProps,{checkView})(Navbar);