package com.fisa.microserviceproduits.repository;

import com.fisa.microserviceproduits.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
