import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

interface CacheRecord {
  response: HttpResponse<any>;
  entryTime: number;
}

const MAX_CACHE_AGE = 30_000; // in ms

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache = new Map<string, CacheRecord>();

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    console.log(`getting ${req.urlWithParams} from cache`);
    const record = this.cache.get(req.urlWithParams);
    if (!record) {
      console.log('cache missed');
      return null;
    }
    const isExpired = Date.now() - record.entryTime > MAX_CACHE_AGE;
    console.log(isExpired ? 'cached response expired' : 'cache hit!');
    console.log(record);
    return isExpired ? null : record.response;
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const entry: CacheRecord = { response: res, entryTime: Date.now() };
    this.cache.set(req.urlWithParams, entry);
    console.log('putting into cache');
    console.log(entry);
    this.deleteExpiredCacheRecords();
  }

  private deleteExpiredCacheRecords() {
    this.cache.forEach((entry, url) => {
      if (Date.now() - entry.entryTime > MAX_CACHE_AGE) {
        this.cache.delete(url);
      }
    });
  }
}
