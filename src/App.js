import './App.css';
import PhoneBookMainPage from './pages/PhoneBookMainPage';
import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from './General/graphQlRequests';
import { Circles } from 'react-loader-spinner'
import { css } from '@emotion/css'
import Modal from 'react-bootstrap/Modal';
import ContactForm from './Components/ContactForm';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from "react-icons/ai";

function App() {
  const first_name = '';
  const { data, loading, error } = useQuery(GET_CONTACTS, {
    variables: { first_name },
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (loading) return <Circles
    height="80"
    width="80"
    radius="9"
    color="black"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass='spinner'
  />

  if (error) return <h3>{error.message}</h3>

  const contacts = [...data.findAll]
  localStorage.setItem("contacts", JSON.stringify(contacts))
  //this saves the contacts that were sent by the server in the local storage
  
  return (
    <>
      <div>
        <div className='d-flex flex-column align-items-center'>
          <div>
            <PhoneBookMainPage></PhoneBookMainPage>
          </div>
          <div className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            z-index: 80;
            width: 100%;
            background-color: #94A684;
            bottom: 0;
            @media only screen and (max-width: 600px) {
              height: 50px;
          }
          `}>
            <div onClick={handleShow}>
                <AiFillPlusCircle className={css`height: 40px; width: 40px;`}></AiFillPlusCircle>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <ContactForm close={handleClose}></ContactForm>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default App;
