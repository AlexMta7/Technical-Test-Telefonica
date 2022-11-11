package com.project.user.dao;

import com.project.user.models.Logs;

import java.util.List;

public interface LogDao {
    void register(Logs logs);

    List<Logs> getLogs();
}
