package com.vivashield.controller.template;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("view")
public class StudentViewController {
    /**
     * this method for render the index view
     * @return all-students.html
     */
    @RequestMapping("/students")
    public ModelAndView session() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("student/all-student/all-students");
        return modelAndView;

    }

    /**
     * this method for render the index view
     * @return new-session.html
     */
    @RequestMapping("/new-student")
    public ModelAndView newSession() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("student/new-student/new-student");
        return modelAndView;

    }

}
