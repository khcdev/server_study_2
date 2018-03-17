'use strict'

const hat = require('hat');

/* Generate token for USER
 * store it into redis instance */
exports.generateUser = async (user, expire = 3600 * 12) => {
  const token = hat();
  //await client.hset(token, 'user', JSON.stringify(user));
  //await client.expire(token, expire);
  return token;
};

/* Gets user info stored in redis.
 * If not found, it will return undefined */
exports.getUser = async (token) => {
  //const user = await client.hget(token, 'user');
  //return JSON.parse(user);
};

/* Delete user session stored in redis instance */
exports.deleteUser = async (token) => {
  //await client.hdel(token, 'user');
};
