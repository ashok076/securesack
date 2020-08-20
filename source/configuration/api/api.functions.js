import axios from 'axios';
import {connect} from 'react-redux';

import {BASE_URL} from './api.types';

const createOrUpdateRecord = async (datatype, recid, payload, props) => {
  console.log('Props: ', props);
  return axios(`${BASE_URL}/data/${datatype}/${recid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + userData.userData.access_token,
    },
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => error);
};

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(createOrUpdateRecord);
