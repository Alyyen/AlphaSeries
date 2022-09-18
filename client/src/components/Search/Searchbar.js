import {Form,} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import DisplayResults from "./DisplayResults";

export default function Searchbar() {
    const [res, getRes] = useState('');
    const onFormChange = (e) => {
        e.preventDefault();
        let searchVal = document.querySelector("input[type=search]").value;
        let url = 'https://api.betaseries.com/search/all';

        axios.get(`${url}`,  {
            params: {
                client_id: process.env.REACT_APP_CLIENT_ID,
                query: searchVal
            }
        })
            .then((response) => {
                getRes(response.data.shows);
            })
            .catch(error => console.log(error));
    };

    if (res) {
        return (
            <div>
                <Form onChange={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Rechercher"
                        aria-label="Search"
                    />
                </Form>
                <DisplayResults results={res}/>
            </div>
        )
    } else {
        return (
            <div>
                <Form onChange={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Rechercher"
                        aria-label="Search"
                    />
                </Form>
            </div>
        )
    }

}