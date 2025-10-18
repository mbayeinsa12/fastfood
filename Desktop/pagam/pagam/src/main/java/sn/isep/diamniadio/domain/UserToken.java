//package sn.isep.diamniadio.domain;
//import jakarta.persistence.*;
//import java.io.Serializable;
//import java.time.Instant;
///**
// * A user token.
// */
//@Entity
//@Table(name = "user_token")
//public class UserToken implements Serializable {
//    private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    //Ici on stocke la valeur du token
//    @Column(name = "token_value", nullable = false, unique = true)
//    private String tokenValue;
//    @Column(name = "expiry_date", nullable = false)
//    private Instant expiryDate;
//    public Long getId() {
//        return id;
//    }
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTokenValue() {
//        return tokenValue;
//}
//    public void setTokenValue(String tokenValue) {
//        this.tokenValue = tokenValue;
//    }
//    public Instant getExpiryDate() {
//        return expiryDate;
//    }
//    public void setExpiryDate(Instant expiryDate) {
//        this.expiryDate = expiryDate;
//    }
//}
