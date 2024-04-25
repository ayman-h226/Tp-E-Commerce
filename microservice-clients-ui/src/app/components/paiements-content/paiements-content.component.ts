import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MICROSERVICE_COMMANDES_API_URL, MICROSERVICE_PAIEMENTS_API_URL } from 'src/app/constants';
export interface PeriodicElement {
  idCommande: number;
  montant: number;
  numeroCarte: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {idCommande: 1, montant: 1.0079, numeroCarte: 'H'},
  {idCommande: 2, montant: 4.0026, numeroCarte: 'He'},
  {idCommande: 3, montant: 6.941, numeroCarte: 'Li'},
  {idCommande: 4, montant: 9.0122, numeroCarte: 'Be'},
  {idCommande: 5, montant: 10.811, numeroCarte: 'B'},
  {idCommande: 6, montant: 12.0107, numeroCarte: 'C'},
  {idCommande: 7, montant: 14.0067, numeroCarte: 'N'},
  {idCommande: 8, montant: 15.9994, numeroCarte: 'O'},
  {idCommande: 9, montant: 18.9984, numeroCarte: 'F'},
  {idCommande: 10, montant: 20.1797, numeroCarte: 'Ne'},
];

@Component({
  selector: 'app-paiements-content',
  templateUrl: './paiements-content.component.html',
  styleUrls: ['./paiements-content.component.css'],
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule, MatTableModule],
})
export class PaiementsContentComponent {
  isClickedToAdd: boolean = false;
  isClickedToSee: boolean = true;

  idCommande: string = '';
  montant: string = '';
  numeroCarte: string = '';

  paiements: any[] = [];
  commandes: any[] = [];

  displayedColumns: string[] = ['idCommande', 'montant', 'numeroCarte'];
  //dataSource: any[] = ELEMENT_DATA;
  dataSource: any[] = [];

  ngOnInit() {
    // Appel à votre API pour récupérer les données
    fetch(MICROSERVICE_PAIEMENTS_API_URL+'/paiements')
      .then(response => response.json())
      .then(data => {
        this.paiements = data;
        this.dataSource = data; // Stockage des données dans le tableau d'options
        console.log("Paiements récupérés depuis l\'API :", data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données paiements depuis l\'API :', error);
      });

    fetch(MICROSERVICE_COMMANDES_API_URL+'/commandes')
      .then(response => response.json())
      .then(data => {
        this.commandes = data; // Stockage des données dans le tableau d'options
        console.log("Commandes récupérées depuis l\'API :", data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données commandes depuis l\'API :', error);
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
      idCommande: this.idCommande,
      montant: this.montant,
      numeroCarte: this.numeroCarte,
    };

    fetch(MICROSERVICE_PAIEMENTS_API_URL+'/paiements/ajouter', {
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
        if (this.idCommande === '' || this.numeroCarte === ''){
          alert('Un des champs est vide');
          return;
        };

        alert('Produit enregistré avec succès !');
        console.log('Réponse du serveur:', data);
        // Réinitialiser le formulaire après l'envoi des données avec succès
        this.idCommande = '';
        this.montant = '';
        this.numeroCarte = '';
        
        window.location.reload()
      })
      .catch(error => {
        //alert('Erreur lors de l\'enregistrement du paiement !');
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  }
}
