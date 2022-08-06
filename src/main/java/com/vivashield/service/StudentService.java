package com.vivashield.service;

import com.vivashield.entity.Session;
import com.vivashield.entity.Student;
import com.vivashield.repository.SessionRepository;
import com.vivashield.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final SessionRepository sessionRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository, SessionRepository sessionRepository) {
        this.studentRepository = studentRepository;
        this.sessionRepository = sessionRepository;
    }

    public ResponseEntity<Student> saveStudent(Student student) {

        return new ResponseEntity<Student>(studentRepository.save(student), HttpStatus.OK);
    }

    public ResponseEntity<List<Student>> getAllStudents() {
        return new ResponseEntity<>(studentRepository.findAll(), HttpStatus.OK);
    }

    public Map<String, Boolean> deleteStudent(Long sid) {
        Map<String, Boolean> map = new HashMap<>();
        if (studentRepository.findById(sid).isPresent()) {
            studentRepository.deleteById(sid);
            map.put("isDeleted", Boolean.TRUE);
            return map;
        }
        map.put("isDeleted", Boolean.FALSE);
        return map;
    }

    public ResponseEntity<Student> searchStudent(String email , String password) {
        if (studentRepository.findByEmailAndPassword(email,password).isPresent()) {
            return new ResponseEntity<Student>(studentRepository.findByEmailAndPassword(email,password).get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
    }

    public Map<String, Boolean> updateStudentSession(Student student) {
        Map<String, Boolean> map = new HashMap<>();
        if (studentRepository.findById(student.getStudentID()).isPresent()) {

            Student student1 = studentRepository.findById(student.getStudentID()).get();
            Session session = sessionRepository.getOne(student.getSession().getSessionID());
            student1.setSession(session);
            studentRepository.save(student1);
            map.put("isUpdated", Boolean.TRUE);
            return map;
        }
        map.put("isUpdated", Boolean.FALSE);
        return map;
    }

    public Map<String, Boolean> updateHeadAwayCount(Student student) {

        Map<String, Boolean> map = new HashMap<>();
        if (studentRepository.findById(student.getStudentID()).isPresent()) {

            Student student1 = studentRepository.findById(student.getStudentID()).get();
            Session session = sessionRepository.getOne(student1.getSession().getSessionID());
            session.setAwayHeadCount(student.getSession().getAwayHeadCount());
            String allURls = session.getOpenTabUrls().concat(student.getSession().getOpenTabUrls());
            session.setOpenTabUrls(allURls);
            student1.setSession(session);
            studentRepository.save(student1);
            map.put("isUpdated", Boolean.TRUE);
            return map;
        }
        map.put("isUpdated", Boolean.FALSE);
        return map;
    }

    public ResponseEntity<Student>getStudentByID(Long sid) {
        if (studentRepository.findById(sid).isPresent()) {
            return new ResponseEntity<Student>(studentRepository.findById(sid).get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }

    }

}
