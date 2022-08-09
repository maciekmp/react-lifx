const HOST = "https://api.lifx.com/v1/";

class Api {
  request(path, method, body) {
    return fetch(`${HOST}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }).then((r) => r.json());
  }
  get(path) {
    return this.request(path, "GET");
  }
  post(path) {
    return this.request(path, "POST");
  }
  put(path, options) {
    return this.request(path, "put", options);
  }
  lights() {
    return this.get("lights/all");
  }
  toggle(selector) {
    return this.post(`lights/${selector}/toggle`);
  }
  setState(selector, options) {
    return this.put(`lights/${selector}/state`, options);
  }
}

export default new Api();
