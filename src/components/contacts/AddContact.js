import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        error: {}
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        if(name === '') {
            this.setState({error: {name: 'Name is required'}});
            return;
        }
        if(phone === '') {
            this.setState({error: {Phone: 'Phone is required'}});
            return;
        }

        const newContact = {
            name, email, phone
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
        dispatch({type: 'ADD', payload: res.data});

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
                                <h4>Add Contact</h4>
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
                                        value="Add Contact"
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

export default AddContact;