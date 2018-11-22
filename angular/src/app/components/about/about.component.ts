import { Component, OnInit } from "@angular/core";
import {PropertyComponent} from "../property/property.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public overlay: Overlay
  ) {}

  ngOnInit() {}

  opeDialog() {
    const dialogRef = this.dialog.open(PropertyComponent, {
      width: '600px',
      height: '600px'
    });
  }
}
