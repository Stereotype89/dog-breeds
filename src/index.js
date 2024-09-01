import { fetchBreedsWithId } from './js/dog-api';
import { fetchBreads } from './js/dog-api';
import { fetchImage } from './js/dog-api';

const breedsList = document.querySelector('select.breed-select');
const wrap = document.querySelector('div.dog-info');
const loaderText = document.querySelector('.loader');
const error = document.querySelector('.error');
error.setAttribute('hidden', '');

async function createListBreads(fn) {
  let list = await fn();
  return list
    .map(breed => `<option value=${breed.id}>${breed.name}</option>`)
    .join('');
}

async function createMarkup() {
  const markup = await createListBreads(fetchBreads);

  breedsList.insertAdjacentHTML(
    'afterbegin',
    `<option value=''>Виберіть породу собаки</option>`
  );
  breedsList.insertAdjacentHTML('beforeend', markup);
  loaderText.setAttribute('hidden', '');
}
createMarkup();

async function createMarkupInfo(id) {
  const fetch = await fetchBreedsWithId(id);

  dogInfo.name = fetch.name;
  dogInfo.temperament = fetch.temperament;
  dogInfo.image = fetch.reference_image_id;
  dogInfo.life = fetch.life_span;
  dogInfo.weight = fetch.weight.metric;

  const imageUrl = await fetchImage(dogInfo.image);
  if (imageUrl === undefined) {
    error.removeAttribute('hidden', '');
    loaderText.setAttribute('hidden', '');
  }
  const htmlString = `<h1>${dogInfo.name}</h1><h1>Тривалість життя: ${dogInfo.life}</h1>
  <h1>Висота: ${dogInfo.weight} м.</h1><h3>Темперамент: ${dogInfo.temperament}</h3><img src="${imageUrl.url}" alt="">`;
  wrap.innerHTML = htmlString;
  loaderText.setAttribute('hidden', '');
  error.setAttribute('hidden', '');
}

let dogInfo = {
  life: 0,
  imageId: '',
  dogName: '',
  image: '',
  temperament: '',
  weight: 0,
  height: 0,
};

breedsList.addEventListener('change', evt => {
  loaderText.removeAttribute('hidden', '');
  wrap.innerHTML = '';

  return createMarkupInfo(evt.currentTarget.value);
});
