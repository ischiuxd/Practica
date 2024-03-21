import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: [number, boolean] | null = null;

  constructor() {}

  setItem(numero: number, booleano: boolean): void {
    this.cache = [numero, booleano];
  }

  getItem(): [number, boolean] | null {
    return this.cache;
  }

  clear(): void {
    this.cache = null;
  }
}
