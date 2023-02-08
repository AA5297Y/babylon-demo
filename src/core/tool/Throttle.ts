export default (func, timeInSec) => {
  let timeout = null;
  
  return (that, ...args) => {
    if (timeout != null) {
      return;
    }

    timeout = setTimeout(() => {
      timeout = null;
      func.call(that, ...args);
    }, timeInSec * 1000);
  }
}