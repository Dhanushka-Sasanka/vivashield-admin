package com.vivashield.controller.api;

import com.vivashield.entity.Session;
import com.vivashield.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class SessionController {


    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/session")
    public ResponseEntity<Session> saveSession(@RequestBody Session session) {
        return sessionService.saveSession(session);

    }

    @GetMapping("/session")
    public ResponseEntity<List<Session>> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @DeleteMapping("/session/{sid}")
    public Map<String, Boolean> deleteSession(@PathVariable("sid") Long sid) {
        return sessionService.deleteSession(sid);
    }

    @GetMapping("/session/{sid}")
    public ResponseEntity<Session> searchSession(@PathVariable("sid") Long sid) {
        return sessionService.searchSession(sid);
    }
}