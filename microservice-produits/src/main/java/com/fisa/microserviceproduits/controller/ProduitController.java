package com.fisa.microserviceproduits.controller;

import com.fisa.microserviceproduits.model.Message;
import com.fisa.microserviceproduits.model.Produit;
import com.fisa.microserviceproduits.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProduitController {

    @Autowired
    ProduitRepository produitRepository;

    @CrossOrigin
    @PostMapping("/api/produits/ajouter")
    public ResponseEntity<?> ajouterProduit(@RequestBody Produit produit, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Message message = new Message("Erreur de validation: " + bindingResult.getAllErrors());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

        if (produit == null) {
            Message message = new Message("Le produit ne peut pas être nul");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

        try {
            Produit nouveauProduit = produitRepository.save(produit);
            return new ResponseEntity<>(nouveauProduit, HttpStatus.CREATED);
        } catch (Exception e) {
            Message message = new Message("Une erreur s'est produite lors de l'ajout du produit: " + e.getMessage());
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping("/api/produits")
    @ResponseBody
    public ResponseEntity<?> produits() {
        List<Produit> listeProduits = produitRepository.findAll();
        if (listeProduits.isEmpty()) {
            Message message = new Message("Aucun produit n'a été trouvé");
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
            Message message = new Message("Le produit avec l'ID " + id + " n'existe pas");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @DeleteMapping("/api/produits/{id}")
    @ResponseBody
    public ResponseEntity<?> supprimerProduit(@PathVariable("id") Long id) {
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
            Message message = new Message("Le produit avec l'ID " + id + " a été supprimé avec succès");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            Message message = new Message( "Le produit avec l'ID " + id + " n'existe pas");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }


}
