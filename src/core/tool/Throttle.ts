export default (func, timeInSec) => {
  let timeout = null;
  
  return (that, ...args) => {
    if (timeout != null) {
      return;
    }

    timeout = setTimeout(() => {
      clearTimeout(timeout)
      timeout = null;

      if (that) {
        func.call(that, ...args);
      }
    }, timeInSec * 1000);
  }
}