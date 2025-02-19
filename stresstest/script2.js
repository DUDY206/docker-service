const res = fetch("https://s.api.overherd.xyz/user/invite-code", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzMmE2ZTNCZjIxMDcwQ0I2QjIwMDU0ZTc4MUZBYzNFMzlENTk4MTE3IiwicHJpdnlJZCI6ImRpZDpwcml2eTpjbHlmbm4zdG4wNXFwMTAzbHhld2c3dnBjIiwidHlwZSI6ImFjY2Vzcy10b2tlbiIsImlhdCI6MTczOTQyNzQ1NiwiZXhwIjoxNzM5NDI3NzU2fQ.fb0T_ttJKUUTff8VXUNGI0TNmeaG4ChQXeigDZgUDhA",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://s.overherd.xyz/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then((res) => console.log({res: res})).catch((e) => console.log({e}));
