import { Component, Input } from '@angular/core';
import { MICROSERVICE_PRODUITS_API_URL } from 'src/app/constants';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.css'],
  standalone: true
})
export class ProduitCardComponent {
  urlImage = 'https://imgs.search.brave.com/KDE6AiTdWWzf-shYL48pLQGVNb5nJklkAiMOfId1BDM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9zcHJpbmct/aWNvbi0yNTZ4MjU2/LTJlZnZrdmt5LnBu/Zw';

  @Input() titre: string = 'Card statique';
  @Input() image: string = this.urlImage;
  @Input() description: string = 'Histoire d\'avoir un aperçu sans avoir une bdd ou backend running.\n Donc la suppresion va pas marcher.';
  @Input() prix: string = '0';
  @Input() id: string = '';

  handleDeleteProduit() {
    fetch(MICROSERVICE_PRODUITS_API_URL+`/produits/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête.');
        }
        return response.json();
      })
      .then(data => {
        alert('Produit supprimé avec succès !');
        console.log('Réponse du serveur:', data);
        window.location.reload();
      })
      .catch(error => {
        alert('Erreur lors de la suppression du produit !');
        console.error('Erreur lors de la suppression du produit:', error);
      });
  }

}
