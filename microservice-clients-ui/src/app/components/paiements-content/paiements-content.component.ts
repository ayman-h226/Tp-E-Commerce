import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MICROSERVICE_COMMANDES_API_URL, MICROSERVICE_PAIEMENTS_API_URL, MICROSERVICE_PRODUITS_API_URL } from 'src/app/constants';
export interface Produit {
  id: number;
  titre: string;
  description: string;
  image: string;
  prix: number;
}

export interface Commande {
  id: number
  productId: number;
  quantite: number;
  dateCommande?: Date;
  commandePayee: boolean;
}

export interface Paiement {
  id: number;
  idCommande: number;
  montant: number;
  numeroCarte: string;
}

/*const ELEMENT_DATA: Paiement[] = [
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
];*/

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

  paiements = [];
  commandes: Commande[] = [];
  produits = [];

  displayedColumns: string[] = ['idPaiement', 'idCommande', 'montant', 'numeroCarte'];
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

    fetch(MICROSERVICE_PRODUITS_API_URL+'/produits')
      .then(response => response.json())
      .then(data => {
        this.produits = data; // Stockage des données dans le tableau d'options
        console.log("Produits récupérées depuis l\'API :", data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données Produits depuis l\'API :', error);
      });
  }

  isProduit(obj: any): obj is Produit {
    return 'id' in obj && 'titre' in obj && 'description' in obj && 'image' in obj && 'prix' in obj;
  }

  onCommandeChange() {
    let selectedCommande = this.commandes.find((commande: Commande) => Number(this.idCommande) === commande.id);
    let quantite = selectedCommande?.quantite;

    if (quantite) {
      let concernedProduct: Produit | undefined | any = this.produits.find((produit: Produit) => Number(selectedCommande?.productId) === produit.id);

      if (this.isProduit(concernedProduct)) {
      this.montant = String(quantite * concernedProduct.prix);
      } else {
        console.error('Le produit concerné n\'est pas du type Produit.');
      }
    } else {
      console.error('Quantité non trouvée pour la commande sélectionnée.');
    }
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

        alert('Paiement enregistré avec succès !');
        console.log('Réponse du serveur:', data);
        // Réinitialiser le formulaire après l'envoi des données avec succès
        this.idCommande = '';
        this.montant = '';
        this.numeroCarte = '';
        
        window.location.reload()
      })
      .catch(error => {
        alert('Erreur lors de l\'enregistrement du paiement !');
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  }
}
