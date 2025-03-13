package com.example.demo.exceptions;

public class UnavailableNameException extends RuntimeException {
    public UnavailableNameException(String message) {
        super(message);
    }
}
