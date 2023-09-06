import React from 'react'
import Contact from '../Components/Contact';
import { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { css } from '@emotion/css'
import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from '../General/graphQlRequests';


export default function PhoneBookMainPage() {
    const contactsInfo = JSON.parse(localStorage.getItem('contacts')) || []
    let [contacts, setContacts] = useState(contactsInfo);
    const [first_name, setFilteredContacts] = useState('');
    const { data, loading, error } = useQuery(GET_CONTACTS, {
        variables: { first_name },
    });
    
    const searchContacts = (e) => {
        if (e.target.value.length > 1){
            setFilteredContacts(e.target.value)
            if(data.findAll){
                setContacts(data.findAll);
            }
        }else{
            setContacts(contactsInfo);
        }
    }
    
    return (
        <div className={css`background-color: #96C291;`}>
            <NavBar search={searchContacts}></NavBar>
            <div className={css`
                color: #E4E4D0; 
                height: 400px;
                margin: 0 10%
            `}>
                <h1>Phone-book Simplified.</h1>
                <h5>The only phone-book app to sort out your priority. Call your favourites ones more quickly by tapping the star.</h5>
                <div className={css`border: 1px solid;`}></div>
            </div>
            <div className={css`
                margin: 0 auto; 
                display: -webkit-box; 
                position: relative; 
                overflow-x: scroll; 
                width: 90%;
                z-index: 10;
                @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
                    bottom: 35vh;
                }
                @media only screen and (min-device-width: 428px) and (max-device-height: 20000px) and (-webkit-device-pixel-ratio: 3) {
                    bottom: 11vh;
                }
                
            `}>
                {contacts.map((contact) => <Contact contact={contact} />)}
            </div>
            <div className={css`
                background-color: #FAF1E4;
                position: fixed;
                width: 100%;
                height: 70%;
                border-radius: 15%;
                z-index: 1;
                display: flow-root;
                @media only screen and (max-width: 600px) {
                    top: 46%;
                }
            `}></div>
            
        </div>

    )
}
