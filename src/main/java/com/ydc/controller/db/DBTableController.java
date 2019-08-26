package com.ydc.controller.db;

import com.fate.controller.BaseController;
import com.ydc.model.db.DBTable;
import com.ydc.service.db.DBTableService;
import com.ydc.util.JsonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/table")
public class DBTableController extends BaseController {

    @Resource(name = "dbTableService")
    private DBTableService dbTableService;

    @RequestMapping(value = "/queryTable.do")
    public void queryTable(HttpServletRequest request, HttpServletResponse response) {
        List<String> list = dbTableService.queryTables();
        String json = JsonUtil.list2json(list);
        writeJson(response, json);
    }

    @RequestMapping(value = "/queryTableInfo.do")
    public void queryTableInfo(HttpServletRequest request, HttpServletResponse response) {
        String conditionValue = request.getParameter("conditionValue");
        List<DBTable> tableInfo = dbTableService.queryTableInfo(conditionValue);
        String json = JsonUtil.list2json(tableInfo);
        writeJson(response, json);
    }

    @RequestMapping(value = "/querySQL.do")
    public void querySQL(HttpServletRequest request, HttpServletResponse response) {
        String sql = request.getParameter("sql");
        List<Map> tableInfo = dbTableService.querySQL(sql);
        String json = JsonUtil.list2json(tableInfo);
        writeJson(response, json);
    }
}
