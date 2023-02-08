export default (func, timeInSec) => {
  let timeout = null;
  return () => {
    if (timeout) {
      return;
    }

    timeout = setTimeout(() => {
      func.call(this);
      timeout = null;
    }, timeInSec * 1000);
  }
}