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
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const search = async (access_token, term) => {
  return axios(`${BASE_URL}/actions/lookup/records`, {
    method: 'GET',
    params: {
      term: term,
    },
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

export const changePassword = async (access_token, data) => {
  return axios(`${BASE_URL}/actions/accountprofile/changePassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const addTag = async (access_token, tags) => {
  return axios(`${BASE_URL}/actions/tags/addTag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
    tags,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const uploadFile = async (access_token, ldata) => {
  return axios(`${BASE_URL}/files/__NEW__`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + access_token,
      ldata,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const resetPasswordStepOne = async (data) => {
  console.log(data, 'email');
  return axios(`${BASE_URL}/actions/resetPassword/startReset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateTagImage = async (fileid, access_token, tags) => {
  console.log(fileid, 'id file', tags);
  return axios(`${BASE_URL}/files/${fileid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + access_token,
    },
    data: tags,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getAllCard = async (access_token) => {
  return axios(`${BASE_URL}/files/`, {
    method: 'Get',
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

export const deleteCardDetail = async (fileid, access_token) => {
  return axios(`${BASE_URL}/files/${fileid}`, {
    method: 'Delete',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
