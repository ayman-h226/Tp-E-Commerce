package com.fisa.microservicepaiements.model;

public class Message {

    String message;

    public Message(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Message{" +
                "message='" + message + '\'' +
                '}';
    }
}
