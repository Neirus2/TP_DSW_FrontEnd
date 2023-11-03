import { Component } from '@angular/core';

@Component({
  selector: 'app-retrieve-pass',
  templateUrl: './retrieve-pass.component.html',
  styleUrls: ['./retrieve-pass.component.css']
})
export class RetrievePassComponent {
   constructor(){
   }
     email:String='';

   getUser(email:string){};
}
