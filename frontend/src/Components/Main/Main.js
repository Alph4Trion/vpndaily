import React, { Component } from 'react'
import "./Main.css"
import axios from "axios"

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {

        }

        axios.get("http://localhost:5000/main", { withCredentials:true })
        .then(ifUser=>{
            console.log(ifUser)
            if(ifUser.data==="not loggedin"){
                this.props.history.push("/")
            }else if(ifUser.data==="loggedin"){
                this.props.history.push("/main")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        axios.get("http://localhost:5000/", { withCredentials:true })
        .then(res=>{
            console.log(res)
            this.setState({email:res.data.email})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        const userEmail = this.state.email
        return (
            <div>
                Main page

                User that is logged in now is {userEmail}
            </div>
        )
    }
}
