import {AfterViewInit, Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material";
import {SearchService} from "../../services/search.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('picUl') picUl: ElementRef;
  @ViewChild('picLi') picLi: ElementRef;
  property: any;
  pics: any[];

  constructor(private matDialog: MatDialog,
              private searchService: SearchService,
              private sanitizer: DomSanitizer) {
    this.getProperty();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPropPics(this.property.listno);
  }

  ngOnDestroy() {
    localStorage.removeItem('prop');
  }

  closeDialog() {
    this.matDialog.closeAll();
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
    this.searchService.getMedia(listno).subscribe(pics => {
      for (let i = 0; i < pics.data.length; i++) {
        let tempObj = {
          caption: '',
          url: ''
        };
        tempObj.caption = pics.data[i].caption;
        tempObj.url = pics.data[i].url;
        tempArray.push(tempObj);
      }
      this.pics = tempArray;
    });
    this.setColNumsForPics();
    console.log(this.pics);


  }

  //set the number of grid-template-columns based on the number of pictures returned
  setColNumsForPics() {
    if(this.pics) {
      this.picUl.nativeElement.style.gridTemplateRows = `repeat(${Math.ceil(this.pics.length / 4)}, 1fr)`;
    }
  }

}
