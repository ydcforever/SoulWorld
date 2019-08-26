package com.ydc.controller.db;

import com.fate.autoFile.db.MoveSQL;
import com.fate.autoFile.db.TriggerSQL;
import com.fate.controller.BaseController;
import com.ydc.util.JsonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ydc on 2019/8/1.
 */
@Controller
@RequestMapping("/autoCode")
public class DBAutoCodeController extends BaseController {

    @RequestMapping(value = "/trigger.do")
    public void triggerBuilder(HttpServletRequest request, HttpServletResponse response) {
        String source = request.getParameter("source");
        String columns = request.getParameter("columns");
        String target = request.getParameter("target");
        List<String> cols = new ArrayList<>();
        JsonUtil.getList(columns, cols);
        StringBuilder trg = TriggerSQL.storeNewRowBuilder(target, cols, source);
        String json = trg.toString();
        writeJson(response, json);
    }

    @RequestMapping(value = "/insert.do")
    public void insertBuilder(HttpServletRequest request, HttpServletResponse response) {
        String source = request.getParameter("source");
        String columns = request.getParameter("columns");
        String target = request.getParameter("target");
        String alias = request.getParameter("alias");
        List<String> cols = new ArrayList<>();
        JsonUtil.getList(columns, cols);
        StringBuilder insert = MoveSQL.LowerBuilder(cols, target, source, alias);
        String json = insert.toString();
        writeJson(response, json);
    }
}
