package com.project.user.dao;

import java.util.List;

import com.project.user.models.documentModel;
import com.project.user.models.logModel;

public interface LogDao {

    logModel addLog(logModel log);

    List<documentModel> getLogs();

}