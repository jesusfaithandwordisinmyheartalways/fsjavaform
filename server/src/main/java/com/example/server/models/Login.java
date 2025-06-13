






package com.example.server.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "login")
public class Login {

    @Id
    private String id;

    private String email;
    private Date loginTime;

    public Login() {}

    public Login(String email, Date loginTime) {
        this.email = email;
        this.loginTime = loginTime;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Date getLoginTime() { return loginTime; }
    public void setLoginTime(Date loginTime) { this.loginTime = loginTime; }
}






