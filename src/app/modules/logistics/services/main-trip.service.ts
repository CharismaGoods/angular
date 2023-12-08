import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MainTripService extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'logistics/main_trips');
  }
  addTrip(form: any) {
    return this.createEntity('', form);
  }
  getMainTrips() {
    return this.readEntities('');
  }
  getTrip(id: string) {
    return this.readEntity('', id);
  }
}
