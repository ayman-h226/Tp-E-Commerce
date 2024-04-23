import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommandesContentComponent } from 'src/app/components/commandes-content/commandes-content.component';
import { PaiementsContentComponent } from 'src/app/components/paiements-content/paiements-content.component';
import { ProduitsContentComponent } from 'src/app/components/produits-content/produits-content.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: true,
  imports: [
    MatTabsModule,
    ProduitsContentComponent,
    CommandesContentComponent,
    PaiementsContentComponent
  ],
})
export class HomepageComponent {

}
