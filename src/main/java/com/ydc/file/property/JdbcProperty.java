package com.ydc.file.property;

import com.fate.file.property.InitProperty;
import org.apache.ibatis.datasource.jndi.JndiDataSourceFactory;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by ydc on 2019/6/8.
 */
public class JdbcProperty implements InitProperty {

    private String driverClassName;

    private String url;

    private String username;

    private String password;

    public JdbcProperty() {

    }

    public JdbcProperty(String driverClassName, String url, String username, String password) {
        this.driverClassName = driverClassName;
        this.url = url;
        this.username = username;
        this.password = password;
    }

    @Override
    public String path() {
//        File dir = new File("");
//        String path="";
//        try {
//            path =  dir.getCanonicalPath();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return path;

//        ApplicationContext context = PooledDataSourceFactory
//                ("classpath:applicationContext.xml");
        DataSource aa = new JndiDataSourceFactory().getDataSource();

        return "";
//        File dir = new File("");
//        String courseFile = null;
//        try {
//            courseFile = dir.getCanonicalPath();
//        } catch (IOException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//        return courseFile == null ? null : courseFile + "\\src" + "\\jdbc.properties";
    }

    @Override
    public Properties create() {
        Properties property = new Properties();
        property.setProperty("jdbc.url", url);
        property.setProperty("jdbc.username", username);
        property.setProperty("jdbc.password", password);
        property.setProperty("jdbc.driverClassName", driverClassName);
        return property;
    }

    @Override
    public String signature() {
        return "YDC JDBC";
    }
}
