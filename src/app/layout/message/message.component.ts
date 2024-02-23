import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() showMessageTitle!: string;
  @Input() showMessageDescription!: string;
  @Input() showButton: boolean;

  constructor(private route: Router) {
    this.showMessageTitle = 'Nada foi encontrado';
    this.showMessageDescription = 'Tente realizar uma nova busca.';
    this.showButton = true;
  }

  redirectToHome(){
    this.route.navigate(['/inicio']);
  }

}
