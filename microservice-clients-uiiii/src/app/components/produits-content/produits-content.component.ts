import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MICROSERVICE_PRODUITS_API_URL } from 'src/app/constants';
import { ProduitCardComponent } from '../produit-card/produit-card.component';

@Component({
  selector: 'app-produits-content',
  templateUrl: './produits-content.component.html',
  styleUrls: ['./produits-content.component.css'],
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule, ProduitCardComponent],
})
export class ProduitsContentComponent {
  isClickedToAdd: boolean = false;
  isClickedToSee: boolean = true;

  urlImage = 'https://imgs.search.brave.com/KDE6AiTdWWzf-shYL48pLQGVNb5nJklkAiMOfId1BDM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9zcHJpbmct/aWNvbi0yNTZ4MjU2/LTJlZnZrdmt5LnBu/Zw';


  titre: string = '';
  description: string = '';
  image: string = this.urlImage;
  prix: number = 0;

  produits: any[] =  [];

  constructor() { }

  ngOnInit() {
    // Appel à votre API pour récupérer les données
    fetch(MICROSERVICE_PRODUITS_API_URL+'/produits')
      .then(response => response.json())
      .then(data => {
        this.produits = data; // Stockage des données dans le tableau d'options
        console.log("Produits récupérées depuis l\'API :", data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données produits depuis l\'API :', error);
      });
  }

  handleIsClickedToAdd() {
    if(this.isClickedToSee) this.isClickedToSee = false;
    this.isClickedToAdd = true;
  }
  handleIsClickedToSee() {
    if(this.isClickedToAdd) this.isClickedToAdd = false;
    this.isClickedToSee = true;
  }

  onSubmit() {
    const formData = {
      titre: this.titre,
      description: this.description,
      image: this.image,
      prix: this.prix
    };

    fetch(MICROSERVICE_PRODUITS_API_URL+'/produits/ajouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête.');
        }
        return response.json();
      })
      .then(data => {
        alert('Produit enregistré avec succès !');
        console.log('Réponse du serveur:', data);
        // Réinitialiser le formulaire après l'envoi des données avec succès
        this.titre = '';
        this.description = '';
        this.image = '';
        this.prix = 0;
      })
      .catch(error => {
        alert('Erreur lors de l\'enregistrement du produit !');
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  }
}