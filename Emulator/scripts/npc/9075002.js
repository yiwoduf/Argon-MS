

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
         
	       var Lcoin = cm.itemQuantity(4033076);
               //var Lcoin2 = cm.itemQuantity(4033825);
                
	       var chat = "\r\n#L998#";
	       chat += "#r#e���� #b#h0##k����#r#i4033076# ����ī�� ¡ǥ ���� #r#e"+ Lcoin +" #n#k#k#n\r\n"
                
               chat+="         ������������        #k #e#b�Ŀ�����Ʈ #r"+cm.getRC()+"#b��#n#k"
	       
	       
              

               
	       // chat += "\r\n\r\n#L998##r#i2028048#[����] #e#r2,000#k#n(��)#L6125# #i4031345##b[��� ��ȣ��]#k#e#r(1��)#n#k #e#r#k#n";
	       
                chat += "\r\n\r\n#L998##r#i4033076#  #e#r25#k#n(��)#L3746# #i4310119#[�ʿ���ǳ��] #e#r200��#k#n";

                  chat += "\r\n\r\n#L998##r#i4033076#  #e#r125#k#n(��)#L4000# #i4310119#[�ʿ���ǳ��] #e#r1000��#k#n";

 
                 //chat += "\r\n\r\n#L998##r#i4033076#  #e#r100#k#n(��)#L3726# #i4031054#[������ ���� ����] #e#r30��#k#n";

               chat += "\r\n\r\n#L998##r#i4033076#  #e#r200#k#n(��)#L3# #i3015049#[����� ��������] #e#r1��#k#n";
               

	       
               chat += "\r\n\r\n#L998##r#i4033076#  #e#r300#k#n(��)#L710# #i2040727#[�̲��� ���� �ֹ���] #e#r1��#k#n"
	       
	       chat += "\r\n\r\n#L998##r#i4033076#  #e#r300#k#n(��)#L7184# #i3015003#[#b���� ��������#k] #e#r1��#k#n"
              chat += "\r\n\r\n#L998##r#i4033076#  #e#r300#k#n(��)#L3999# #i3010979##r[#r����ī ��������#k]#k #e#r1��#k#n";
              
             chat += "\r\n\r\n#L998##r#i4033076#  #e#r333#k#n(��)#L1004# #i1102766#[#e#d�ý���3000,����200#n#k] #e#r1��#k#n";
             chat += "\r\n\r\n#L998##r#i4033076#  #e#r400#k#n(��)#L3948# #i1672040##r[#rƼŸ�� ��Ʈ#k]#k #e#r1��#k#n\r\n";
chat += "#d#e������������������[�ý���300,����100]�� #n#k#k#n"

chat += "\r\n\r\n#L998##r#i4033076#  #e#r444#k#n(��)#L3951# #i1003390##r[#e#d���� �������� ����#n#k]#k #e#r1��#k#n\r\n";
chat += "#b#e������������������[�ý���4,000,����400]�� #n#k#k#n"
//chat += "\r\n\r\n#L998##r#i4033076#  #e#r888#k#n(��)#L3938# #i1112586##r[#e#d��ũ ������ ����#n#k]#k #e#r1��#k#n\r\n";
//chat += "#b#e������������������[�ý���4,000,����2,000]�� #n#k#k#n"
//chat += "#r#e�ѤѤѤѤ�[���������� �ߺ�����Ұ���]�ѤѤѤѤ�#n#k#k#n"
 chat += "\r\n\r\n#L998##r#i4033076#  #e#r1111#k#n(��)#L3921# #i1702400##r[#e#d�䳢����#n#k]#k #e#r1��#k#n";
 chat += "#b#e����������������������������[�ý���3,000,����2,000]�� #n#k#k#n"

	    //   chat += "\r\n\r\n#L998##r#i4033076#  #e#r2222#k#n(��)#L742# #i1142661##e#r[�ý���7000,����700]#n#k #e#r#k#n\r\n"; 

             //  chat += "\r\n\r\n#L998##r#i4033076#  #e#r2222#k#n(��)#L6000# #i1142660##e#r[�ý���7000,����700]#n#k #e#r#k#n\r\n\r\n#l";

            //   chat += "#r#e�ѤѤѤѤѤѤ�{��üä�ñ��#b[���мǿա�]#k}�Ѥ� #n#k#k#n"
	       

                 chat += "\r\n\r\n#L998##r#i4033076#  #e#r4444#k#n(��)#L3933# #i1102699##r[#e#d������ ���׸� ����#n#k]#k #e#r1��#k#n\r\n";
