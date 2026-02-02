module.exports = (headers) => {
  const clean = { ...headers };
  const remove = [
    'host', 'connection', 'proxy-connection', 'proxy-authorization',
    'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto',
    'cf-connecting-ip', 'true-client-ip', 'x-real-ip'
  ];
  
  remove.forEach(key => delete clean[key.toLowerCase()]);
  return clean;
};
