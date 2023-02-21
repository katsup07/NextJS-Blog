const { PHASE_DEVELOPMENT_SERVER} = require('next/constants');

module.exports = (phase) => { // https://nextjs.org/docs/api-reference/next.config.js/introduction
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      env: {
      mongodb_username: 'katsup07',
      mongodb_password: '2onvOaWQPmmzvid2',
      mongodb_cluster_name: 'cluster0-dev',
     }
    }
  }
  return {  
    env: {
    mongodb_username: 'katsup07',
    mongodb_password: '2onvOaWQPmmzvid2',
    mongodb_cluster_name: 'cluster0',
   }
 }
}