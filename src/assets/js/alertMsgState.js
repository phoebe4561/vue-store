import emitter from './emitter';

export default function (data, title) {
  if (data.success) {
    emitter.emit('push-msg', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    emitter.emit('push-msg', {
      style: 'danger',
      title: `${title}失敗`,
    });
  }
}
