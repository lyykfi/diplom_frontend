import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService, Config } from 'app/config/config.service';

export interface Images {
  name: string;
  image: string;
}

/**
 *
 */
@Injectable()
export class ImagesService {

  /**
   *
   * @param http
   * @param configService
   */
  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  /**
   *
   * @param name
   * @param object
   * @param preview
   */
  async add(name: string, image: string) {
    const config: Config = await this.configService.getConfig();

    const result = this.http.post<Object>(config.basePath + config.images, {
      name, image
    }, {}).toPromise();
  }

  /**
   *
   */
  async remove(id: string) {
    const config: Config = await this.configService.getConfig();

    return this.http.delete<Object>(config.basePath + config.images + '/' + id, {}).toPromise();
  }

  /**
   *
   */
  async all() {
    const config: Config = await this.configService.getConfig();

    return this.http.get<Images>(config.basePath + config.images, {}).toPromise();
  }
}
