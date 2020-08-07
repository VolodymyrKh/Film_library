import refs from '../refs';
import cardTemplate from '../../template/card.hbs';
import mainPageTemplate from '../../template/main-page.hbs';
import similarMoviesTemplate from '../../template/similar-movies.hbs';
import api from '../api';
import localStorageJs from '../localStorageJS';
import button from '../btn';

const user1 = {
  mainPage() {
    api.getPopularFilms().then(data => {
      data.results.map(
        elem => (elem.release_date = elem.release_date.split('-')[0]),
      );
      // console.log(data.results);
      const markup = mainPageTemplate(data.results);
      refs.cardList.innerHTML = '';
      this.insertCardsToMainPage(markup);
      this.setOnclick();
      // console.log(data.results[0].release_date.split('-')[0]);
    });
  },
  card(id) {
    api.getInfoById(id).then(data => {
      button.offLoadBtn();
      // console.log(data);
      const markup = cardTemplate(data);
      // console.log(markup);
      this.insertCardToMain(markup);
      this.rerenderButtons();

      this.setOnclickAddWatch();
      this.setOnclickAddQueue();
      api.getSimilarMovies(id).then(data => {
        const similarMoviesMarkup = similarMoviesTemplate(data.results);
        this.insertSimilarMoviesToCard(similarMoviesMarkup);
        //console.log(similarMoviesMarkup);
        //console.log(data.results);
        $('.similarMovies').slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: true,
          variableWidth: true,
          // slidesToScroll: 4,
          centerPadding: '60px',
          arrows: true,
          autoplay: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ],
        });
      });

      // const similarMoviesMarkup = similarMoviesTemplate(obj);
      // console.log(similarMoviesMarkup);
      // console.log(obj.backdrop_path);
      //  this.insertSimilarMoviesToCard(similarMoviesMarkup);
    });
  },

  buildCartTemplate(item) {
    return cardTemplate(item);
  },

  buildSimilarMoviesTemplate(item) {
    return similarMoviesTemplate(item);
  },

  insertSimilarMoviesToCard(item) {
    refs.cardList.insertAdjacentHTML('beforeend', item);
  },

  insertCardToMain(item) {
    refs.cardList.innerHTML = '';
    refs.cardList.innerHTML = item;
    refs.textArea.hidden = true;
  },
  insertCardsToMainPage(items) {
    refs.cardList.insertAdjacentHTML('beforeend', items);
    // Array.from(document.querySelectorAll('.close')).map(item =>
    //   item.classList.remove('hide'),
    // );
  },
  showCardsByquery(query) {
    api.getMoviesByQuery(query).then(data => {
      data.results.map(
        elem => (elem.release_date = elem.release_date.split('-')[0]),
      );
      const markup = mainPageTemplate(data.results);
      this.insertCardsToMainPage(markup);
      this.setOnclick();
    });
  },
  setOnclick() {
    const markup = document.querySelectorAll('.itemCard');
    // console.log(markup);
    for (const li of markup) {
      li.addEventListener('click', e => {
        if (e.target.nodeName != 'A') {
          const id = e.currentTarget.dataset.movieid;
          this.card(id);
        }
      });
    }
  },
  setOnclickAddWatch() {
    const buttonAddWatch = document.querySelector('.btnAddWatch');
    //console.log(buttonAddWatch);
    buttonAddWatch.addEventListener('click', e => {
      const id = e.currentTarget.dataset.movieid;
      if (buttonAddWatch.dataset.action === 'add') {
        const saveData = localStorageJs.setWatchedMovieIdToLocalStorage;
        api
          .getInfoById(id)
          .then(saveData)
          .then(this.rerenderButtons);
      } else if (buttonAddWatch.dataset.action === 'remove') {
        api
          .getInfoById(id)
          .then(localStorageJs.deleteWatchedMovieIdFromLocalStorage)
          .then(this.rerenderButtons);
      }
      //getObj.then(console.log);
      // console.log(localStorageJs.getWatchedMovieIdToLocalStorage());
    });
  },
  rerenderButtons() {
    const buttonAddWatch = document.querySelector('.btnAddWatch');
    const buttonAddQueue = document.querySelector('.btnAddQueue');
    const watchedLS = localStorageJs.getWatchedMovieIdToLocalStorage();
    let isWatched = false;
    let isQueued = false;
    if (watchedLS) {
      isWatched = watchedLS.find(
        movie => movie.id === Number(buttonAddWatch.dataset.movieid),
      );
    }
    const queuedLS = localStorageJs.getQueueMovieIdToLocalStorage();
    if (queuedLS) {
      isQueued = queuedLS.find(
        movie => movie.id === Number(buttonAddQueue.dataset.movieid),
      );
    }
    // console.log(isWatched);

    if (isWatched) {
      buttonAddWatch.textContent = 'Remove from watched';
      buttonAddWatch.dataset.action = 'remove';
    } else {
      buttonAddWatch.textContent = 'Add to watched';
      buttonAddWatch.dataset.action = 'add';
    }

    if (isQueued) {
      buttonAddQueue.textContent = 'Remove from queue';
      buttonAddQueue.dataset.action = 'remove';
    } else {
      buttonAddQueue.textContent = 'Add to queue';
      buttonAddQueue.dataset.action = 'add';
    }
  },
  setOnclickAddQueue() {
    const buttonAddQueue = document.querySelector('.btnAddQueue');
    buttonAddQueue.addEventListener('click', e => {
      const id = e.currentTarget.dataset.movieid;
      if (buttonAddQueue.dataset.action === 'add') {
        const saveData = localStorageJs.setQueueMovieIdToLocalStorage;
        api
          .getInfoById(id)
          .then(saveData)
          .then(this.rerenderButtons);
      } else if (buttonAddQueue.dataset.action === 'remove') {
        api
          .getInfoById(id)
          .then(localStorageJs.deleteQueueMovieIdFromLocalStorage)
          .then(this.rerenderButtons);
      }
      //getObj.then(console.log);
      // console.log(localStorageJs.getWatchedMovieIdToLocalStorage());
    });
  },
  renderLibrary(type = 'watched') {
    button.offLoadBtn();
    let data = '';
    if (type === 'watched') {
      data = localStorageJs.getWatchedMovieIdToLocalStorage();
    } else if (type === 'queue') {
      data = localStorageJs.getQueueMovieIdToLocalStorage();
    }
    refs.textArea.hidden = true;
    refs.cardList.innerHTML = '';
    let markup = mainPageTemplate(data);
    this.insertCardsToMainPage(markup);
    this.setOnclick();

    Array.from(document.querySelectorAll('.close')).map(item => {
      item.classList.remove('hide');
      item.addEventListener('click', e => {
        e.preventDefault();
        const id = e.currentTarget.dataset.movieid;
        console.log(id);

        if (type === 'watched') {
          localStorageJs.deleteWatchedMovieIdFromLocalStorage(id);
          const child = e.currentTarget.parentNode;
          const parent = child.parentNode;
          parent.removeChild(child);
        } else if (type === 'queue') {
          localStorageJs.deleteQueueMovieIdFromLocalStorage(id);

          const child = e.currentTarget.parentNode;
          const parent = child.parentNode;
          parent.removeChild(child);
        }

        Array.from(document.querySelectorAll('.close')).map(item =>
          item.classList.remove('hide'),
        );
        // item.classList.remove('hide');
        // if (type === 'watched') {
        //   data = localStorageJs.getWatchedMovieIdToLocalStorage();
        // } else if (type === 'queue') {
        //   data = localStorageJs.getQueueMovieIdToLocalStorage();
        // }
        // refs.cardList.innerHTML = mainPageTemplate(data);
        // // const markup = mainPageTemplate(data);
        // // this.insertCardsToMainPage(markup);
      });
    });
  },
};

export default user1;
