package sn.isep.diamniadio.config;

import static sn.isep.diamniadio.security.SecurityUtils.JWT_ALGORITHM;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import sn.isep.diamniadio.management.SecurityMetersService;

/**
 * Configuration for JWT generation and validation
 */
@Configuration
public class SecurityJwtConfiguration {

    //
    private static final Logger LOG = LoggerFactory.getLogger(SecurityJwtConfiguration.class);

    //recupere la cle secrete dans application.yml
    @Value("${jhipster.security.authentication.jwt.base64-secret}")
    private String jwtKey;

    //voir comment on decode le token JWT
    @Bean
    public JwtDecoder jwtDecoder(SecurityMetersService metersService) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(getSecretKey()).macAlgorithm(JWT_ALGORITHM).build();
        return token -> {
            try {
                return jwtDecoder.decode(token);
            } catch (Exception e) {
                if (e.getMessage().contains("Invalid signature")) {
                    metersService.trackTokenInvalidSignature();
                } else if (e.getMessage().contains("Jwt expired at")) {
                    metersService.trackTokenExpired();
                } else if (
                    e.getMessage().contains("Invalid JWT serialization") ||
                    e.getMessage().contains("Malformed token") ||
                    e.getMessage().contains("Invalid unsecured/JWS/JWE")
                ) {
                    metersService.trackTokenMalformed();
                } else {
                    LOG.error("Unknown JWT error {}", e.getMessage());
                }
                throw e;
            }
        };
    }

    //voir comment on genere le token JWT
    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));
    }

    //voir comment on genere la cle secrete
    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWT_ALGORITHM.getName());
    }
}
