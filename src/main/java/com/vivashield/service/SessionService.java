package com.vivashield.service;

import com.vivashield.entity.Session;
import com.vivashield.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public ResponseEntity<Session> saveSession(Session session) {
        return new ResponseEntity<Session>(sessionRepository.save(session), HttpStatus.OK);

    }

    public ResponseEntity<List<Session>> getAllSessions() {
        return new ResponseEntity<>(sessionRepository.findAll(), HttpStatus.OK);

    }

    public ResponseEntity<Session> searchSession(Long sid) {
        if (sessionRepository.findById(sid).isPresent()) {
            return new ResponseEntity<Session>(sessionRepository.findById(sid).get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Session>(HttpStatus.NOT_FOUND);
        }

    }

    public Map<String, Boolean> deleteSession(Long sid) {
        Map<String, Boolean> map = new HashMap<>();
        if (sessionRepository.findById(sid).isPresent()) {
            sessionRepository.deleteById(sid);
            map.put("isDeleted", Boolean.TRUE);
            return map;
        }
        map.put("isDeleted", Boolean.FALSE);
        return map;
    }
}
