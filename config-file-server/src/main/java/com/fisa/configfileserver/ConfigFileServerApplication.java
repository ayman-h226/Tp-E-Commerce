package com.fisa.configfileserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
=======

@SpringBootApplication
>>>>>>> 02dbdef (add file-config-server)
public class ConfigFileServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigFileServerApplication.class, args);
	}

}
