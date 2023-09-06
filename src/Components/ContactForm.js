import TextInput from "./TextInput"
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from "@apollo/client";
import { FiDelete, FiTrash2 } from "react-icons/fi";
import { useLazyQuery } from '@apollo/client';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "../General/graphQlRequests";
import { css } from '@emotion/css'


export default function ContactForm(props) {
    const [newContact, newcontact] = useMutation(ADD_CONTACT)
    const [editContact, editcontact] = useMutation(UPDATE_CONTACT)
    const [deleteContact, deletecontact] = useMutation(DELETE_CONTACT)
    const photo = "https://i.gifer.com/5zoL.gif"

    const [user, setUser] = useState({
        firstName:
        {
            name: "First Name",
            value: props.firstName || "",
            errors: [],
            validations: {
                required: true,
                minLength: 2,
                maxLength: 15
            }
        },
        lastName:
        {
            name: "Last Name",
            value: props.lastName || "",
            errors: [],
            validations: {
                required: true,
                minLength: 2,
                maxLength: 15
            }
        },
        address: {
            name: "address",
            value: props.address || "",
            errors: [],
            validations: {
                required: true
            }
        },
        phoneNumbers: {
            name: "phoneNumbers",
            value: props.phoneNumbers || "",
            errors: [],
            validations: {
                required: true
            }
        }
    })

    async function handleSubmit(event) {
        event.preventDefault();
        let canValidate = true
        for (const input in user) {
            const currInput = user[input]
            // currInput.errors = validate(currInput.name, currInput.value)
            if (currInput.errors.length !== 0) {
                canValidate = false
            }
        }
        if (canValidate) {
            const data = {
                first_name: user.firstName.value,
                last_name: user.lastName.value,
                phone: user.phoneNumbers.value,
                address: user.address.value,
            }
            if (props.id) {
                let id = props.id
                await editContact({ variables: {id, data} })
            } else {
                //this will handle create new contact
                await newContact({ variables: {data} })
            }
            window.location.reload()
        }
    };

    async function destroyContact(event) {
        event.preventDefault();
        if (props.id) {
            let id = props.id
            await deleteContact({ variables: {id} })
        }
        window.location.reload()
    };

    const handelChange = ({ target: { name, value } }) => {
        //this function updates the user input in our user state.
        user[name].value = value
        setUser({ ...user })
    }

    const addPhoneNumber = (e) => {
        user.phoneNumbers.value = e
        setUser({ ...user })
    }
    
    return (
        <>
            <div className={css`
                    position: fixed;
                    z-index: 100;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    top: 8%;
                    overflow: auto;
                    background-color: rgb(0,0,0);
                    background-color: rgba(0,0,0,0.4);
                    @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
                        top: 2%;
                    }
                    @media only screen and (min-device-width: 428px) and (max-device-height: 10000px) and (-webkit-device-pixel-ratio: 3) {
                        top: 1%;
                    }
                    `} >
                <div className={css` background-color: #fefefe;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                    border-radius: 30px;
                    background-color: #F6F4EB;
                    `}>
                    <h2 className={css`&:hover {cursor: pointer;};`} onClick={props.close}>X</h2>
                    <div>
                    <img src={photo} className={css`
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        border-radius: 50%;
                        max-width: 70%;
                        `}></img>
                    </div>
                    <div className={css`margin: 20px 20%; border-radius: 50%;`}>
                        <TextInput
                            handelChange={handelChange}
                            label={"First Name"}
                            type={"text"}
                            name={"firstName"}
                            error={user.firstName.errors}
                            placeholder="Add First Name"
                            value={user.firstName.value}>
                        </TextInput>
                    </div>
                    <div className={css`margin: 20px 20%; border-radius: 50%;`}>
                        <TextInput
                            handelChange={handelChange}
                            label={"Last Name"}
                            type={"text"}
                            name={"lastName"}
                            error={user.lastName.errors}
                            placeholder="Add Last Name"
                            value={user.lastName.value}>
                        </TextInput>
                    </div>
                    <div className={css`margin: 20px 20%; border-radius: 50%;`}>
                        <TextInput
                            handelChange={handelChange}
                            label={"Address"}
                            type={"text"}
                            name={"address"}
                            error={user.address.errors}
                            placeholder="Add Address"
                            value={user.address.value}>
                        </TextInput>
                    </div>
                    <div className={css`margin: 20px 2%; border-radius: 50%;`}>
                        <PhoneInput
                            onChange={addPhoneNumber}
                            country="id"
                            name={"phoneNumbers"}
                            onlyCountries={['id']}
                            value={user.phoneNumbers.value}
                            className={css`width: 30px;`}
                        />
                    </div>
                    <hr></hr>
                    <div className={css`display: flex;`}>
                        <div className={css`
                            width: 50px;  
                            background-color: #555555;
                            border: none;
                            color: white;
                            position: absolute;
                            right: 10%;
                            padding: 15px 32px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                            border-radius: 10px;
                            &:hover {
                                cursor: pointer;
                            };
                        `} type="submit" onClick={destroyContact}>
                            <FiTrash2></FiTrash2>
                        </div>
                        <div className={css`
                            width: 100px; 
                            background-color: #555555;
                            border: none;
                            color: white;
                            padding: 15px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 14px;
                            border-radius: 10px;
                            &:hover {
                                cursor: pointer;
                            };
                        `} onClick={handleSubmit}>
                            Save Details
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}