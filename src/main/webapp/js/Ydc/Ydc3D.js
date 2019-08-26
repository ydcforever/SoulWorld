window.YDC = {};

YDC.TagElement = function ( tag ) {
	this.seqNo = -1;
	//起始标签
	this.tag = tag;
	//标签类型
	this.tagType = null;
	//标签间内容
	this.content = null;
	//结束标签
	this._tag = null;
	//是否闭合
	this.isClosed = false;
        
	//父标签
	this.parentTag = null;		
	//标签属性
	this.attributes = {};
	//子标签
	this.chlidrens = {};
	//剩余未匹配的
	//this.restValue = '';	
};

YDC.TagElement.prototype = {
	init : function ( tagElement ) {
		if ( tagElement.tagType == 1 )
			this.tag = tagElement.tag;
		//内容
		else if ( tagElement.tagType == 2 )
    		this.content = tagElement.tag;
		//结尾标签
		else if ( tagElement.tagType == -1 )
    		this._tag = tagElement.tag;
		else {
    		this.tag = tagElement.tag;
    		this.isClosed = true;
    	}
	}
};	

//*******************************************************************************************************************
YDC.DomAnalyze = function () {
    this.baseReg = { 
	    //<!DOCTYPE html>
		htmlTop : '<![^-<>]*>',
		//<D/> 
		//whole : '<[^!\/<>]*\/>',
   		whole : '<[^!\/<>]*((\"[^\"]*\")*|(\'[^\']*\')*)\/>',
   		//<D>
   		//start : '<[^!\/<>]*>',
   		start : '<[^!\/<>]*((\"[^\"]*\")*|(\'[^\']*\')*)>',
   		//</D>
   		end : '</[^\/<>]*>',
   		//注释
   		comment : '<!--[\s\S]*?--\>',
   		//空白
   		//blank : '^ +<',
   		//内容
		text : '[^<>]+'	
	};
	this.tagStack = [];
	this.tagElements = [];
	this.error = '';
};

YDC.DomAnalyzeEngine = function (domAnalyze) {
	//正则表达式
	this.domAnalyze = domAnalyze == undefined ? new YDC.DomAnalyze() : domAnalyze;
	this.tagReg = new RegExp( '((^' + this.domAnalyze.baseReg.htmlTop
	     	+ ')|(^' + this.domAnalyze.baseReg.whole + ')|(^'
		    + this.domAnalyze.baseReg.start
			+ ')|(^' + this.domAnalyze.baseReg.text + ')|(^'
			+ this.domAnalyze.baseReg.end + '))' );	
};

YDC.DomAnalyzeEngine.prototype = {
	//截取标签
    splitText : function ( restText ) { 
		var result = restText.match( this.tagReg );
		if ( result != null ) {
			for( var i = 2; i < result.length; i++ ) {
			    if ( result[i] != null && ( i < 4 || i == 7 || i > 10 ) ) {
				    var tagElement = new YDC.TagElement( result[i] );
				    tagElement.tagType = i==2||i==3?0:i==7?1:i==11?2:-1;    
				    return tagElement;
				}
				if ( i == 3 || i == 7 ) {
					i += 3;
				}
			}
		} 
		return;				
	},
	
	//遍历开始标签
	scanStack : function( tagElement ){
		var isFind = -1;
		var endTag = tagElement.tag.substr(2);
		for( var i = this.domAnalyze.tagStack.length - 1; i >= 0; i--){
			if ( this.domAnalyze.tagStack[i].tagType == 1 ){
				var startTag = this.domAnalyze.tagStack[i].tag;
				if ( startTag.indexOf(' ') > -1 )
				    startTag = startTag.substr(1, this.domAnalyze.tagStack[i].tag.indexOf(' ') - 1) + '>';
				else
				    startTag = startTag.substr(1);
				
				if (startTag == endTag)
					isFind = i;	
				break;
			}
		}
		return isFind;
	},
	
	//完成标签闭合
	closeTag : function ( endTag, i ) { 
		var currentElement = this.domAnalyze.tagStack[i];
		//var parent_ele = new Element('');
		for ( var j = this.domAnalyze.tagStack.length - 1; j > i; j-- ) {
			currentElement.init( this.domAnalyze.tagStack[j] );
		    this.domAnalyze.tagStack.pop();
		}
		this.domAnalyze.tagStack.pop();
		//父节点 包含一些空格等符号
		for ( var k = i-1; k >= 0; k-- ) {
		    if ( this.domAnalyze.tagStack[k].tagType == 1 )
				currentElement.parentTag = this.domAnalyze.tagStack[k].seqNo;
		        //parent_ele.init(YDC.stack[k]);
			else
			    break;
 		}
		currentElement._tag = endTag;
		//current_ele.parent = parent_ele;
		currentElement.isClosed = true;
		this.domAnalyze.tagElements.push( currentElement );
	},
	
	//解析整个文本
	getElements : function ( restText ) {
		var _seqNo = 0;
	    while( restText != '' && this.domAnalyze.error == '' ) {
		    var tagElement = this.splitText( restText );
			var len = this.domAnalyze.tagStack.length - 1;
			if ( tagElement != null ) {
				restText = restText.substr( tagElement.tag.length );
				//结尾标签
				if ( tagElement.tagType == -1 ) {
					if ( len >= 0 ) {
						var isFind = this.scanStack( tagElement );
						if (isFind > -1)
						    this.closeTag( tagElement.tag, isFind );
						else
							this.domAnalyze.error = tagElement;	
					}else
				    	this.domAnalyze.error = tagElement;			
				//自闭标签
				}else if ( tagElement.tagType == 0 ) {
					tagElement.seqNo = _seqNo;
					this.domAnalyze.tagElements.push( tagElement );
					_seqNo++;
				//开始标签和内容
				}else if ( tagElement.tagType == 1 || tagElement.tagType == 2 ) {
				    //如果栈是空的，内容不用压入
				    if ( this.domAnalyze.tagStack.length == 0 && tagElement.tagType == 2 ) {
						tagElement.seqNo = _seqNo;
						this.domAnalyze.tagElements.push( tagElement );
						_seqNo++;
					//压栈
				    }else{
						tagElement.seqNo = _seqNo;
						this.domAnalyze.tagStack.push( tagElement );
						_seqNo++;
					}
				}					
			}else{
				this.domAnalyze.error = '正则匹配出错:' + restText;
			}    					
		}
	}
}
//*******************************************************************************************************************

