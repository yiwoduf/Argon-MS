

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
	       chat += "#r#e���� #b#h0##k����#r#i4033825# ������ ���� ���� #r#e"+ Lcoin +" #n#k#k#n"
                
               
	       
	       

               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L1004# #i1482183#[�ý���1500,����250] #e#r1��#k#n";
	     
	       


               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3# #i1332242#[�ý���1500,����250] #e#r1��#k#n";
               

	       
               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3400# #i1342087#[�ý���1500,����250] #e#r1��#k#n"
	       
	       chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3401# #i1402214#[�ý���1500,����250] #e#r1��#k#n";
               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3402# #i1422156#[�ý���1500,����250] #e#r1��#k#n";
	        chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3403# #i1462208#[�ý���1500,����250] #e#r1��#k#n"; 
              
	        chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3404# #i1382226#[�ý���1500,����250] #e#r1��#k#n";
	        chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3405# #i1472230#[�ý���1500,����250] #e#r1��#k#n";
	      chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3406# #i1492194#[�ý���1500,����250] #e#r1��#k#n";
	       chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3407# #i1532112#[�ý���1500,����250] #e#r1��#k#n";
                chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3408# #i1452220#[�ý���1500,����250] #e#r1��#k#n";
               chat += "\r\n\r\n#L998##r#i4033825#  #e#r10#k#n(��)#L3409# #i1432182#[�ý���1500,����250] #e#r1��#k#n";
	       //chat += "\r\n\r\n#L998##r#i4310088# ���� #e#r5#k#n ��#L9385# #i2591088# #e#r1��[������ �ñ׳ʽ� �ҿ�]#k#n"
	    


	   

	       cm.sendSimple(chat);

	    }  if (selection >= 9999999) {
		    cm.dispose();
    } else if (selection == 1) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049361)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i2049361#  30��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
			cm.gainItem(2049361,30);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3999) {
		cm.dispose();
		cm.openNpc(2134012);	
    } else if (selection == 111) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102550)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1102550# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102550,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
    } else if (selection == 110) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102551)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1102551# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102551,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 109) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702455)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702455# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702455,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 2) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049704)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i2049704# 30��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
			cm.gainItem(2049704,30);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 108) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052661)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1052661# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052661,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 107) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1082549)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1082549# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1082549,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 106) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003965)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1003965# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003965,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 105) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702433)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702433# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702433,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1052587# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 104) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052587)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1052587# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052587,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 103) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1082493)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1082493# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1082493,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
            
}
	    } else if (selection == 102) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003776)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1003776# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003776,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 5558) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2048723)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i2048723# 10���� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
                        cm.gndnjs(2048723,10);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 100) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1052434)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1052434# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1052434,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();
}
              } else if (selection == 7184) {
		if (cm.haveItem(4033825, 6)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i2591233# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -6);
                        cm.gainItem(2591233, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("�Һ�â�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();
}
	    } else if (selection == 17) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112585)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112585# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112585,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4310088, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1142623# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -50);
                        cm.gndnjs(1142623,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4310088, 50)) {
		    if (cm.canHold(1142249)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1142249# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -50);
                        cm.gndnjs(1142249,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(4310088)) {
		        cm.sendOk("#rȫ�� ����#k���� �Ŀ�����Ʈ[1,000]�� ���� �ϼ̽��ϴ�.");
			cm.gainRC(1000);
                        cm.gndnjs(1112558,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	


	    } else if (selection == 3) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1332242# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1332242,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
 } else if (selection == 3400) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1342087# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1342087,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3401) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1402214# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1402214,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3402) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1422156# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1422156,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3403) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1462208# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1462208,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3404) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1382226# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1382226,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3405) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1472230# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1472230,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3406) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1492194# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1492194,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3407) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1532112# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1532112,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3408) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1452220# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1452220,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 3409) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1432182# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1432182,'[�ƹ��ų� �¶���]',1500,250,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 4) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(4310029)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i4310029# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
			cm.gainItem(4310029, 3);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 5) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2049300)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i2049300# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -5);
			cm.gainItem(2049300, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 7) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102450)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1102450# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102376,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 8) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102451)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1102451#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102451,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 81) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1102452)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1102452#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1102452,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 9) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702456)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702456# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -20);
			
                        cm.gndnjs(1702456,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 10) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702451)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702451# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702451,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 11) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1702457)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702457# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1702457,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 12) {
		if (cm.haveItem(4310088, 10)) {
		    if (cm.canHold(1003133)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1003133# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -10);
                        cm.gndnjs(1003133,50,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 13) {
		if (cm.haveItem(4310088, 20)) {
		    if (cm.canHold(1003636)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1003636# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -20);
                        cm.gndnjs(1003636,100,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 15) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112586)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112586# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112586,250,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 16) {
		if (cm.haveItem(4310088, 40)) {
		    if (cm.canHold(1112663)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112663# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -40);
                        cm.gndnjs(1112663,200,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 20) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112141)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112141# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112141,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 21) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112252)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112252# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(11112252,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 22) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112135)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112135# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112135,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 23) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1112238)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1112238# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1112238,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 24) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1702348)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702348 �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1702348,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 25) {
		if (cm.haveItem(4310088, 30)) {
		    if (cm.canHold(1702350)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i1702350# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -30);
                        cm.gndnjs(1702350,150,0,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 50) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5064000)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i5064000# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5064000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 51) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5062005)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i5062005# 50�� �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5062005, 50);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
	    } else if (selection == 52) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(5064100)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i5064100# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -1);
			cm.gainItem(5064100, 5);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
    } else if (selection == 1004) {
		if (cm.haveItem(4033825, 10)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1482183#[���� ��Ŭ] 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -10);
			cm.gainSponserItem(1482183,'[�ƹ��ų� �¶���]',1500,250,7);
			cm.dispose();
		    } else {
		        cm.sendOk("���â�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
} else if (selection == 8724) {
		if (cm.haveItem(4031054, 100)) {
		    if (cm.canHold(4031054)) {
		        cm.sendOk("#r������ ��������#k���� #r#i4033825#[������ ����] 1���� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4031054, -100);
			cm.gainItem(4033825, 1);
			cm.dispose();
} else {
		        cm.sendOk("��Ÿâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		    
		} else {
		    cm.sendOk("#r������ ��������#k�� �����մϴ�.");
		    cm.dispose();

}


	    } else if (selection == 710) {
		if (cm.haveItem(4033825,3)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#3���� #r#i1012028# 1��#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -3);
			cm.gainSponserItem(1012028,'[�ƹ��ų� �¶���]',3000,500,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
		    cm.dispose();

}
             } else if (selection == 9381) {
		if (cm.haveItem(4001187, 5000)) {
		    if (cm.canHold(4001187)) {
		        cm.sendOk("#r�����#k�� #r#i1012003 1��#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4001187, -5000);
			cm.gainSponserItem(1012003,'[�ƹ��ų� �¶���]',3000,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�����#k�� �����մϴ�.");
		    cm.dispose();

}
             } else if (selection == 9385) {
		if (cm.haveItem(4310088, 1)) {
		    if (cm.canHold(2591088)) {
		        cm.sendOk("#rȫ�� ����#k���� #r#i2591088 1��#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310088, -5);
			cm.gainItem(2591088,1);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#rȫ�� ����#k�� �����մϴ�.");
		    cm.dispose();

}
            } else if (selection == 742) {
		if (cm.haveItem(4033825, 13)) {
		    if (cm.canHold(4033825)) {
		        cm.sendOk("#r������ ����#k���� #r#i1142593 1��#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033825, -13);
			cm.gainSponserItem(1142593,'[�ƹ��ų� �¶���]',4000,400,0);
                        cm.gainSponserItem(1142499,'[�ƹ��ų� �¶���]',4000,400,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r������ ����#k�� �����մϴ�.");
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