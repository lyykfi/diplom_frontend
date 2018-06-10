import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService, Config } from 'app/config/config.service';

export interface Objects {
  name: string;
  object: string;
  image: string;
  mtl: string;
}

@Injectable()
export class ObjectsService {

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
  async add(name: string, object: string, image: string, mtl: string, mtlName: string) {
    const config: Config = await this.configService.getConfig();

    const result = this.http.post<Object>(config.basePath + config.objects, {
      name, object, image, mtl, mtl_name: mtlName,
    }, {}).toPromise();
  }

  /**
   *
   */
  async remove(id: string) {
    const config: Config = await this.configService.getConfig();

    return this.http.delete<Object>(config.basePath + config.objects + '/' + id, {}).toPromise();
  }

  /**
   *
   */
  async all() {
    const config: Config = await this.configService.getConfig();

    return this.http.get<Objects>(config.basePath + config.objects, {}).toPromise();
  }
}
