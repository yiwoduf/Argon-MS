

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
         
	       var Lcoin = cm.itemQuantity(4033247);
               var Lcoin2= cm.itemQuantity(4033247);
	       var chat = "";
	       chat += "#r#e현재 #b#h0##k님의#r#i4033247# 보석 갯수 #r#e"+ Lcoin +" #n#k#k#n"
              // chat += "#r#e현재 #b#h0##k님의#r#i4310070# 25성 강화코인 갯수 #r#e"+ Lcoin2 +" #n#k#k#n"
	       
	       //chat += "\r\n\r\n#L8724##r#i4032101# 보석 #e#r1#k#n 개#fUI/UIWindow.img/QuestIcon/4/0#  #e#r[후원포인트20,000]#k#n";

             // chat += "\r\n\r\n#L8728##r#i4310070# 코인 #e#r1#k#n 개#fUI/UIWindow.img/QuestIcon/4/0#  #e#r[후원포인트20,000]#k#n";

chat += "\r\n\r\n#L9000##r#i4033247# 황단 #e#r300#k#n 개 #i2431755# #e#r[둥실둥실라이딩]#k#n";

chat += "\r\n\r\n#L9001##r#i4033247# 황단 #e#r500#k#n 개 #i2432552# #e#r[꿀꿀나비라이딩]#k#n";





	    


	   

	       cm.sendSimple(chat);

	    }  if (selection >= 9999999) {
		    cm.dispose();
} else if (selection == 6020) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112161#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1112161,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 9000) {
		if (cm.haveItem(4033247, 300)) {
		    if (cm.canHold(4033247)) {
		        cm.sendOk("#r황단#k으로 #r#i2431755#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4033247, -300);
			cm.gainItem(2431755,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r황단#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 9001) {
		if (cm.haveItem(4033247, 500)) {
		    if (cm.canHold(4033247)) {
		        cm.sendOk("#r황단#k으로 #r#i2432552#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4033247, -500);
			cm.gainItem(2432552,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r황단#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 9002) {
		if (cm.haveItem(4032101, 4)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2434574#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -4);
			cm.gainItem(2434574,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 9003) {
		if (cm.haveItem(4032101, 2)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2435044#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -2);
			cm.gainItem(2435044,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 9004) {
		if (cm.haveItem(4032101, 2)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2435044#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -2);
			cm.gainItem(2435044,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6000) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1452229#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1452229,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6001) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142880#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142880,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6002) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015223#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015223,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6003) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015236#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015236,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6004) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015160#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015160,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6005) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010815#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010815,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6006) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010976#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010976,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6007) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015248#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015248,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6008) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015247#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015247,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6009) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015311#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015311,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6010) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015310#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015310,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6011) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015303#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015303,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6012) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015315#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015315,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6013) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015272#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015272,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6014) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010704#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010704,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6015) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010590#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010590,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6016) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010613#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010613,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6017) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010652#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010652,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6018) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015279#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015279,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6019) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5204007#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5204007,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6021) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010980#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010980,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6022) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015156#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015156,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6023) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010132#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5010132,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6024) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112943#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1112943,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6025) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1052841#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1052841,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6026) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003947#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1003947,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6027) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i4033825#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(4033825,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6028) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3994742#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3994742,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6029) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102695#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1102695,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6030) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402147#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1402147,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6031) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102689#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1102689,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6032) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402213#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1402213,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6033) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1462207#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1462207,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6034) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1452219#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1452219,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6035) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1412150#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1412150,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6036) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1422155#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1422155,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6037) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1432181#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1432181,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6038) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1442237#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1442237,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 6039) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1472229#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1472229,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6040) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1482182#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1482182,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6041) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1492193#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1492193,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6042) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142009#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142009,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6043) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3700013#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3700013,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7000) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015277#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015277,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7001) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015000#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015000,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7002) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003219#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1003219,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7003) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015089#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015089,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7004) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142867#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142867,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7005) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1050334#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1050334,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7006) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1051404#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1051404,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7007) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1051305#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1051305,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7008) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1050249#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1050249,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7009) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102505#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1102505,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7010) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1070029#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1070029,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7011) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1071046#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1071046,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 7012) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142270#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142270,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8000) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142807#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142807,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8001) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112259#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1112259,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8002) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142006#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142006,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8003) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010520#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010520,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8004) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402149#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1402149,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8005) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1432136#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1432136,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8006) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402148#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1402148,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8007) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1022135#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1022135,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8008) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1012532#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1012532,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8009) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1012531#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1012531,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8010) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1012530#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1012530,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8011) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1012529#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1012529,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8012) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1012454#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1012454,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8013) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1052892#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1052892,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8014) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1050383#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1050383,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8015) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1051453#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1051453,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8016) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015276#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015276,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8017) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142895#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142895,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8018) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142894#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142894,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8019) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142881#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142881,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8020) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010723#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010723,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8021) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010083#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5010083,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8022) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142893#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142893,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8023) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3700268#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3700268,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8024) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015174#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015174,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8025) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142271#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142271,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8026) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142833#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142833,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8027) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142139#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142139,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8028) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142573#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142573,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8029) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015210#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015210,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8030) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010862#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010862,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8031) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5700000#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5700000,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8032) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003050#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1003050,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8033) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1302222#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1302222,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8034) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1302221#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1302221,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8035) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1452167#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1452167,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8036) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003999#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1003999,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 8037) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142409#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142409,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6044) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3700222#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3700222,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6045) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010681#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010681,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6046) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142005#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1142005,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6047) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015238#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015238,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6048) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3700136#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3700136,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6049) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015172#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015172,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6050) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015278#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015278,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6051) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010651#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010651,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6052) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010652#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010652,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6053) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010653#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010653,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6054) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010654#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010654,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6055) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010655#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010655,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6056) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010656#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3010656,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6057) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1372191#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1372191,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 6058) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1382225#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1382225,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6059) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112941#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1112941,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 6060) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1115004#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1115004,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 5000) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1302220#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1302220,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}				
} else if (selection == 5001) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1322157#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1322157,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}				
} else if (selection == 5002) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1362064#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1362064,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}				
} else if (selection == 5003) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1372136#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1372136,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}				
} else if (selection == 5004) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1382166#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1382166,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}				
} else if (selection == 5005) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1452166#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1452166,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 5006) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1212073#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1212073,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5007) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1222068#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1222068,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5008) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1232065#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1232065,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5009) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1302280#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1302280,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5010) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1312158#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1312158,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5011) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1322208#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1322208,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5012) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1332230#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1332230,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5013) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1362095#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1362095,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5014) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1372182#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1372182,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5015) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1382214#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1382214,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5016) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402203#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1402203,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5017) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1412140#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1412140,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5018) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1422145#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1422145,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5019) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1432172#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1432172,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5020) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1442228#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1442228,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5021) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1452210#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1452210,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5022) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1462198#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1462198,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5023) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1472219#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1472219,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5024) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1482173#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1482173,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5025) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1492184#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1492184,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}			
} else if (selection == 5026) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1522099#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1522099,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}


} else if (selection == 5028) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010042#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5010042,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}																																		

		

} else if (selection == 3000) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015015#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015015,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3001) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015016#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015016,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3002) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015017#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015017,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3003) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015019#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015019,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3004) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015020#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015020,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3005) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015021#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015021,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3006) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015022#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015022,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3007) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015023#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015023,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3008) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015024#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015024,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3009) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015025#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015025,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3010) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015026#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015026,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
} else if (selection == 3011) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015018#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(3015018,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
    } else if (selection == 4201) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1190300#  1개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(1190300,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}	
    } else if (selection == 4202) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1190301# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1190301,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4203) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1190301# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1190301,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4204) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1113070# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1113070,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4205) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1113149# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1113149,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4206) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1113055# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1113055,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4207) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1152154# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1152154,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4208) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1032200# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainSponserItem(1032200,'라스트스토리',5,5,5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4209) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1004075# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1004075,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4210) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1122150# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainSponserItem(1122150,'라스트스토리',20,5,5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4211) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1122254# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1122254,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4212) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1012478# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1012478,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4213) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1022144# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1022144,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4214) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1672040# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1672040,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4215) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402224# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1402224,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4216) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1132272# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1132272,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4217) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010110# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(5010110,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4218) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010112# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(5010112,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4219) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010071# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(5010071,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4220) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010127# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(5010127,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4221) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010128# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(5010128,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4222) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5010109# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(5010109,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4223) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015111# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3015111,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4224) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015075# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3015075,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4225) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010700# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3010700,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4226) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010783# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3010783,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4227) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015090# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3015090,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4228) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015092# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3015092,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4229) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1402180# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1402180,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4230) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3010838# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3010838,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4231) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i3015155# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(3015155,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4232) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112960# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1112960,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 4233) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1382235# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(1382235,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}

    } else if (selection == 110) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1102551)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102551# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1102551,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 109) {
		if (cm.haveItem(4032101, 20)) {
		    if (cm.canHold(1702455)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702455# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -20);
                        cm.gainItem(1702455,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 2) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2049704)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2049704# 30개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(2049704,30);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 108) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1052661)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1052661# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1052661,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 107) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1082549)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1082549# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1082549,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 106) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1003965)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003965# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1003965,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 105) {
		if (cm.haveItem(4032101, 20)) {
		    if (cm.canHold(1702433)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702433# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -20);
                        cm.gainItem(1702433,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1052587# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1052587# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 103) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1082493)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1082493# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1082493,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
            
}
	    } else if (selection == 102) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1003776)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003776# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1003776,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 5558) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2048723)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2048723# 10개를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
                        cm.gainItem(2048723,10);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 100) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1052434)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1052434# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1052434,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();
}
	    } else if (selection == 17) {
		if (cm.haveItem(4032101, 40)) {
		    if (cm.canHold(1112585)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112585# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -40);
                        cm.gainItem(1112585,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4032101, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142623# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -50);
                        cm.gainItem(1142623,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4032101, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1142249# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -50);
                        cm.gainItem(1142249,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 후원포인트[1,000]을 구입 하셨습니다.");
			cm.gainRC(1000);
                        cm.gainItem(1112558,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	


	    } else if (selection == 3) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4001715)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i4001715# 4개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(4001715,4);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 4) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4310029)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i4310029# 을 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(4310029, 3);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 5) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2049300)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2049300# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -5);
			cm.gainItem(2049300, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 7) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1102450)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102450# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1102376,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 8) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1102451)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102451#를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1102451,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 81) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1102452)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1102452#를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1102452,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 9) {
		if (cm.haveItem(4032101, 20)) {
		    if (cm.canHold(1702456)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702456# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -20);
			
                        cm.gainItem(1702456,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 10) {
		if (cm.haveItem(4032101, 20)) {
		    if (cm.canHold(1702451)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702451# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -20);
                        cm.gainItem(1702451,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 11) {
		if (cm.haveItem(4032101, 20)) {
		    if (cm.canHold(1702457)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702457# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -20);
                        cm.gainItem(1702457,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 12) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(1003133)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003133# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
                        cm.gainItem(1003133,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 13) {
		if (cm.haveItem(4032101, 20)) {
		    if (cm.canHold(1003636)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1003636# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -20);
                        cm.gainItem(1003636,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 15) {
		if (cm.haveItem(4032101, 40)) {
		    if (cm.canHold(1112586)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112586# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -40);
                        cm.gainItem(1112586,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 16) {
		if (cm.haveItem(4032101, 40)) {
		    if (cm.canHold(1112663)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112663# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -40);
                        cm.gainItem(1112663,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 20) {
		if (cm.haveItem(4032101, 30)) {
		    if (cm.canHold(1112141)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112141# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -30);
                        cm.gainItem(1112141,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 21) {
		if (cm.haveItem(4032101, 30)) {
		    if (cm.canHold(1112252)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112252# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -30);
                        cm.gainItem(11112252,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 22) {
		if (cm.haveItem(4032101, 30)) {
		    if (cm.canHold(1112135)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112135# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -30);
                        cm.gainItem(1112135,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 23) {
		if (cm.haveItem(4032101, 30)) {
		    if (cm.canHold(1112238)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1112238# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -30);
                        cm.gainItem(1112238,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 24) {
		if (cm.haveItem(4032101, 30)) {
		    if (cm.canHold(1702348)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702348 를 구입 하셨습니다.");
			cm.gainItem(4032101, -30);
                        cm.gainItem(1702348,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 25) {
		if (cm.haveItem(4032101, 30)) {
		    if (cm.canHold(1702350)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i1702350# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -30);
                        cm.gainItem(1702350,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(5064000)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5064000# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5064000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(5062005)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5062005# 50개 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5062005, 50);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(5064100)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i5064100# 를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(5064100, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
    } else if (selection == 1004) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2049153)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i4310036#  200개#k를 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainItem(4310036,200);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 8724) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r[후원포인트20,000]#k을 구입 하셨습니다.");
			cm.gainItem(4032101, -1);
			cm.gainRC(20000);
			cm.dispose();
} else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		    
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
} else if (selection == 8728) {
		if (cm.haveItem(4310070, 1)) {
		    if (cm.canHold(4310070)) {
		        cm.sendOk("#r25성 강화 코인#k으로 #r[후원포인트20,000]#k을 구입 하셨습니다.");
			cm.gainItem(4310070, -1);
			cm.gainRC(20000);
			cm.dispose();
} else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		    
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}


} else if (selection == 8224) {
		if (cm.haveItem(4032101, 10)) {
		    if (cm.canHold(4032101)) {
		        cm.sendOk("#r원템 보석#k으로 #r[후원포인트10,000]#k을 구입 하셨습니다.");
			cm.gainItem(4032101, -10);
			cm.gainRC(10000);
			cm.dispose();
} else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		    
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}


	    } else if (selection == 710) {
		if (cm.haveItem(4032101,1)) {
		    if (cm.canHold(4001716)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i4001716# 1개#를 구입 하셨습니다.");
			cm.gainItem(4032101, -2);
			cm.gainItem(4001716,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 9381) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2591264)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2591264 1개#를 구입 하셨습니다.");
			cm.gainItem(4032101, -5);
			cm.gainItem(2591264,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
             } else if (selection == 9385) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2591088)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2591088 1개#를 구입 하셨습니다.");
			cm.gainItem(4032101, -5);
			cm.gainItem(2591088,1);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
		    cm.dispose();

}
            } else if (selection == 742) {
		if (cm.haveItem(4032101, 1)) {
		    if (cm.canHold(2048721)) {
		        cm.sendOk("#r원템 보석#k으로 #r#i2048721 10개#를 구입 하셨습니다.");
			cm.gainItem(4032101, -2);
			cm.gainItem(2048721,10);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r원템 보석#k이 부족합니다.");
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
		cm.openNpc(9072201);
		return;





		}
	}
}