var status = -1;

function start() {
	var aa = cm.itemQuantity(4000878); // ��Ƽ�� ����ǰ
	var ab = cm.itemQuantity(4000881); // �÷ζ� ����ǰ
	var ac = cm.itemQuantity(4000883); // ��ũ �÷ζ� ����ǰ
	var ad = cm.itemQuantity(4000885); // ȣ�� ����ǰ
	var ae = cm.itemQuantity(4000887); // ������ ȣ�� ����ǰ
        var aaa = cm.itemQuantity(4000889); // ���׷� ȣ�� ����ǰ
	var af = cm.itemQuantity(4000891); // ������ ���� ����ǰ
	var ag = cm.itemQuantity(4000892); // Ÿ���� ���� ����ǰ
	var ah = cm.itemQuantity(4000893); // ������ �� ����ǰ
	var ai = cm.itemQuantity(4000894); // Ÿ���� �� ����ǰ
	    if (aa >= 10 && ab >= 10 && ac >= 20 && ad >= 20 && ae >= 30 && aaa >= 30 && af >= 40 && ag >= 40 && ah >= 50 && ai >= 50){
		var sel = "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L3##bŽ���� ��ġ��, �������� ���� ��ƿԽ��ϴ�.#k#l\r\n\r\n";
		} else {
		sel = "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##r���� Ž���� ��ġ�� ���߽��ϴ�.#k#l\r\n\r\n";
            }
	    if (cm.getPlayer().getMapId() == 100030301){
		var sel2 = "#L1##r[����]#k #d�ٷ� �Ϻ����� Ž�� ���� �� �̵��ϱ�#k#l";
		} else {
		sel2 = "#L2##r[������]#k #d�̸�.. ����Ʈ�� ���� ���� �̵��ϱ�#k#l";
            }
	if (cm.getPlayer().getLevel() >= 180 && cm.getPlayer().getMapId() == 100030301) {
	    var chat0 = "#fn������� Extrabold#�ڳ״�.. Ž���� �����ϴ°�?\r\n�� ����..Ž���� �ٴϴµ� ����..\r\n"
	    chat0 += "�� �� �Ϻ� ���� �ֺ� ����ó�� ���� �Ѿ���±�..\r\n";
	    chat0 += "�ڳװ� �� ��� ����ǰ ���� �� �����ְ�..���� �����ָ�\r\n";
	    chat0 += "�� Ư���� ���� Ž�� ���忡�� �߰��� �� ���� �ֵ�������..\r\n";
            chat0 += ""+sel2+"";
	    cm.sendSimple(chat0);
        } else if (cm.getPlayer().getLevel() >= 180 && cm.getPlayer().getMapId() == 240090000) {
            var chat = "#fn������� Extrabold#�ڳ״�.. Ž���� �����ϴ°�?\r\n�� ����..Ž���� �ٴϴµ� ����..\r\n";
	    chat += "�� �� �Ϻ� ���� �ֺ� ����ó�� ���� �Ѿ���±�..\r\n";
	    chat += "�ڳװ� �� ��� ����ǰ ���� �� �����ְ�..���� �����ָ�\r\n";
	    chat += "�� Ư���� ���� Ž�� ���忡�� �߰��� �� ���� �ֵ�������..\r\n";
            chat += "\r\n--------------------------------------------------------------------------------\r\n";
            if (cm.getQuestStatus(300) == 0) {
	    chat += "#r[����]#k #i4310129# #b��Ӹ��� ����#k #r30 ��#k\r\n#r[����]#k #i1122058# #b#z1122058##k #r�ý��� 200 / ��, �� 200#k\r\n";
            } else {
	    chat += "#r[����]#k #i4310129# #b��Ӹ��� ����#k #r10 ��#k";
            }
	    chat += "\r\n--------------------------------------------------------------------------------\r\n";
            chat += "                          #d[��û ������ ���]#k\r\n";
            chat += "--------------------------------------------------------------------------------\r\n";
	    chat += "#i4000878# #z4000878#                        #d("+aa+"/10)#k\r\n";
	    chat += "#i4000881# #z4000881#                       #d("+ab+"/10)#k\r\n";
	    chat += "#i4000883# #z4000883#              #d("+ac+"/20)#k\r\n";
	    chat += "#i4000885# #z4000885#                                #d("+ad+"/20)#k\r\n";
	    chat += "#i4000887# #z4000887#                    #d("+ae+"/30)#k\r\n";
	    chat += "#i4000889# #z4000889#                    #d("+aaa+"/30)#k\r\n";
	    chat += "#i4000891# #z4000891#               #d("+af+"/40)#k\r\n";
	    chat += "#i4000892# #z4000892#              #d("+ag+"/40)#k\r\n";
	    chat += "#i4000893# #z4000893#                            #d("+ah+"/50)#k\r\n";
	    chat += "#i4000894# #z4000894#                  #d("+ai+"/50)#k\r\n";
	    chat += "--------------------------------------------------------------------------------\r\n";
	    chat += ""+sel+"";
	    chat += "--------------------------------------------------------------------------------\r\n";
            chat += ""+sel2+"";
	    cm.sendSimple(chat);
	} else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ���� 180 �̻� �� ĳ����\r\n- ����Ʈ�� ���� �Ǵ� �Ϻ����� Ž�� ���� ���� �÷��� ����#k",9062004);
	cm.dispose();
        }
}
function action(mode, type, selection) {
        cm.dispose();
	if (selection == 0) {
			 cm.sendOk("#fn������� Extrabold##r�ڳ�.. ���� Ž�迡 ��̰� ���°��ΰ�?..\r\n�� ���� ����ǰ�� ��ƿ��Գ�..#k");
		         cm.dispose();
	} else if (selection == 1) {
			 cm.warp(240090000,0);
		         cm.dispose();
	} else if (selection == 2) {
			 cm.warp(100030301,0);
		         cm.dispose();
	} else if (selection == 3) {
        if (cm.getQuestStatus(300) == 0) {
	    if (cm.haveItem(4000878, 10) && cm.haveItem(4000881, 10) && cm.haveItem(4000883, 20) && cm.haveItem(4000885, 20) && cm.haveItem(4000887, 30) && cm.haveItem(4000889, 30) && cm.haveItem(4000891, 40) && cm.haveItem(4000892, 40) && cm.haveItem(4000893, 50) && cm.haveItem(4000894, 50)) {
		 if (cm.canHold(4310129) && cm.canHold(1122058)) {
			 cm.sendOk("#fn������� Extrabold#��ȣ~�ڳ�! Ž�谡�� ������ �ֱ�!\r\n�� ��Ӵ�� �� ���� �ְڳ�!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310129# #b��Ӹ��� ����#k #r30 ��#k\r\n#i1122058# #b#z1122058##k #r(�ý��� 250 / ��, �� 250)#k");
			 cm.gainItem(4000878, -10);
			 cm.gainItem(4000881, -10);
			 cm.gainItem(4000883, -20);
			 cm.gainItem(4000885, -20);
			 cm.gainItem(4000887, -30);
			 cm.gainItem(4000889, -30);
			 cm.gainItem(4000891, -40);
			 cm.gainItem(4000892, -40);
			 cm.gainItem(4000893, -50);
			 cm.gainItem(4000894, -50);
			 cm.gainItem(4310129, 30);
			 cm.setAllStat(1122058,250,250,0);
	                 cm.forceStartQuest(300);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ �Ǵ� ��� â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r�ڳ�.. ���� Ž�迡 ��̰� ���°��ΰ�?..\r\n�� ���� ����ǰ�� ��ƿ��Գ�..#k");
		 cm.dispose();	
		 }
      } else {
	    if (cm.haveItem(4000878, 10) && cm.haveItem(4000881, 10) && cm.haveItem(4000883, 20) && cm.haveItem(4000885, 20) && cm.haveItem(4000887, 30) && cm.haveItem(4000889, 30) && cm.haveItem(4000891, 40) && cm.haveItem(4000892, 40) && cm.haveItem(4000893, 50) && cm.haveItem(4000894, 50)) {
		 if (cm.canHold(4310129)) {
			 cm.sendOk("#fn������� Extrabold#��ȣ~�ڳ�! �������̱�! �ᱹ Ž�谡�� ���� �ȱ�� �Ѱհ�?!\r\n�� ��Ӵ�� �� ���� �ְڳ�!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310129# #b��Ӹ��� ����#k #r10 ��#k");
			 cm.gainItem(4000878, -10);
			 cm.gainItem(4000881, -10);
			 cm.gainItem(4000883, -20);
			 cm.gainItem(4000885, -20);
			 cm.gainItem(4000887, -30);
			 cm.gainItem(4000889, -30);
			 cm.gainItem(4000891, -40);
			 cm.gainItem(4000892, -40);
			 cm.gainItem(4000893, -50);
			 cm.gainItem(4000894, -50);
			 cm.gainItem(4310129, 10);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r�ڳ�.. ���� Ž�迡 ��̰� ���°��ΰ�?..\r\n�� ���� ����ǰ�� ��ƿ��Գ�..#k");
		 cm.dispose();	
		 }
      }
	} else {
	cm.sendOk("#fn������� Extrabold##b�ε�.. Ž���� �ŷ��� �˱� �ٶ��..#k");
	cm.dispose();		
}
}