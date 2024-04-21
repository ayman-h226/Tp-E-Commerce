package com.fisa.microservicepaiements;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroservicePaiementsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicePaiementsApplication.class, args);
	}

}
