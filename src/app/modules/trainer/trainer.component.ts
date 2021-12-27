import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

interface TrainerObject {
  username: string,
  pokemon: string[],
  id: number
}

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {

  currentUser: TrainerObject = JSON.parse(sessionStorage.getItem("currentUser") as string)

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    //Log out user if current user is not found
    if(!this.currentUser) {
      this.authService.logOutUser()
    }
  }

}
