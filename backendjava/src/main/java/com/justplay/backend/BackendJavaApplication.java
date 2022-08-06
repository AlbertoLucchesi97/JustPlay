package com.justplay.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication()
public class BackendJavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendJavaApplication.class, args);
	}

}