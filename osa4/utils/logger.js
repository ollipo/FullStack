/* eslint-disable no-undef */
/* eslint-disable indent */
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
  }

  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(...params)
    }
  }

  module.exports = {
    info, error
  }