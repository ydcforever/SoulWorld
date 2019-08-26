package com.ydc.controller.db;

import com.fate.controller.BaseController;
import com.ydc.mapper.db.AreaPartitionMapper;
import com.ydc.model.db.AreaPartition;
import com.ydc.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by T440 on 2018/4/26.
 */
@Controller
@RequestMapping("/airport")
public class AreaPartitionController extends BaseController {

    @Autowired
    private AreaPartitionMapper areaPartitionMapper;

    @RequestMapping(value = "/queryAreaPartition.do")
    public void queryAreaPartition(HttpServletRequest request, HttpServletResponse response) {
        String airport = request.getParameter("airport");
        AreaPartition list = areaPartitionMapper.queryAreaPartition(airport);
        String json = JsonUtil.bean2json(list);
        writeJson(response, json);
    }

    @RequestMapping(value = "/queryAreaPartitions.do")
    public void queryAreaPartitions(HttpServletRequest request, HttpServletResponse response,
                                    @RequestParam("airports") List<String> airports) {
        List<AreaPartition> list = areaPartitionMapper.queryAreaPartitions(airports);
        String json = JsonUtil.list2json(list);
        writeJson(response, json);
    }
}
