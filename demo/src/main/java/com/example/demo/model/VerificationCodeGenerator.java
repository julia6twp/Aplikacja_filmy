package com.example.demo.model;

import java.util.Random;

public class VerificationCodeGenerator {
    public static String generate() {
        Random rand = new Random();
        int randomNum = rand.nextInt(900000) + 100000;
        return String.valueOf(randomNum);
    }
}
