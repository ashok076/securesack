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

export const city = async (access_token, lookupType) => {
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
