const hostUrl = 'http://192.241.217.245:5000/api/v1/';

const endPoints = {
  verifyBtn: 'verify/button',
  verify: 'verify',
  gift: 'gift'
};

export const verify = () => {
  return new Promise((resolve, reject) => {
    fetch(hostUrl + endPoints.verify, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => resolve(response))
    .catch(err => reject(err));
  });
}

export const verifyButton = () => {
  return new Promise((resolve, reject) => {
    fetch(hostUrl + endPoints.verifyBtn, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      body = String(response['_bodyText']);
      first = body.indexOf('http://');
      last = body.indexOf('\'\">');
      url = body.substring(first, last);
      resolve(url);
    })
    .catch(err => reject(err));
  });
}

export const gift = (card_number, pin, balance) => {
  body = {
    card_number,
    pin,
    balance
  };
  return new Promise((resolve, reject) => {
    fetch(hostUrl + endPoints.gift, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(response => response.json())
    .then(response => resolve(response))
    .catch(err => reject(err));
  });

}