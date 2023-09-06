import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ContactForm from "./ContactForm";
import { css } from '@emotion/css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { UPDATE_CONTACT } from "../General/graphQlRequests";
import { useMutation } from "@apollo/client";


export default function Contact(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editContact, editcontact] = useMutation(UPDATE_CONTACT)
    const contact = { ...props.contact }
    const photo = "https://i.gifer.com/5zoL.gif"

    async function isFavoriteHandler(event) {
        event.preventDefault();
        let id = contact.id
        let isFavorite = contact.is_favorite == 1 ? 0 : 1;
        const data = {
            is_favorite: isFavorite,
        }
        if(contact.id){
            await editContact({ variables: {id, data} })
        }
        window.location.reload()
    };

    return (
        <div>
            <div className={css`
                    margin: 25px;
                    padding: 32px;
                    background-image: linear-gradient(180deg, #CEDEBD, #9EB384);
                    font-size: 24px;
                    border-radius: 20px;
                    width: 150px;
                    height: 150px;
                    `} >
                <div onClick={handleShow} className={css`&:hover {cursor: pointer;};`}>
                    <div>
                        <img src={photo} className={css`
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        border-radius: 50%;
                        max-width: 70%;
                        `}></img>
                    </div>
                    <div className={css`
                        text-align: center;
                        color: white;
                        font-size: 14px;
                        `}>
                        <h4>{contact?.first_name} {contact?.last_name}</h4>
                        <h4>+62 {contact?.phone}</h4>
                    </div>

                </div>
                
                {contact.is_favorite === 0 ? (
                <AiOutlineStar className={css`&:hover {cursor: pointer;}; margin: 0 0 0 40%;`} onClick={isFavoriteHandler}></AiOutlineStar>
                ) : (
                <AiFillStar className={css`&:hover {cursor: pointer;}; margin: 0 0 0 40%;`} onClick={isFavoriteHandler}></AiFillStar>
                )}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <ContactForm
                        close={handleClose}
                        viewOnly={true}
                        id={contact?.id}
                        firstName={contact?.first_name}
                        lastName={contact?.last_name}
                        address={contact?.address}
                        isFavorite={contact?.is_favorite}
                        phoneNumbers={contact?.phone}
                    ></ContactForm>
                </Modal.Body>
            </Modal>
        </div>
    )
}