var menulist = "";

function son(menu){
	
	if(menu.sonlist.length > 0){
		
		if(menu.grade == 1){
			menulist += '<li class="nav-parent"><a ><i class="fa fa-laptop" aria-hidden="true"></i><span>'+menu.name+'</span></a><ul class="nav nav-children">';
		}
		if(menu.grade == 2){
			menulist += '<li class="nav-parent"><a><span>'+menu.name+'</span></a><ul class="nav nav-third">';
		}
		if(menu.grade == 3){
			menulist += '<li class="nav-parent"><a><span>'+menu.name+'</span></a><ul class="nav nav-four">';
		}
		
		for(var e=0;e<menu.sonlist.length;e++){
			son(menu.sonlist[e]);
		}
			
		menulist += '</ul></li>';
		
	}
	
	if(menu.sonlist.length == 0 ){	
			if(menu.grade == 1){
				menulist += '<li class="nav-parent"><a ><i class="fa fa-laptop" aria-hidden="true"></i><span>'+menu.name+'</span></a></li>'
			}
			if(menu.grade == 2){
				menulist += '<li><a href="/Ex/'+menu.url+'" target="if"><span class="text">'+menu.name+'</span></a></li>';
			}
			if(menu.grade == 3){
				menulist += '<li><a href="/Ex/'+menu.url+'" target="if"><span class="text"><i class="fa fa-copy" aria-hidden="true"></i>'+menu.name+'</span></a></li>';
			}
	}
}

$(document).ready(function(){
	console.log('1111111111');
	
	$.ajax({
		url:'/Ex/tree/menu',
		type:'POST',
		async:false,
		dataType:'json',
		success:function(data){
			
			menulist = "";
			for(var b = 0 ; b<data.length ; b++){
				var menu = data[b];
				son(menu);		
			}
			 $("#menulist").html(menulist);
		
		},
		error:function(data){
			console.log('22112211');
	}
	})
});


