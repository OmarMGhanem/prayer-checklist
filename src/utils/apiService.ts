import axios from 'axios';
class apiService {
  getCites(city: string) {
    const url = 'https://prayertimes.date/api/docs/ajax/cities/';
    const fullUrl = url + city;
    try {
      const res = axios
        .request({
          baseURL: fullUrl,
          method: 'GET',
        })
        .then((res) => {
          if (res) return res;
        });
      return res;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

export default new apiService();
