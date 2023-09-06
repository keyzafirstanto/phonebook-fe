import { gql } from '@apollo/client';
//this file contains the grphql quries and mutations we use for this project

const ADD_CONTACT = gql`
mutation Create($data: ContactCreateInput!) {
    create(data: $data) {
      first_name
      last_name
      address
      phone
    }
  }
  
`;

const UPDATE_CONTACT = gql`
mutation Update($id: String!, $data: ContactCreateInput!) {
  update(id: $id, data: $data) {
    first_name
    last_name
    address
    phone
  }
}

`;

const DELETE_CONTACT = gql`
mutation Delete($id: String!) {
    delete(id: $id){
      id
    }
  }
  
`;

const GET_CONTACTS = gql`
  query findAll($first_name: String)
  {
    findAll(first_name: $first_name) {
      id
      first_name
      last_name
      address
      is_favorite
      phone
    }
  }
  `;



export {DELETE_CONTACT,ADD_CONTACT,UPDATE_CONTACT, GET_CONTACTS}