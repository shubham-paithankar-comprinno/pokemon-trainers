import { Component, Input, OnInit } from '@angular/core';

interface TrainerObject {
  username: string,
  pokemon: string[],
  id: number
}

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent implements OnInit {

  @Input() currentUser?: TrainerObject
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
