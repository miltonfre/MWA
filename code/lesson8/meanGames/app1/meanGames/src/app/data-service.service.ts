import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private baseURL = "http://localhost:3006/api/";
  constructor(private http: HttpClient) { }

  public getAll(apiUrl: string): Promise<unknown> {
    //1. Build URL
    const url: string = this.baseURL + apiUrl;
    //2.tell HTTP service to make a request
    //3. convert observable to a Promise
    //4. Convert the response to JSON
    //5. return response
    //6. Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotObject).catch(this.handleError);
  }


  public postOne(apiUrl: string, object: unknown): Promise<unknown> {
    
    const url: string = this.baseURL + apiUrl;
    console.log(url,object);
    return this.http.post(url, object).toPromise();//.then(this.gotObject).catch(this.handleError);
  }
  private gotObject(response: unknown): unknown {
    console.log(response);
    return response as unknown;
  }

  private handleError(error: unknown): unknown {
    return error;
  }
}
