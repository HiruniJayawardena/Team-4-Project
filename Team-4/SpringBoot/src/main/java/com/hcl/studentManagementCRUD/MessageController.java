package com.hcl.studentManagementCRUD;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
	
	@GetMapping("/getMessage")
	public String getMessage() {
		return "Welcome to Student Management";
	}
}
