

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
         
	       var Lcoin = cm.itemQuantity(4033825);
               
                
	       var chat = "\r\n#L998#";
	       chat += "#r#e현재 #b#h0##k님의#r#i4033825# 별빛의 결정 갯수 #r#e"+ Lcoin +" #n#k#k#n"
                
               
	       
	       

               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L1004# #i1482183#[올스텟1500,공마250] #e#r1개#k#n";
	     
	       


               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3# #i1332242#[올스텟1500,공마250] #e#r1개#k#n";
               

	       
               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3400# #i1342087#[올스텟1500,공마250] #e#r1개#k#n"
	       
	       chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3401# #i1402214#[올스텟1500,공마250] #e#r1개#k#n";
               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3402# #i1422156#[올스텟1500,공마250] #e#r1개#k#n";
	        chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3403# #i1462208#[올스텟1500,공마250] #e#r1개#k#n"; 
              
	        chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3404# #i1382226#[올스텟1500,공마250] #e#r1개#k#n";
	        chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3405# #i1472230#[올스텟1500,공마250] #e#r1개#k#n";
	      chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3406# #i1492194#[올스텟1500,공마250] #e#r1개#k#n";
	       chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3407# #i1532112#[올스텟1500,공마250] #e#r1개#k#n";
                chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3408# #i1452220#[올스텟1500,공마250] #e#r1개#k#n";
               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(개)#L3409# #i1432182#[올스텟1500,공마250] #e#r1개#k#n";
	       //chat += "\r\n\r\n#L998##r#i4310088# 코인 #e#r5#k#n 개#L9385# #i2591088# #e#r1개[위대한 시그너스 소울]#k#n"
	    


	   

	       cm.sendSimple(chat);

	    }  if (selection >= 9999999) {
		    cm.dispose();
    } else if (selection == 1) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049361)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2049361#  30개#k를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(2049361,30);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3999) {
		cm.dispose();
		cm.openNpc(2134012);	
    } else if (selection == 111) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102550)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102550# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102550,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
    } else if (selection == 110) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102551)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102551# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102551,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 109) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702455)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702455# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702455,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 2) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049704)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2049704# 30개#k를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(2049704,30);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 108) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052661)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052661# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052661,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 107) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1082549)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1082549# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1082549,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 106) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003965)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003965# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003965,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 105) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702433)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702433# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702433,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052587# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052587# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 103) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1082493)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1082493# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1082493,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
            
}
	    } else if (selection == 102) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003776)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003776# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003776,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 5558) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2048723)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2048723# 10개를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
                        cm.gndnjs(2048723,10);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 100) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052434)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1052434# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052434,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();
}
              } else if (selection == 7184) {
		if (cm.haveItem(4033825, 6)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i2591233# 를 구입 하셨습니다.");
			cm.gainItem(4033825, -6);
                        cm.gainItem(2591233, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("소비창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 17) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112585)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112585# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112585,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4310088, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1142623# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -50);
                        cm.gndnjs(1142623,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4310088, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1142249# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -50);
                        cm.gndnjs(1142249,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(4310088)) {
		        cm.sendOk("#r홍보 코인#k으로 후원포인트[1,000]을 구입 하셨습니다.");
			cm.gainRC(1000);
                        cm.gndnjs(1112558,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	


	    } else if (selection == 3) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1332242# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1332242,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
 } else if (selection == 3400) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1342087# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1342087,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3401) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1402214# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1402214,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3402) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1422156# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1422156,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3403) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1462208# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1462208,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3404) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1382226# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1382226,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3405) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1472230# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1472230,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3406) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1492194# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1492194,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3407) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1532112# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1532112,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3408) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1452220# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1452220,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 3409) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1432182# 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1432182,'[아무거나 온라인]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 4) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(4310029)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i4310029# 을 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(4310029, 3);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 5) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049300)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2049300# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -5);
			cm.gainItem(2049300, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 7) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102450)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102450# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102376,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 8) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102451)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102451#를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102451,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 81) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102452)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1102452#를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102452,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 9) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702456)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702456# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
			
                        cm.gndnjs(1702456,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 10) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702451)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702451# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702451,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 11) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702457)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702457# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702457,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 12) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003133)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003133# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003133,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 13) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1003636)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1003636# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1003636,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 15) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112586)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112586# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112586,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 16) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112663)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112663# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112663,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 20) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112141)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112141# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112141,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 21) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112252)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112252# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(11112252,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 22) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112135)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112135# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112135,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 23) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112238)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1112238# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112238,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 24) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1702348)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702348 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1702348,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 25) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1702350)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i1702350# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1702350,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5064000)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i5064000# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5064000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5062005)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i5062005# 50개 를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5062005, 50);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5064100)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i5064100# 를 구입 하셨습니다.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5064100, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
    } else if (selection == 1004) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1482183#[레드 너클] 1개#k를 구입 하셨습니다.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1482183,'[아무거나 온라인]',1500,250,7);
			cm.dispose();
		    } else {
		        cm.sendOk("장비창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 8724) {
		if (cm.haveItem(4031054, 100)) {
		    if (cm.canHold(4031054)) {
		        cm.sendOk("#r오래된 지도조각#k으로 #r#i4033825#[별빛의 결정] 1개를 구입 하셨습니다.");
			cm.gainItem(4031054, -100);
			cm.gainItem(4033825, 1);
			cm.dispose();
} else {
		        cm.sendOk("기타창에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		    
		} else {
		    cm.sendOk("#r오래된 지도조각#k이 부족합니다.");
		    cm.dispose();

}


	    } else if (selection == 710) {
		if (cm.haveItem(4033825,3)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#3개로 #r#i1012028# 1개#를 구입 하셨습니다.");
			cm.gainItem(4033825, -3);
			cm.gainSponserItem(1012028,'[아무거나 온라인]',3000,500,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 9381) {
		if (cm.haveItem(4001187, 5000)) {
		    if (cm.canHold(4001187)) {
		        cm.sendOk("#r물고기#k로 #r#i1012003 1개#를 구입 하셨습니다.");
			cm.gainItem(4001187, -5000);
			cm.gainSponserItem(1012003,'[아무거나 온라인]',3000,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r물고기#k가 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 9385) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2591088)) {
		        cm.sendOk("#r홍보 코인#k으로 #r#i2591088 1개#를 구입 하셨습니다.");
			cm.gainItem(4310088, -5);
			cm.gainItem(2591088,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r홍보 코인#k이 부족합니다.");
		    cm.dispose();

}
            } else if (selection == 742) {
		if (cm.haveItem(4033825, 13)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r별빛의 결정#k으로 #r#i1142593 1개#를 구입 하셨습니다.");
			cm.gainItem(4033825, -13);
			cm.gainSponserItem(1142593,'[아무거나 온라인]',4000,400,0);
                        cm.gainSponserItem(1142499,'[아무거나 온라인]',4000,400,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r별빛의 결정#k이 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 10001) {
		cm.dispose();
		cm.openNpc(1033221);
		return;

             } else if (selection == 10002) {
		cm.dispose();
		cm.openNpc(1033211);
		return;
             } else if (selection == 10003) {
		cm.dispose();
		cm.openNpc(1033206);
		return;
             } else if (selection == 10004) {
		cm.dispose();
		cm.openNpc(1033205);
		return;
             } else if (selection == 10009) {
		cm.dispose();
		cm.openNpc(1033111);
		return;
 } else if (selection == 20000) {
		cm.dispose();
		cm.openNpc(9072100);
		return;
             } else if (selection == 10006) {
		cm.dispose();
		cm.openNpc(1033202);
		return;
             } else if (selection == 10007) {
		cm.dispose();
		cm.openNpc(1033201);
		return;
            } else if (selection == 10008) {
		cm.dispose();
		cm.openNpc(1033200);
		return;
            } else if (selection == 10011) {
		cm.dispose();
		cm.openNpc(1033110);
		return;
  } else if (selection == 20001) {
		cm.dispose();
		cm.openNpc(1033105);
		return;
} else if (selection == 998) {
		cm.dispose();
		cm.openNpc(2020006);
		return;





		}
	}
}