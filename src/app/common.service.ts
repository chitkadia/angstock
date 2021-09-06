import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private baseUrl: string = "http://api.tarakkadia.co.in/";
    private headerData: HttpHeaders;
    private authKey = localStorage.getItem("X-Auth-Token");

    constructor(private http: HttpClient) {
        if (this.authKey) {
            this.headerData = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'X-APP-Source': 'WEB_APP',
                'Accept': 'application/json',
                'X-Authorization-Token': this.authKey
            });
        } else {
            this.headerData = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'X-APP-Source': 'WEB_APP',
                'Accept': 'application/json',
            });
        }
    }

    /**
     * Function is used to make Get request.
     * @param uriSegment,Mix,Last two segment of URL
     *
     * @return Json,Json Object,Data from server
     */
    makeGetRequest(uriSegment: string): Observable<any> {
        let passHeaders = this.headerData;
        return this.http.get<any>(this.baseUrl + uriSegment, { headers: passHeaders }).pipe(
            map((resp: any) => {
                return resp;
            }),
            catchError((err: HttpErrorResponse) => {
                return throwError(err);
            })
        );
    }

    /**
     * Function is used to make Get request.
     * @param uriSegment,Mix,Last two segment of URL
     *
     * @return Json,Json Object,Data from server
     */
     makePublicGetRequest(uriSegment: string, payload: any): Observable<any> {
        let passHeaders = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            'X-APP-Source': 'WEB_APP',
            'Accept': 'application/json',
            'data': payload
        });
        return this.http.get<any>(this.baseUrl + uriSegment, { headers: passHeaders }).pipe(
            map((resp: any) => {
                return resp;
            }),
            catchError((err: HttpErrorResponse) => {
                return throwError(err);
            })
        );
    }

    /**
     * Function is used to make POST request.
     * @param uriSegment,Mix,Last two segment of URL
     * @param data,json object,To send post data.
     *
     * @return Json,Json Object,Data from server
     */
    makePostRequest(uriSegment: string, data: any) {
        return this.http.post<any>(uriSegment, data).pipe(
            map((resp: any) => {
                let { data } = resp;
                return data;
            }),
            catchError((err: HttpErrorResponse) => {
                return throwError(err);
            })
        );
    }

    /**
     * Function is used to make API call for login request
     *
     * @param uriSegment,Mix,last two segment of URL.
     * @param headers,Json Object, contains username or email and password
     *
     * @return Json object,Json Object,containing error or success details.
     */
    setRequestHeader(uriSegment: string, headers: any) {
        let headerData = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            'X-APP-Source': 'WEB_APP',
            'Accept': 'application/json',
            'Authorization': "Basic " + headers

        });
        return this.http.get(this.baseUrl + uriSegment, { headers: headerData });
    }
}
