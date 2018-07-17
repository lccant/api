const Seneca = require('seneca');
const Brakes = require('brakes');


/**
 * 服务方法调用
 * 
 * @param {any} opts 
 * @param {any} params 
 * @returns 返回服务调用结果
 */
function serviceCall(opts,params) {
  return new Promise((resolve, reject) => {
    let {controller, action } = params;
    Seneca().client({
      host: opts.Address,
      port: opts.Port
    })
    .act(`${controller}:${action}`,params,(err,response)=>{
      if(err){
        reject(err);
      }else{
        resolve(response);
      }
    })
  });
}

const brake = new Brakes(serviceCall, {
  statInterval: 2500,
  threshold: 0.5,
  circuitDuration: 15000,
  timeout: 500
});

// function healthCheckCall(foo){
//     return new Promise((resolve, reject) => {
//         //this will return 20% true, 80% false
//         // if (Math.random() > 0.8){
//         //     resolve('Health check success');
//         // } else {
//             reject('Health check failed');
//         // }
//     });
// }
//
// brake.healthCheck(healthCheckCall);

brake.on('snapshot', snapshot => {
  // console.log('Running at:', snapshot.stats.successful / snapshot.stats.total);
  // console.log(snapshot);
});

brake.on('circuitOpen', () => {
  console.log('----------Circuit Opened--------------');
});

brake.on('circuitClosed', () => {
  console.log('----------Circuit Closed--------------');
});

/**
 * 获取rpc返回值
 * 
 * @param {any} opts 
 * @returns 
 */
let getResponse = async(opts,params)=>{
  return new Promise((resolve,reject)=>{
    brake.exec(opts,params)
    .then((response) => {
      resolve(response);
    })
    .catch(err => {
      reject(err)
    });
  })
}


module.exports = {
  getResponse
}



