import React, { Component } from 'react'
import axios from "axios"

export default class ProductLow extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/product/" + this.props.match.params.name)
        .then(res=>{
            console.log(res.data)
            this.setState({productId:res.data._id})
            this.setState({name:res.data.name})
            this.setState({price:res.data.price})
            this.setState({start_date:res.data.start_date})
            this.setState({end_date:res.data.end_date})

           
           const getStartDate = res.data.start_date
            console.log(getStartDate.slice(0,10))
        const getEndDate = res.data.end_date
            const start_date = document.getElementById("start_date").textContent ="Start Date: " + getStartDate.slice(0,10)
            const end_date = document.getElementById("end_date").textContent = "End Date: " + getEndDate.slice(0,10)
            
        })
        .catch(err=>{
            console.log(err)
            this.props.history.push("/error")
        })
    }

    onPayClick = (event)=>{
        event.preventDefault()

        const makePayment = {
            productId:this.state.productId
        }

        console.log(JSON.stringify(makePayment.productId))
        
        axios.post("http://localhost:5000/payment/productlow", makePayment)
        .then(payment=>{
            window.open(payment.data)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    render() {
        const _id = this.state.productId
        const name = this.state.name
        const price = this.state.price

        return (
            <div>
            <form onSubmit={this.onPayClick}>
                <input type='hidden' name='productId' value={_id}></input>
                <h1>Product low</h1>
                <h5>Product: {name}</h5>
                <h5>Price: {price}</h5>
                <h5 id="start_date"></h5>
                <h5 id="end_date"></h5>
                <button type='submit'>Go to pay</button>
                </form>
            </div>
        )
    }
}
