import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from "@angular/material";
import {SearchService} from "../../services/search.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, AfterViewInit {
@ViewChild('picUl')picUl: ElementRef;
@ViewChild('picLi')picLi: ElementRef;
  property: any;
  pics: any[];
  canRender: boolean = false;

  constructor(private matDialog: MatDialog,
              private searchService: SearchService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getProperty();
  }

  ngAfterViewInit() {
    if(this.property && this.property.hasOwnProperty('listno')){
      this.getPropPics(this.property.listno);
    }
  }

  closeDialog() {
    const dialogRef = this.matDialog.closeAll();
    localStorage.removeItem('prop');
  }

  getProperty() {
    this.property = JSON.parse(localStorage.getItem('prop'));
  }

  sanitizePic(url): SafeHtml {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  getPropPics(listno) {
    let tempArray = [];
    this.searchService.getMedia(listno).subscribe((pics) => {
      for(let i =0; i< pics.results.results.length; i++){
        let tempObj = {
          caption: '',
          url: ''
        };
        tempObj.caption = pics.results.results[i].caption;
        tempObj.url = pics.results.results[i].url;
        tempArray.push(tempObj);
      }
      this.pics = tempArray;
      if(this.pics.length > 0) {
        this.canRender = true;
      }
    });
    if(this.canRender){
      this.setColNumsForPics();
    }
  }
  // openDialog(): void {
  //   const dialogRef = this.matDialog.open(PropertyComponent, {
  //     width: '80vw',
  //     height: '80vh',
  //     panelClass: 'property-panel'
  //   });
  // }

  setColNumsForPics() {
    this.picUl.nativeElement.style.gridTemplateRows = `repeat(${Math.ceil(this.pics.length / 4)}, 1fr)`;
  }

}
