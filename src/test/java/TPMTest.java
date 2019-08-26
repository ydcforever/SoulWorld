import com.ydc.analyze.tpm.TPMParse;
import com.ydc.mapper.tpm.TPMHeaderMapper;
import com.ydc.model.tpm.TPMHeader;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by ydc on 2019/7/1.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class TPMTest {

    @Autowired
    private TPMParse tpmParse;

    @Autowired
    private TPMHeaderMapper tpmHeaderMapper;

    @Test
    public void test() throws Exception{
        String filePath = "C:\\Users\\T440\\Desktop\\beans\\TPMBULL07903.TXT";
        tpmParse.parseTPM(filePath);
    }

    @Test
    public void log() throws Exception{
        TPMHeader tpmHeader = new TPMHeader("IATATPM 07 2 0");
//        System.out.println(tpmHeader.buildSuccess());
//        tpmHeaderMapper.insert(new TPMHeader("IATATPM 07 2 0"));
    }
}
