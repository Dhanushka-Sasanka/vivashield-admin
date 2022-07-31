package com.vivashield.service;

import com.vivashield.entity.Student;
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

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
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


}
