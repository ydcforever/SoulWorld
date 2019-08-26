//import com.ydc.service.db.DBTableService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import javax.annotation.Resource;
//import java.util.List;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration("classpath:applicationContext.xml")
//public class MPMT {
//
////	@Autowired
////	MPMParseHandler mpmStorage;
////
////	@Test
////	public void test(){
////		String filepath = "C:\\Users\\T440\\Desktop\\MPM";
////		List<String> files = FileUtil.getFilePath(filepath, "MM");
////		for(String file : files)
////		   insertMPM(file);
////	}
////
////	public void insertMPM(String filePath){
////		String[] reuseObjects = {"MPM"};
////		FileParse fileParse = new FileParse(mpmStorage);
////		fileParse.initReuseLists(reuseObjects);
////		fileParse.parse(filePath);
////	}
//	@Resource(name = "dbTableService")
//    private DBTableService dbTableService;
//
//	@Test
//	public void test(){
//
////		List<DBTable> s = dbTableMapper.queryTableInfo("MPM");
////		for(DBTable k :s){
////			System.out.println(k.toString());
////		}
//		List<String> l = dbTableService.queryTables();
//		System.out.println(l);
//	}
//}
