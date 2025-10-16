
package sn.bdk.manssi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@SpringBootApplication
public class TodoApplication {
	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/v1/**")
						.allowedOrigins("http://localhost:5173","http://localhost:4200")
						.allowedMethods("GET","POST","PUT","PATCH", "DELETE", "OPTIONS")
						.allowedHeaders("Origin","Access-Control-Allow-Origin", "Content-Type", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With")
						.exposedHeaders("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization" , "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Filename")
						.allowCredentials(true).maxAge(3600);
			}
		};
	}
}


