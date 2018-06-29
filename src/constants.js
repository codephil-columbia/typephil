const get_api_url = function() {
  let api_url = "";
  const env = process.env.NODE_ENV;
  if(env === 'local' || env === 'development') {
    api_url = "http://localhost:5000";
  }
  else {
    api_url = "http://api.typephil.org";
  }
  return api_url;
}

export const api_url = get_api_url();
