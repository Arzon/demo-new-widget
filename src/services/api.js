export default {
  async insertDocuments(url, basicToken, data) {
    const headers = new Headers({
      Authorization: `Basic ${basicToken}`
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data
    });
    return response;
  }
};
