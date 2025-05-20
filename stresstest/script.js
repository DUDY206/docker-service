import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 1000 }, // Ramp-up to 10,000 VUs
    { duration: "2m", target: 1500 }, // Ramp-up to 10,000 VUs
    { duration: "2m", target: 1800 }, // Ramp-up to 10,000 VUs
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% requests should complete below 500ms
    http_req_failed: ["rate<0.01"], // Error rate should be less than 1%
  },
};

// Base URL of your API
const BASE_URL = "https://api-dev.overherd.xyz";

// Normalize weights for random selection
const endpoints = [
  {
    url: `${BASE_URL}/user/login`,
    weight: 9.093743217,
    method: "POST",
    body: JSON.stringify({
      biconomyAddress: "0xec491568Fac7410850fcB37EcF031c62760D08da",
    }),
  },
  { url: `${BASE_URL}/user/info`, weight: 9.809593339, method: "GET" },
  {
    url: `${BASE_URL}/post?page=1&perPage=10&type=hotest&lat=21.0231825&lon=105.7864812&locationType=nearby`,
    weight: 5.390974922,
    method: "GET",
  },
  {
    url: `${BASE_URL}/post?page=1&perPage=10&type=hotest&locationType=global`,
    weight: 2.518892682,
    method: "GET",
  },
  {
    url: `${BASE_URL}/user/leaderboard?page=1&perPage=20&type=1`,
    weight: 16.22185829,
    method: "GET",
  },
  {
    url: `${BASE_URL}/user/leaderboard/me?type=1`,
    weight: 7.705057122,
    method: "GET",
  },
  { url: `${BASE_URL}/common-config`, weight: 5.796255007, method: "GET" },
  { url: `${BASE_URL}/user/invite-code`, weight: 5.691284702, method: "GET" },
  { url: `${BASE_URL}/post/history`, weight: 4.804167242, method: "GET" },
  { url: `${BASE_URL}/notification`, weight: 0.8516011918, method: "GET" },
  { url: `${BASE_URL}/post/10434`, weight: 18.8492729, method: "GET" },
  {
    url: `${BASE_URL}/user/limit-user-actions`,
    weight: 6.336891537,
    method: "GET",
  },

  // will rate limit
  {
    url: `${BASE_URL}/user/location`,
    weight: 1.06075255,
    method: "PUT",
    body: JSON.stringify({ latitude: 21.0374161, longitude: 105.7901497 }),
  },
  // ignore
  // { url: `${BASE_URL}/user/register`, weight: 0.029, method: 'GET' },
  // unused
  // { url: `${BASE_URL}/user/energy`, weight: 0.143, method: 'GET' },
];

// Normalize weights for random selection
const totalWeight = endpoints.reduce((sum, e) => sum + e.weight, 0);
const normalizedEndpoints = endpoints.map((e) => ({
  url: e.url,
  weight: e.weight / totalWeight,
  method: e.method,
  body: e.body || null,
}));
const cumulativeWeights = [];
let sum = 0;
for (let e of normalizedEndpoints) {
  sum += e.weight;
  cumulativeWeights.push(sum);
}

// Function to select a random endpoint based on weights
function getRandomEndpoint() {
  const rand = Math.random();
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (rand <= cumulativeWeights[i]) {
      return normalizedEndpoints[i];
    }
  }
  return normalizedEndpoints[normalizedEndpoints.length - 1];
}

export default function () {
  // Simulate a user session
  const endpoint = getRandomEndpoint();

  // Define headers with cookies
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgyNmI1MDYyQTdBZTYxRkQzM2Y4QUNlMkRCQzRCYjZDMzk2NzU1MzIzIiwicHJpdnlJZCI6ImRpZDpwcml2eTpjbTI4bXpvZnQwNzZkYnBnbW4wMmdlaTRpIiwidHlwZSI6ImFjY2Vzcy10b2tlbiIsImlhdCI6MTc0NzEzMDMxMCwiZXhwIjoxNzQ3MTM1MzEwfQ.m5rB1tGjTlC2mSgShghN5H8eku4mS_PzagYzTmY5HFQ", // Replace with actual token or auth mechanism
  };

  // Send HTTP request based on method
  let res;
  if (endpoint.method === "POST") {
    res = http.post(endpoint.url, endpoint.body, { headers });
  } else if (endpoint.method === "PUT") {
    res = http.put(endpoint.url, endpoint.body, { headers });
  } else {
    res = http.get(endpoint.url, { headers });
  }

  // Check if the request was successful
  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  // Simulate think time
  // sleep(0.5); // 0.5 seconds between requests
}
