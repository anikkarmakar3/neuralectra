import axios from 'axios';
import ApiConstants from './ApiConstants';

export async function getApi(url, header) {
  console.log('GetApi: ', `${ApiConstants.BASE_URL}/${url}`, 'Header', {
    Accept: header.Accept,
    'Content-Type': header.contenttype,

    // Authorization: 'Bearer' + ' ' + header.authorization,
  });
  return await axios.get(`${ApiConstants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,

      // Authorization: 'Bearer' + ' ' + header.authorization,
    },
  });
}

export async function getApiWithParam(url, param, header) {
  console.log(
    'getApiWithParam: ',
    `${ApiConstants.BASE_URL}/${`test.light`}/${url}`,
    param,
    header,
  );
  return await axios({
    method: 'GET',
    baseURL: ApiConstants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      //   'x-access-token': `${header.authorization}`,
    },
  });
}

export async function postApi(url, payload, header) {
  console.log('PostApi: ', `${ApiConstants.BASE_URL}/${url}`, payload, header);
  return await axios.post(`${ApiConstants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      //   'x-access-token': `${header.authorization}`,
      // Authorization: 'Bearer ' + header.authorization,
    },
  });
}
