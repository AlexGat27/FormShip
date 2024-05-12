import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent{
  @Input() isShipSubmenuOpen = false;
  @Input() isAssociationSubmenuOpen = false;

  toggleShipSubMenu(){
    this.isShipSubmenuOpen = !this.isShipSubmenuOpen;
  }

  toggleAssociationSubMenu(){
    this.isAssociationSubmenuOpen = !this.isAssociationSubmenuOpen;
  }
}
