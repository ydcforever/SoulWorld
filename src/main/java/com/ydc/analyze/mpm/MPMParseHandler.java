//package com.ydc.analyze.mpm;
//
//import com.fate.file.parse.ReuseListFileProcess;
//import com.fate.file.parse.thread.BatchInsertDB;
//import com.fate.file.parse.thread.ReuseList;
//import com.ydc.mapper.mpm.MPMHeaderMapper;
//import com.ydc.mapper.mpm.MPMMapper;
//import com.ydc.model.mpm.MPM;
//import com.ydc.model.mpm.MPMHeader;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class MPMParseHandler extends ReuseListFileProcess {
//
//	private String foreign;
//
//	@Autowired
//	private MPMHeaderMapper mpmHeaderMapper;
//
//	@Autowired
//	private MPMMapper mpmMapper;
//
//	public void parseMPM(String filePath) {
//		parse(filePath, buildReuseList());
//	}
//
//	@Override
//	public void handle(String line, int lineNo, String filePath, Map<String, ReuseList> queue) throws Exception {
//		if (lineNo == 1) {
//			String fileName = filePath.substring(filePath.lastIndexOf("\\")+1);
//			MPMHeader mpmHeader = new MPMHeader(line);
//			mpmHeader.setFilename(fileName);
//			foreign = mpmHeader.getHeaderId();
//			queue.get("MPMHeader").add(mpmHeader);
//		} else {
//			MPM mpm = new MPM(line);
//			mpm.setHeaderId(foreign);
//			queue.get("MPM").add(mpm);
//		}
//	}
//
//	@Override
//	public Map<String, ReuseList> buildReuseList() {
//		Map<String, ReuseList> queue = hashMap(2);
//		BatchInsertDB mpmHeaderInsert = new BatchInsertDB() {
//			@Override
//			public boolean insert(String objectName, List list) {
//				mpmHeaderMapper.batchInsert(list);
//				return true;
//			}
//		};
//		queue.put("MPMHeader", new ReuseList(mpmHeaderInsert, 100));
//		BatchInsertDB mpmInsert = new BatchInsertDB() {
//			@Override
//			public boolean insert(String objectName, List list) {
//				mpmMapper.batchInsert(list);
//				return true;
//			}
//		};
//		queue.put("MPM", new ReuseList(mpmInsert, 100));
//		return queue;
//	}
//}
