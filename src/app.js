import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';


@inject(HttpClient)
export class App {

  list = [];
  indexedInfo = {};
  pageSize = 10;
  currentPage = 1;


  constructor(http) {
    this.message = 'Hello World!';
    this.http = http;
  }

  clicked(country) {
    let show = this.list.find((element) => {
      return element.alpha3_code === country.alpha3_code;
    });

    show.isLoaded = true;
  }

  rowSelected($event){


    console.log($event.detail.row.name);
  }

  activate() {
    return this.http.fetch('http://services.groupkt.com/country/get/all')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.list = data.RestResponse.result;
        this.list.forEach((item) => {
          item.isLoaded = false;
        });


      })
      .catch((error) => {
        alert(error);
      });
  }
}
