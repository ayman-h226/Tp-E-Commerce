package com.fisa.microservicepaiements.controller;

import com.fisa.microservicepaiements.model.Paiement;
import com.fisa.microservicepaiements.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class PaiementController {
    @Autowired
    PaiementRepository paiementRepository;

    @PostMapping("/api/paiement")
    public ResponseEntity<?> payerUneCommande(@RequestBody Paiement paiement) {
        // Vérifions s'il y a déjà un paiement enregistré pour cette commande
        Optional<Paiement> paiementExistant = Optional.ofNullable(paiementRepository.findByIdCommande(paiement.getIdCommande()));
        if (paiementExistant.isPresent()) {
            return new ResponseEntity<>("Cette commande est déjà payée", HttpStatus.BAD_REQUEST);
        }

        // Enregistrer le paiement
        Paiement nouveauPaiement = paiementRepository.save(paiement);

        // TODO Nous allons appeler le Microservice Commandes ici pour lui signifier que le paiement est accepté
        //On récupère la commande correspondant à ce paiement en faisant appel au Microservice commandes
        /**Optional<CommandeBean> commandeReq = microserviceCommandeProxy.recupererUneCommande(paiement.getIdCommande());

        //commandeReq.get() permet d'extraire l'objet de type CommandeBean de Optional
        CommandeBean commande = commandeReq.get();

        //on met à jour l'objet pour marquer la commande comme étant payée
        commande.setCommandePayee(true);

        //on envoi l'objet commande mis à jour au microservice commande afin de mettre à jour le status de la commande.
        microserviceCommandeProxy.updateCommande(commande);**/

        return new ResponseEntity<>(nouveauPaiement, HttpStatus.CREATED);
    }
}

