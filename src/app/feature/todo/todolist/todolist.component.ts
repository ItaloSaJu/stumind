import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/shared/menu/menu.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    CdkDropList,
    NgFor,
    RouterLink,
  ],
})
export class TodolistComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  onCheckboxChange(event : any){
    console.log(event.detail.checked);
    

  }

}
