package com.vivashield.controller.template;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("view")
public class SessionViewController {

    /**
     * this method for render the index view
     * @return all-sessions.html
     */
    @RequestMapping("/sessions")
    public ModelAndView session() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("sessions/all-session/all-sessions");
        return modelAndView;

    }

    /**
     * this method for render the index view
     * @return new-session.html
     */
    @RequestMapping("/new-session")
    public ModelAndView newSession() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("sessions/new-session/new-session");
        return modelAndView;

    }
}