chat += "#b#e������������������[�ý���7,000,����3,000]�� #n#k#k#n"


	       //chat += "\r\n\r\n#L998##r#i4001187#  #e#r5,000#k#n (����)#L9381# #i1012003#[�ý���3000,����300] #e#r1��#k#n"
	       
	     
	      
	       //chat += "\r\n\r\n#L998##r#i4310088# ���� #e#r5#k#n ��#L9385# #i2591088# #e#r1��[������ �ñ׳ʽ� �ҿ�]#k#n"

//chat += "\r\n\r\n#L998##r#i4033076#  #e#r5000#k#n(��)#L9000# #i2434734##e#r[����� ��������Ų]#n#k #e#r#k#n\r\n\r\n#l";
	    


	   

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
if (cm.haveItem(4033076, 300)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i3010979# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -300);
                        cm.gainItem(3010979,1);
			cm.dispose();
		    } else {
		        cm.sendOk("��ġĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 9000) {
if (cm.haveItem(4033076, 5000)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i2434734# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -5000);
                        cm.gainItem(2434734,1);
			cm.dispose();
		    } else {
		        cm.sendOk("�Һ�ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3746) {
if (cm.haveItem(4033076, 25)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i4310119# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -25);
                        cm.gainItem(4310119,200);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3726) {
if (cm.haveItem(4033076, 100)) {
		    if (cm.canHold(4031054)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i4031054# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -100);
                        cm.gainItem(4031054,30);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3938) {
if (cm.haveItem(4033076, 888)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1112586# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -888);
                        cm.gainSponserItem(1112586,'[�ƹ��ų� �¶���]',4000,2000,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 4000) {
if (cm.haveItem(4033076, 125)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i4310119# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -25);
                        cm.gainItem(4310119,2000);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3921) {
if (cm.haveItem(4033076, 1111)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1702400# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -1111);
                        cm.gainSponserItem(1702400,'[�ƹ��ų� �¶���]',3000,2000,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3933) {
if (cm.haveItem(4033076, 4444)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1102699# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -4444);
                        cm.gainSponserItem(1102699,'[�ƹ��ų� �¶���]',7000,3000,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3948) {
if (cm.haveItem(4033076, 400)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1672040# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -400);
                        cm.gainSponserItem(1672040,'[�ƹ��ų� �¶���]',300,100,9);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3951) {
if (cm.haveItem(4033076, 444)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1003390# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -444);
                        cm.gainSponserItem(1003390,'[�ƹ��ų� �¶���]',4000,400,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();
}
}  if (selection == 6125) {
		if(cm.getRC() >=2000) {
		    if (cm.canHold(4031345)) {
			cm.gainItem(4031345,1);
		        cm.sendOk("#r�Ŀ� ����Ʈ 2,000��#k���� #i4031345##d[#z4031345#]#k�� �����ߴ�.");
			cm.loseRC(2000);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
                } else {
		    cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�.");
		    cm.dispose();
		}
			
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
		if (cm.haveItem(4033076, 300)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i3015003# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -300);
                        cm.gainItem(3015003, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("��ġâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
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
		if (cm.haveItem(4033076, 200)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i3015049# 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -200);
			cm.gainItem(3015049,1);
			cm.dispose();
		    } else {
		        cm.sendOk("��ġâ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
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
		if (cm.haveItem(4033076, 333)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1102766#[���� ���� �ƿ��] 1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -333);
			cm.gainSponserItem(1102766,'[�ƹ��ų� �¶���]',3000,200,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���â�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
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
		if (cm.haveItem(4033076,300)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#300���� #r#i2040727# 1��#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -300);
			cm.gainItem(2040727,1);
			cm.dispose();
		    } else {
		        cm.sendOk("�Һ�â�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
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
		if (cm.haveItem(4033076, 2222)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1142661#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -2222);			
                        cm.gainSponserItem(1142661,'[�ƹ��ų� �¶���]',7000,700,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
		    cm.dispose();

}

 } else if (selection == 6000) {
		if (cm.haveItem(4033076, 2222)) {
		    if (cm.canHold(4033076)) {
		        cm.sendOk("#r����ī�� ¡ǥ#k�� #r#i1142660#�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4033076, -2222);			
                        cm.gainSponserItem(1142660,'[�ƹ��ų� �¶���]',7000,700,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r����ī�� ¡ǥ#k�� �����մϴ�.");
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
		cm.openNpc(9075002);
		return;





		}
	}
}