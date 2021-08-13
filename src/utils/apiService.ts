import axios from 'axios';

class apiService {
  private endpoint = 'https://api.pray.zone/v2/times/'; // main api end point

  getCites(city: string) {
    const url = 'https://prayertimes.date/api/docs/ajax/cities/'; // note this is not the main endpoint
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

  getDayData(city: string) {
    const fullUrl = this.endpoint + 'today.json';
    let result;
    try {
      const res = axios.request({
        baseURL: fullUrl,
        method: 'GET',
        params: {
          city,
          school: 5,
          timeformat: 1,
        },
      });

      return res;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

export default new apiService();
