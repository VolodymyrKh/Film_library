import refs from './refs';
const btn = {
  offSidebar() {
    refs.sidebar.classList.add('hide');
  },
  onSidebar() {
    refs.sidebar.classList.remove('hide');
  },
  offLoadBtn() {
    refs.loadMoreBtn.classList.add('hide');
  },
  onLoadBtn() {
    refs.loadMoreBtn.classList.remove('hide');
  },
  offCloseBtn() {
    const markup = document.querySelectorAll('.close');
    console.log(markup);
    for (const li of markup) {
      li.classList.add('hide');
      console.log(li);
    }
  },
  onCloseBtn() {
    Array.from(refs.closeBtn).map(item => item.classList.remove('hide'));
  },
  onWatchBtn() {
    refs.sidebarWatchBtn.classList.add('active');
  },
  offWatchBtn() {
    refs.sidebarWatchBtn.classList.remove('active');
  },
  onQueueBtn() {
    refs.sidebarQueueBtn.classList.add('active');
  },
  offQueueBtn() {
    refs.sidebarQueueBtn.classList.remove('active');
  },
};

export default btn;
