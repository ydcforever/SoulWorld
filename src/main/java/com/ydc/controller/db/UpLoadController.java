package com.ydc.controller.db;

import com.fate.controller.BaseController;
import com.fate.file.transfer.HttpDownload;
import com.fate.file.transfer.HttpUpload;
import com.ydc.util.JsonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by ydc on 2019/6/14.
 */
@Controller
@RequestMapping("/upload")
public class UpLoadController extends BaseController {

    @RequestMapping(value = "/load.do")
    public void load(HttpServletRequest request, HttpServletResponse response) {
        String directory = request.getSession().getServletContext().getRealPath("/WEB-INF/upload");
        boolean success = HttpUpload.upload(request, directory);
        writeJson(response, success ? "success" : "false");
    }

    @RequestMapping(value = "/show.do")
    public void show(HttpServletRequest request, HttpServletResponse response) {
        String directory = request.getSession().getServletContext().getRealPath("/WEB-INF/upload");
        List<String> fileNames = HttpDownload.getFileNames(directory);
        String json = JsonUtil.list2json(fileNames);
        writeJson(response, json);
    }

    @RequestMapping(value = "/down.do")
    public void down(HttpServletRequest request, HttpServletResponse response) {
        String directory = request.getSession().getServletContext().getRealPath("/WEB-INF/upload");
        String fileName = request.getParameter("fileName");
        try {
            HttpDownload.download(request, response, directory, fileName);
        } catch (FileNotFoundException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
}
