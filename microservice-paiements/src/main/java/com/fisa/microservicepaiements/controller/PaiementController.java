package com.fisa.microservicepaiements.controller;

import com.fisa.microservicepaiements.model.Message;
import com.fisa.microservicepaiements.model.Paiement;
import com.fisa.microservicepaiements.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PaiementController {
    @Autowired
    PaiementRepository paiementRepository;

    @CrossOrigin
    @PostMapping("/api/paiements/ajouter")
    @ResponseBody
    public ResponseEntity<?> payerUneCommande(@RequestBody Paiement paiement) {
        // Vérifions s'il y a déjà un paiement enregistré pour cette commande
        Optional<Paiement> paiementExistant = Optional.ofNullable(paiementRepository.findByIdCommande(paiement.getIdCommande()));
        if (paiementExistant.isPresent()) {
            Message message =  new Message("Cette commande est déjà payée");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

        // Enregistrer le paiement
        Paiement nouveauPaiement = paiementRepository.save(paiement);

        return new ResponseEntity<>(nouveauPaiement, HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/api/paiements")
    @ResponseBody
    public ResponseEntity<?> commandes() {
        List<Paiement> listePaiements = paiementRepository.findAll();
        if (listePaiements.isEmpty()) {
            Message message = new Message("Aucun paiement n'a été trouvé");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listePaiements, HttpStatus.OK);
    }
}

