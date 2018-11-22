import {Injectable} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class SanitizeService {

  constructor(private sanitizer: DomSanitizer) { }



  sanitizeImgUrl(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}

