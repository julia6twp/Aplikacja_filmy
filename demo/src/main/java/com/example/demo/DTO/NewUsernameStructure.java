package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewUsernameStructure {
    String oldUsername;
    String newUsername;

    NewUsernameStructure(String oldUsername, String newUsername) {
        this.oldUsername = oldUsername;
        this.newUsername = newUsername;
    }
}
