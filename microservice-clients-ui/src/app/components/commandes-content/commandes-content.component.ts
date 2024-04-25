import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MICROSERVICE_COMMANDES_API_URL, MICROSERVICE_PRODUITS_API_URL } from 'src/app/constants';

export interface PeriodicElement {
  productId: number;
  dateCommande: string;
  quantite: number;
  commandePayee: string;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
  {productId: 1, dateCommande: 'Hydrogen', quantite: 1.0079, commandePayee: 'H'},
  {productId: 2, dateCommande: 'Helium', quantite: 4.0026, commandePayee: 'He'},
  {productId: 3, dateCommande: 'Lithium', quantite: 6.941, commandePayee: 'Li'},
  {productId: 4, dateCommande: 'Beryllium', quantite: 9.0122, commandePayee: 'Be'},
  {productId: 5, dateCommande: 'Boron', quantite: 10.811, commandePayee: 'B'},
  {productId: 6, dateCommande: 'Carbon', quantite: 12.0107, commandePayee: 'C'},
  {productId: 7, dateCommande: 'Nitrogen', quantite: 14.0067, commandePayee: 'N'},
  {productId: 8, dateCommande: 'Oxygen', quantite: 15.9994, commandePayee: 'O'},
  {productId: 9, dateCommande: 'Fluorine', quantite: 18.9984, commandePayee: 'F'},
  {productId: 10, dateCommande: 'Neon', quantite: 20.1797, commandePayee: 'Ne'},
];*/

@Component({
  selector: 'app-commandes-content',
  templateUrl: './commandes-content.component.html',
  styleUrls: ['./commandes-content.component.css'],
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule, MatTableModule],
})
export class CommandesContentComponent {
  isClickedToAdd: boolean = false;
  isClickedToSee: boolean = true;

  productId: string = '';
  dateCommande: Date = new Date();
  quantite: string = '1';
  commandePayee: boolean = false;

  paiements: any[] = [];
  produits: any[] = [];

  displayedColumns: string[] = ['idCommande', 'productId', 'dateCommande', 'quantite', 'commandePayee'];
  //dataSource: any[] = ELEMENT_DATA;
  dataSource: any[] = [];

  ngOnInit() {
    // Appel à votre API pour récupérer les données
    fetch(MICROSERVICE_COMMANDES_API_URL+'/commandes')
      .then(response => response.json())
      .then(data => {
        this.paiements = data;
        this.dataSource = data; // Stockage des données dans le tableau d'options
        console.log("Paiements récupérées depuis l\'API :", data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données paiements depuis l\'API :', error);
      });

    fetch(MICROSERVICE_PRODUITS_API_URL+'/produits')
      .then(response => response.json())
      .then(data => {
        this.produits = data; // Stockage des données dans le tableau d'options
        console.log("Paiements récupérées depuis l\'API :", data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données paiements depuis l\'API :', error);
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
      productId: this.productId,
      dateCommande: this.dateCommande,
      quantite: this.quantite,
      commandePayee: this.commandePayee
    };

    fetch(MICROSERVICE_COMMANDES_API_URL+'/commandes/ajouter', {
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

        if (this.productId === '' || this.quantite === ''){
          alert('Un des champs est vide');
          return;
        };
        alert('Commande enregistrée avec succès !');
        console.log('Réponse du serveur:', data);
        // Réinitialiser le formulaire après l'envoi des données avec succès
        this.productId = '';
        this.dateCommande = new Date();
        this.quantite = '';
        this.commandePayee = false;

        window.location.reload()
      })
      .catch(error => {
        alert('Erreur lors de l\'enregistrement de la commade !');
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  }
}
