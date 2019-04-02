import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class UploadService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "http://localhost:55912";
  }

  photoUpload(staffId: number | undefined, files: any | null | undefined): Observable<string | null> {
    let url_ = this.baseUrl + "/api/v1/Staffs/PhotoUpload?";
    if (staffId === null)
      throw new Error("The parameter 'staffId' cannot be null.");
    else if (staffId !== undefined)
      url_ += "staffId=" + encodeURIComponent("" + staffId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (files !== null && files !== undefined)
      content_.append("files", files);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processPhotoUpload(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processPhotoUpload(<any>response_);
        } catch (e) {
          return <Observable<string | null>><any>_observableThrow(e);
        }
      } else
        return <Observable<string | null>><any>_observableThrow(response_);
    }));
  }

  protected processPhotoUpload(response: HttpResponseBase): Observable<string | null> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
    if (status === 201) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result201: any = null;
        let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result201 = resultData201 !== undefined ? resultData201 : <any>null;
        return _observableOf(result201);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<string | null>(<any>null);


    function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
      if (result !== null && result !== undefined)
        return _observableThrow(result);
      else
        return;
    }

    function blobToText(blob: any): Observable<string> {
      return new Observable<string>((observer: any) => {
        if (!blob) {
          observer.next("");
          observer.complete();
        } else {
          let reader = new FileReader();
          reader.onload = event => {
            observer.next((<any>event.target).result);
            observer.complete();
          };
          reader.readAsText(blob);
        }
      });
    }
  }
}

