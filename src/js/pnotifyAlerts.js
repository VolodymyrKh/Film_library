import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyButtons';

const alert = {
  pError(title = 'Oh No!', text = 'Something terrible happened.') {
    PNotify.error({
      title: `${title}`,
      text: `${text}`,
      stack: {
        dir1: 'down',
        dir2: 'left',
        firstpos1: 80,
        firstpos2: 35,
      },
    });
  },
  pSuccess(
    title = 'Success!',
    text = 'That thing that you were trying to do worked.',
  ) {
    PNotify.success({
      title: `${title}`,
      text: `${text}`,
      stack: {
        dir1: 'down',
        dir2: 'left',
        firstpos1: 80,
        firstpos2: 35,
      },
    });
  },
  pInfo(
    title = 'New Thing',
    text = 'Just to let you know, something happened.',
  ) {
    PNotify.info({
      title: `${title}`,
      text: `${text}`,
      delay: 2000,
      mouseReset: true,
      addClass: 'translucent',
      stack: {
        dir1: 'down',
        dir2: 'left',
        firstpos1: 80, // Position from the top right corner.
        firstpos2: 35, // 70px from the top, 35px from the right.
      },
    });
  },

  test() {
    console.log(`${Object.getOwnPropertyNames(this)} OK`);
  },
};

export default alert;
