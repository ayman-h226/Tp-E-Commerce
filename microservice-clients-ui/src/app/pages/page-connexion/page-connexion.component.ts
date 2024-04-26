import { Component } from '@angular/core';

@Component({
  selector: 'app-page-connexion',
  templateUrl: './page-connexion.component.html',
  styleUrls: ['./page-connexion.component.css']
})
export class PageConnexionComponent {
  login: string = 'admin';
  password: string = 'admin';

  constructor() { }

  onSubmit() {
    const formData = {
      login: this.login,
      password: this.password
    };

    if (this.login === '' && this.password === '') {
      alert("Veuillez renseigner vos identifiants");
      return;
    }
    
    if (this.login === 'admin' && this.password === 'admin') {
      window.location.href = '/homepage';
      return;
    } else {
      alert("Identifants non valides :(");
      return;
    }
      
  }
}
