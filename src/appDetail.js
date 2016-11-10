import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class AppDetail {

  vm = null;

  constructor(http) {
    console.log('AppDetail ctor called');
    this.http = http;
  }

  activate(params) {
    console.log('AppDetail activate called');

   return this.http.fetch(`http://services.groupkt.com/state/get/${params.alpha3_code}/all`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        this.vm = {name: params.name, totalStates: data.RestResponse.result.length}


      })
      .catch((error) => {
        alert(error);
      });

  }
}
