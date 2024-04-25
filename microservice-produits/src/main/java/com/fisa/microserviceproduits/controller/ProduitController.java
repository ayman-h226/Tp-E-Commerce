package com.fisa.microserviceproduits.controller;

import com.fisa.microserviceproduits.model.Produit;
import com.fisa.microserviceproduits.repository.ProduitRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ProduitController {

    @Autowired
    ProduitRepository produitRepository;

    @CrossOrigin
    @PostMapping("/api/produits/ajouter")
    public ResponseEntity<?> ajouterProduit(@RequestBody Produit produit, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Erreur de validation: " + bindingResult.getAllErrors());
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

        if (produit == null) {
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Le produit ne peut pas être nul");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

        try {
            Produit nouveauProduit = produitRepository.save(produit);
            return new ResponseEntity<>(nouveauProduit, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Une erreur s'est produite lors de l'ajout du produit: " + e.getMessage());
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping("/api/produits")
    @ResponseBody
    public ResponseEntity<?> produits() {
        List<Produit> listeProduits = produitRepository.findAll();
        if (listeProduits.isEmpty()) {
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Aucun produit n'a été trouvé");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listeProduits, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/api/produits/{id}")
    @ResponseBody
    public ResponseEntity<?> getProduitById(@PathVariable("id") Long id) {
        Optional<Produit> produit = produitRepository.findById(id);
        if (produit.isPresent()) {
            return new ResponseEntity<>(produit.get(), HttpStatus.OK);
        } else {
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Le produit avec l'ID " + id + " n'existe pas");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @DeleteMapping("/api/produits/{id}")
    @ResponseBody
    public ResponseEntity<?> supprimerProduit(@PathVariable("id") Long id) {
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("message", "Le produit avec l'ID " + id + " a été supprimé avec succès");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            Map<String, String> mapMessage = new HashMap<>();
            mapMessage.put("error", "Le produit avec l'ID " + id + " n'existe pas");
            JSONObject message = new JSONObject(mapMessage);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }


}
