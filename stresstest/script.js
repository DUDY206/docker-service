import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 400 },
    { duration: '1m', target: 400 },
    { duration: '30s', target: 0 },
  ],
};

const getUrls = [
  // "https://s.api.overherd.xyz/user/invite-code",
  "https://s.api.overherd.xyz/post?page=1&perPage=10&type=newest&pullkey=",
  // "https://s.api.overherd.xyz/user/leaderboard?page=1&perPage=20&type=7&pullkey=",
  // "https://s.api.overherd.xyz/user/leaderboard?page=1&perPage=20&type=30&pullkey=",
  // "https://s.api.overherd.xyz/user/leaderboard/me?type=1",
  // "https://s.api.overherd.xyz/user/leaderboard/me?type=7",
  // "https://s.api.overherd.xyz/user/leaderboard/me?type=30",
];

function stresstest() {
  const requests = getUrls.map((url) => ({
    url,
    method: "GET",
    params: {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzMmE2ZTNCZjIxMDcwQ0I2QjIwMDU0ZTc4MUZBYzNFMzlENTk4MTE3IiwicHJpdnlJZCI6ImRpZDpwcml2eTpjbHlmbm4zdG4wNXFwMTAzbHhld2c3dnBjIiwidHlwZSI6ImFjY2Vzcy10b2tlbiIsImlhdCI6MTczOTQ0MTYyMiwiZXhwIjoxNzM5NDQxOTIyfQ.HT_pdLWGZbDjvaifOgw9ssJ5FXgE_VvIi7SFdKRIXhw",
      },
    },
  }));

  return http.batch(requests);
}

export default function () {
  const response = stresstest()
  response.map((res,index) => {
    check(res, { "status was 200": (r) => r.status == 200 });
  })

  sleep(1);
}

const domain = "https://s.api.overherd.xyz";

const token = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1BQk9IejFWWV9jQ01UTDYtaWN4TS1zcXNLM1hIZkJWbk1qT1psbkxHclkifQ.eyJzaWQiOiJjbTcwZTZkcG0wMzFkejlkeGthOW5kNHptIiwiaXNzIjoicHJpdnkuaW8iLCJpYXQiOjE3Mzk0Mjc0NTUsImF1ZCI6ImNseWRoaHRnZjBqbWllY3drcDF1ZnZpOGEiLCJzdWIiOiJkaWQ6cHJpdnk6Y2x5Zm5uM3RuMDVxcDEwM2x4ZXdnN3ZwYyIsImV4cCI6MTczOTQzMTA1NX0.7kxThkM2eH1V7ic87q7BwgF3pJvnajQo4ldGba7YHBDXXeBpN6gBB4L9BLjJVy8Z4HCs17mZNU2GS8MdlJn_yw";

const cookie =
  "_tt_enable_cookie=1; _ttp=tEK0UrYejUdMhY1K5hNNCT7fXTA.tt.1; _scid=0sIYTz15vajc0z_Qygf6bbXX1MvS7I9u; _ga=GA1.1.512621487.1737731224; _ScCbts=%5B%5D; _sctr=1%7C1739206800000; _ga_F4GNGW1RWL=GS1.1.1739415027.1.1.1739415053.0.0.0; _scid_r=7EIYTz15vajc0z_Qygf6bbXX1MvS7I9uhf8H2g; _ga_PNYX79JGHJ=GS1.1.1739427453.14.1.1739427454.0.0.0; mp_3c2e18ac7d5a2d7e6aec0781e6a9612b_mixpanel=%7B%22distinct_id%22%3A%20%220x08697c81b8116b0DF3F6064546BEcDfEe7a83Fa2%22%2C%22%24device_id%22%3A%20%2219498da30f850a-0e12608b4c55a4-4201551a-4c89c-19498da30f850a%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24user_id%22%3A%20%220x08697c81b8116b0DF3F6064546BEcDfEe7a83Fa2%22%7D; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzMmE2ZTNCZjIxMDcwQ0I2QjIwMDU0ZTc4MUZBYzNFMzlENTk4MTE3IiwicHJpdnlJZCI6ImRpZDpwcml2eTpjbHlmbm4zdG4wNXFwMTAzbHhld2c3dnBjIiwidHlwZSI6ImFjY2Vzcy10b2tlbiIsImlhdCI6MTczOTQyNzQ1NiwiZXhwIjoxNzM5NDI3NzU2fQ.fb0T_ttJKUUTff8VXUNGI0TNmeaG4ChQXeigDZgUDhA; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzMmE2ZTNCZjIxMDcwQ0I2QjIwMDU0ZTc4MUZBYzNFMzlENTk4MTE3IiwicHJpdnlJZCI6ImRpZDpwcml2eTpjbHlmbm4zdG4wNXFwMTAzbHhld2c3dnBjIiwidHlwZSI6InJlZnJlc2gtdG9rZW4iLCJpYXQiOjE3Mzk0Mjc0NTYsImV4cCI6MTczOTUxMzg1Nn0.DKBsKyNtT-HRar8gKZQeNspgfni83yH-JIknNgU6UEI";

function login() {
  const url = `${domain}/user/login`;
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
    Authorization: token,
    Connection: "keep-alive",
    "Content-Type": "application/json",
    Cookie: cookie,
    Origin: "https://s.overherd.xyz",
    Referer: "https://s.overherd.xyz/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
  };
  const payload = JSON.stringify({
    biconomyAddress: "0x32a6e3Bf21070CB6B20054e781FAc3E39D598117",
  });

  return http.post(url, payload, { headers: headers });
}