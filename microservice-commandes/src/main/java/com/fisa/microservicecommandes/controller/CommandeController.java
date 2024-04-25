package com.fisa.microservicecommandes.controller;

import com.fisa.microservicecommandes.model.Commande;
import com.fisa.microservicecommandes.repository.CommandeRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "La commande ne peut pas être nulle");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
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
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Aucune commande n'a été trouvée");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
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
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Cette commande avec l'ID " + id + " n'existe pas");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}