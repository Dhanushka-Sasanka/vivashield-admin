package com.vivashield.controller.api;

import com.vivashield.entity.Student;
import com.vivashield.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class StudentController {

    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/student")
    public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);

    }

    @GetMapping("/student")
    public ResponseEntity<List<Student>> getAllStudents() {
        return studentService.getAllStudents();
    }

    @DeleteMapping("/student/{sid}")
    public Map<String, Boolean> deleteStudent(@PathVariable("sid") Long sid) {
        return studentService.deleteStudent(sid);
    }

    @GetMapping("/student/{email}/{password}")
    public ResponseEntity<Student> searchStudent(@PathVariable("email") String email,
                                                 @PathVariable("password") String password) {
        return studentService.searchStudent(email , password);
    }

    @PatchMapping("/student/update-session")
    public Map<String, Boolean> updateStudentSession(@RequestBody Student student) {
        return studentService.updateStudentSession(student);
    }

    @PatchMapping("/student/updateHeadAway")
    public Map<String, Boolean> updateHeadAwayCount(@RequestBody Student student) {
        return studentService.updateHeadAwayCount(student);
    }

    @GetMapping("/student/{sid}")
    public ResponseEntity<Student> getStudentByID(@PathVariable("sid") Long sid) {
        return studentService.getStudentByID(sid);
    }
}

