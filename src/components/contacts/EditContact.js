import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        error: {}
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        if(name === '') {
            this.setState({error: {name: 'Name is required'}});
            return;
        }
        if(email === '') {
            this.setState({error: {email: 'Email is required'}});
            return;
        }
        if(phone === '') {
            this.setState({error: {phone: 'Phone is required'}});
            return;
        }

        const updContact = {
            name, email, phone
        }

        const {id} = this.props.match.params;
        const result = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

        dispatch({type: 'UPDATE', payload: result.data});

        // Clear state
        this.setState({
            name: '',
            email: '',
            phone: '',
            error: {}
        });

        this.props.history.push('/');
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value} );

    render() {
        const {name, email, phone, error} = this.state

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Contact</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup 
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={this.onChange}
                                        error={error.name}
                                    />        
                                    <TextInputGroup 
                                        label="Email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                    <TextInputGroup 
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={error.phone}
                                    />
                                    <input 
                                        type="submit" 
                                        className="btn btn-block btn-secondary"
                                        value="Update Contact"
                                    />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default EditContact;