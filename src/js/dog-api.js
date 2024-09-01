import axios from 'axios';

const BASE_URL = 'https://api.thedogapi.com/v1/';

axios.defaults.headers.common['x-api-key'] =
  'live_mcDuFxeVZpO9EvQv45cCpr4qcmawTITIgztpqW07JICIU32Tp67Mk1TeP4WmLXlg';

export function fetchBreads() {
  return axios
    .get(BASE_URL + 'breeds/')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
}

export function fetchBreedsWithId(id) {
  return axios
    .get(BASE_URL + `breeds/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
}

export function fetchImage(id) {
  return axios
    .get(BASE_URL + `images/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    });
}