YDC.TraverseResult = {};
//内部使用utils,外部使用YU.utils
var Traverse = YDC.Traverse = {
	/**
     * 遍历数组，对象，nodeList
     * @name each
     * @grammar YU.utils.each(obj,iterator,[context])
     * * obj 要遍历的对象
     * * iterator 遍历的方法,方法的第一个是遍历的值，第二个是索引，第三个是obj
     * * context  iterator的上下文
     */
	//iterator : function(v)
    each : function(obj, iterator, context) {
        if (obj == null) return;
		/*===全等 不做类型转换，+获取各类型长度 
		 *表示有length属性且length值是number型
		 */
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
				//初始化只需调用iterator.call(context, obj[i]) 为什么判断？
				if(iterator.call(context, obj[i], i, obj) === false)
					return false;
			}   
        } else {
			//判断object
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if(iterator.call(context, obj[key], key, obj) === false)
                        return false;
                }
            }
        }
    }
};

//*******************************************************************************************************************
YDC.ObjectType = ['String','Function','Array','Number','RegExp'];
YDC.LabelType = ['EndLabel','StartLabel'];
//包含isEndLabel 和 getEndLabel 方法
YDC.RegCollection = {
	regEndLabel : new RegExp('<((\/[^\/]*)|([^\/]*\/))>$'),
	regStartLabel : new RegExp('<[^\/<>]*>$'),
	regComment : new RegExp('<!--.*-->')
};

