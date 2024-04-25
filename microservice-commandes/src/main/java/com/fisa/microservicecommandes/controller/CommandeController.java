package com.fisa.microservicecommandes.controller;

import com.fisa.microservicecommandes.model.Commande;
import com.fisa.microservicecommandes.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CommandeController {

    @Autowired
    CommandeRepository commandeRepository;

    @CrossOrigin
    @PostMapping("/api/commandes/ajouter")
    @ResponseBody
    public ResponseEntity<?> ajouterCommande(@RequestBody Commande commande) {
        if (commande == null) {
            return new ResponseEntity<>("La commande ne peut pas être nulle", HttpStatus.BAD_REQUEST);
        }

        Commande nouvelleCommande = commandeRepository.save(commande);

        return new ResponseEntity<>(nouvelleCommande, HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/api/commandes")
    @ResponseBody
    public ResponseEntity<?> commandes() {
        List<Commande> listeCommandes = commandeRepository.findAll();
        if (listeCommandes.isEmpty()) {
            return new ResponseEntity<>("Aucune commande n'a été trouvée", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listeCommandes, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/api/commandes/{id}")
    @ResponseBody
    public ResponseEntity<?> recupererUneCommande(@PathVariable("id") int id) {
        Optional<Commande> commande = commandeRepository.findById((long) id);
        if (commande.isPresent()) {
            return new ResponseEntity<>(commande.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cette commande avec l'ID " + id + " n'existe pas", HttpStatus.NOT_FOUND);
        }
    }
}