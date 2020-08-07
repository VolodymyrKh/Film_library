import imagesLoaded from 'imagesloaded';
import lodash from 'lodash';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
//---------------------------------------------------
import imageCardTemplate from '../template/card.hbs';
import refs from './refs';
import myPnotify from './pnotifyAlerts';
import proxyElement from './proxyElemen';
//---------------------------------------------------
import reloadInt from './users/reloadInt';
import api from './api';
import button from './btn';

button.offSidebar();
button.offLoadBtn();
button.offCloseBtn();

refs.serchForm.addEventListener('submit', e => {
  button.onLoadBtn();
  api.currPage = 1;
  e.preventDefault();
  refs.cardList.innerHTML = '';
  const text = refs.textArea.value;
  reloadInt.showCardsByquery(text);
});

const movieId = api.getMovieIdFromLink();

if (movieId) {
  reloadInt.card(movieId);
} else {
  reloadInt.mainPage();
}
refs.library.addEventListener('click', () => {
  reloadInt.renderLibrary();
  button.onSidebar();
  button.onWatchBtn();
});

refs.loadMoreBtn.addEventListener('click', () => {
  reloadInt.showCardsByquery(refs.textArea.value);
});

refs.sidebarWatchBtn.addEventListener('click', () => {
  reloadInt.renderLibrary('watched');
  button.onWatchBtn();
  button.offQueueBtn();
});
refs.sidebarQueueBtn.addEventListener('click', () => {
  reloadInt.renderLibrary('queue');
  button.offWatchBtn();
  button.onQueueBtn();
});
