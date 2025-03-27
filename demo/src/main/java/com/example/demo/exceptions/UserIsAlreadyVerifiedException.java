package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserIsAlreadyVerifiedException extends RuntimeException {
    public UserIsAlreadyVerifiedException(String message) {
        super(message);
    }
}



