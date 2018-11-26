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
  @ViewChild('picUl') picUl: ElementRef;
  @ViewChild('picLi') picLi: ElementRef;
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
    if (this.property && this.property.hasOwnProperty('listno')) {
      setTimeout(() => {
        this.getPropPics(this.property.listno);
        console.log(`this.property.listno = ${this.property.listno}`);
      }, 500);

    }
  }

  closeDialog() {
    const dialogRef = this.matDialog.closeAll();
    localStorage.removeItem('prop');
    this.canRender = false;
  }

  getProperty() {
    this.property = JSON.parse(localStorage.getItem('prop'));
  }

  sanitizePic(url): SafeHtml {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  getPropPics(listno) {
    console.log(`getPropPics()`);
    let tempArray = [];
    this.searchService.getMedia(listno).subscribe((pics) => {
      console.log(pics.data);
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
      if (this.pics.length > 0) {
        this.canRender = true;
        console.log(`this.canRender`);
      }
    });
    if (this.canRender) {
      this.setColNumsForPics();
    }
  }

  //set the number of grid-template-columns based on the number of pictures returned
  setColNumsForPics() {
    this.picUl.nativeElement.style.gridTemplateRows = `repeat(${Math.ceil(this.pics.length / 4)}, 1fr)`;
  }

}
