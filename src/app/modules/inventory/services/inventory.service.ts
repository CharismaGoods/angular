import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'src/core/services/crud.service';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { map } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class InventoryService extends CRUDService<Product> {
  constructor(http: HttpClient) {
    super(http, 'inventory');
  }
  getVariants(inventory_id: string) {
    return this.readEntity('inventory-variants', inventory_id);
  }
  getAllVariants() {
    return this.readEntities('variants');
  }
}
