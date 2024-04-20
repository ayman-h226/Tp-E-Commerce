package com.fisa.microservicepaiements.repository;

import com.fisa.microservicepaiements.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    Paiement findByIdCommande(int idCommande);
}
