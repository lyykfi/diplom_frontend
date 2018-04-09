import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
    objects: string;
    images: string;
    basePath: string;
}

@Injectable()
export class ConfigService {
    loaded =  false;

    configUrl = 'assets/config.json';

    private config: Config | null = null;

    constructor(private http: HttpClient) { }

    async getConfig() {
        if (!this.loaded) {
            const config = await this.http.get<Config>(this.configUrl)
            .pipe(
              retry(3),
              catchError(this.handleError)
            ).toPromise();

            this.loaded = true;
            this.config = config;
        }

        return this.config;
    }

   private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return new ErrorObservable('Something bad happened; please try again later.');
    }
}
