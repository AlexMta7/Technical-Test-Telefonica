package com.project.user.controllers.rest;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.user.dao.LogDao;
import com.project.user.models.documentModel;
import com.project.user.models.logModel;
import com.project.user.utils.JWTUtil;

@RestController
public class LogController {

    @Autowired
    private LogDao logDao;

    @Autowired
    private JWTUtil jwtUtil;

    /*
     * Create
     * Read
     * Update
     * Delete
     */

    // * Create
    // Crea un log si el usuario realiza una acción y está logueado
    @RequestMapping(value = "api/logs", method = RequestMethod.POST)
    public String addLog(@RequestBody logModel log, @RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) {
            return null;
        }
        LocalTime time = LocalTime.now();
        System.out.println(
                ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + time);
        System.out.println(
                ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
                        + LocalDateTime.now());
        log.setDate(LocalDateTime.now().toString());
        logDao.addLog(log);
        return "OK";
    }

    // * Read
    // Obtiene todos los documentos
    @RequestMapping(value = "api/logs", method = RequestMethod.GET)
    public List<documentModel> getDocs(@RequestHeader(value = "Authorization") String token) {
        if (!validateToken(token)) {
            return null;
        }
        return logDao.getLogs();
    }

    private boolean validateToken(String token) {
        String userID = jwtUtil.getKey(token);
        return userID != null;
    }
}
