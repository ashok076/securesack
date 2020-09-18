import axios from 'axios';
import {connect} from 'react-redux';

import {BASE_URL} from './api.types';

export const createOrUpdateRecord = async (
  datatype,
  recid,
  payload,
  access_token,
) => {
  return axios(`${BASE_URL}/data/${datatype}/${recid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const lookupType = async (access_token, lookupType) => {
  return axios(`${BASE_URL}/actions/lookup/${lookupType}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ` + access_token,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const viewRecords = async (datatype, recid, access_token) => {
  console.log('View Rec: ', datatype, recid, access_token);
  return axios(`${BASE_URL}/data/${datatype}/${recid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteRecords = async (datatype, recid, access_token) => {
  return axios(`${BASE_URL}/data/${datatype}/${recid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const archiveRecords = async (
  datatype,
  recid,
  access_token,
  payload,
) => {
  return axios(`${BASE_URL}/data/${datatype}/${recid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const addBusinessEntity = async (access_token, payload) => {
  return axios(`${BASE_URL}/data/RefBusinessEntity/__NEW__`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
    data: payload 
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};