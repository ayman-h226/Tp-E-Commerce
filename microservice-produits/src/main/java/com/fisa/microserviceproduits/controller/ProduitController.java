package com.fisa.microserviceproduits.controller;

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


    @PostMapping("/api/produits/ajouter")
    public ResponseEntity<?> ajouterProduit(@RequestBody Produit produit, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("Erreur de validation: " + bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        if (produit == null) {
            return new ResponseEntity<>("Le produit ne peut pas être nul", HttpStatus.BAD_REQUEST);
        }

        try {
            Produit nouveauProduit = produitRepository.save(produit);
            return new ResponseEntity<>(nouveauProduit, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Une erreur s'est produite lors de l'ajout du produit: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/api/produits")
    public ResponseEntity<?> produits() {
        List<Produit> listeProduits = produitRepository.findAll();
        if (listeProduits.isEmpty()) {
            return new ResponseEntity<>("Aucun produit n'a été trouvé", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listeProduits, HttpStatus.OK);
    }

    @GetMapping("/api/produits/{id}")
    public ResponseEntity<?> getProduitById(@PathVariable("id") Long id) {
        Optional<Produit> produit = produitRepository.findById(id);
        if (produit.isPresent()) {
            return new ResponseEntity<>(produit.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Le produit avec l'ID " + id + " n'existe pas", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/produits/{id}")
    public ResponseEntity<?> supprimerProduit(@PathVariable("id") Long id) {
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
            return new ResponseEntity<>("Le produit avec l'ID " + id + " a été supprimé avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Le produit avec l'ID " + id + " n'existe pas", HttpStatus.NOT_FOUND);
        }
    }


}
