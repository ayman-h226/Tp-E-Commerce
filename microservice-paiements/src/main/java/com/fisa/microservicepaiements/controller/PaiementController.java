package com.fisa.microservicepaiements.controller;

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
            return new ResponseEntity<>("Cette commande est déjà payée", HttpStatus.BAD_REQUEST);
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
            return new ResponseEntity<>("Aucun paiement n'a été trouvé", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listePaiements, HttpStatus.OK);
    }
}