//YU.utils方法isString,isFunction ...
Traverse.each( YDC.ObjectType, function( v ) {
	//YU.utils['is' + v]  类似utils.method
    YDC.TraverseResult['is' + v] = function(obj){
		// v(目标)类型和obj(传参)类型是否相等
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
});

Traverse.each( YDC.LabelType, function( s ) {
	YDC.TraverseResult['is' + s] = function(str){	
        return YDC.RegCollection['reg'+s].test(str);
    };
	YDC.TraverseResult['get' + s] = function(str){	
	    var result = str.match(YDC.RegCollection['reg'+s]);
        return result == null ? null : result[0];
    };
});
//*******************************************************************************************************************

YDC.Cursor = {
	//光标处插入文本
	addText : function (object,browsertype,rangeData){
		var oValue, nValue, oR, sR, nStart, nEnd, st;  
		if (browsertype.msie){
		    sR = document.selection.createRange();  
            sR.text = addtext;  
            sR.setEndPoint('StartToEnd', sR);  
            sR.select(); 
		}else{
		    oValue = object.value;  
            nValue = oValue.substring(0, rangeData.start) + rangeData.text + oValue.substring(rangeData.end);  
            nStart = nEnd = rangeData.start + rangeData.text.length;  
            st = object.scrollTop;  
            object.value = nValue;  
            // Fixbug:  
            // After textarea.values = nValue, scrollTop value to 0  
            if (object.scrollTop != st) {  
                object.scrollTop = st;  
            }  
            object.setSelectionRange(nStart, nEnd);  
	    }
	},
	//获取光标位置,及选中区的文本
	getSelect : function (object,browsertype){
		var rangeData = {text:"",start:0,end:0};
		if (browsertype.msie){
		    object.focus();  
			var i,  
            oS = document.selection.createRange(),  
            // Don't: oR = textarea.createTextRange()  
            oR = document.body.createTextRange();  
            oR.moveToElementText(object);  
    
            rangeData.text = oS.text;  
            rangeData.bookmark = oS.getBookmark();  
      
            // object.moveStart(sUnit [, iCount])   
            // Return Value: Integer that returns the number of units moved.  
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {  
                // Why? You can alert(textarea.value.length)  
                if (object.value.charAt(i) == '\r') {  
                    i++;  
                }  
            }      
            rangeData.start = i;  
            rangeData.end = rangeData.text.length + rangeData.start;  
		}else{
		    object.focus();  
            rangeData.start = object.selectionStart;  
            rangeData.end = object.selectionEnd;  
            rangeData.text = (rangeData.start != rangeData.end) ? object.value.substring(rangeData.start, rangeData.end) : "";  
		}
        return rangeData;  
	},
	//设置光标位置
	setPosition : function (object,browsertype,rangeData){
		if (browsertype.msie){
		    var range = object.createTextRange();
		    range.moveStart('character', rangeData.start);
		    range.moveEnd('character', rangeData.end);
		    range.collapse();
			range.select();
		}else{
		    object.selectionStart = rangeData.start;
			object.selectionEnd = rangeData.end;
			object.setSelectionRange(rangeData.start, rangeData.end);
		}
	}
};

//*******************************************************************************************************************
YDC.TextOperation = function ( object ) {
    var text;
	if ( 'selectionStart' in object ) {
		text = object.value.substr(0, object.selectionStart);
    } else {
     	var oSel = document.selection.createRange();
		oSel.moveStart('character', -object.value.length);
		text = oSel.text;
    } 
	//截止到光标处
	var arrToCursor = text.split('\n');
	this.lenToCursor = arrToCursor.length;
	this.rowToCursor = arrToCursor[this.lenToCursor-1];
	this.rowlenToCursor = this.rowToCursor.length;
	//全部内容
	this.arrWhole = object.value.split('\n');
	this.row = this.arrWhole[this.lenToCursor-1];
};

YDC.TextOperation.prototype = {
	getRow : function ( i ) {
		return this.arrWhole[this.lenToCursor-i];
	},
	getSpaceCount : function( isEnter ) {
		//回车后需要获取上一行数据
		var row = isEnter?this.getRow(2):this.row;
		return row.replace(/^(\s*).*/, '$1').length; 
	},
	isEndLabel : function () {
		var row = this.row.replace(/^\s+|\s+$/g,'');
	    return YDC.TraverseResult.isEndLabel(row);
	},
	getLabel : function () {
		var row = this.row.replace(/^\s+|\s+$/g,'');
		var label = YDC.TraverseResult.getStartLabel(row);
		return label == null ? null : '</'+label.substr(1);
	}
}
//*******************************************************************************************************************

YDC.EventUtils = {
	//监听传参
	addEventHandler : function ( oTarget, sEventType, fnhandler, param1, param2 , param3 ) {
		var regHandler = fnhandler;
		if ( param1 == undefined ) {
			regHandler = function ( e ) {
				//继承监听函数,并传入参数以初始化;
				fnhandler.call( this);	
		    }		
		} else if ( param2 == undefined ) {
			regHandler = function ( e ) {
				//继承监听函数,并传入参数以初始化;
				fnhandler.call( this,param1);	
		    }		
		} else if ( param3 == undefined ) {
			regHandler = function ( e ) {
				//继承监听函数,并传入参数以初始化;
				fnhandler.call( this, param1, param2 );	
		    }				
		} else {
			regHandler = function ( e ) {
				//继承监听函数,并传入参数以初始化;
				fnhandler.call( this, param1, param2 ,param3);	
		    }				
	    }
		if ( oTarget.addEventListener )
			oTarget.addEventListener( sEventType, regHandler, false );
	    else if ( oTarget.attachEvent )
 	       oTarget.attachEvent( "on" + sEventType, regHandler );
		else
  	      oTarget["on" + sEventType] = regHandler;  
	},
	
    addMouseScroll : function( fnhandler, domElement ) {
		this.domElement = ( domElement !== undefined ) ? domElement : document;
		//W3C
		if( this.domElement.addEventListener ) {
            this.domElement.addEventListener('DOMMouseScroll',fnhandler,false);
        }
		//IE/Opera/Chrome/Safari
        window.onmousewheel=this.domElement.onmousewheel=fnhandler;
	}	
};

YDC.HtmlUtils = {
	getUrlParam : function ( name ) {
		//构造一个含有目标参数的正则表达式对象
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
		//匹配目标参数
        var result = window.location.search.substr(1).match(reg); 
        return result? decodeURIComponent(result[2]): '';
    },
    //IE才允许ActiveXObject,防止客户端读取服务端数据
	readfile : function readfile( filepath ) {
	    var fso = new ActiveXObject('Scripting.FileSystemObject');  
	    var file = fso.OpenTextFile(filepath,1);  
	    var str = '';
        while (!file.AtEndOfStream)
            str += file.ReadLine()+'<br>';        
		file.Close();
        return '<h>'+filepath+'</h><p>'+str+'</p>';
	}	
}