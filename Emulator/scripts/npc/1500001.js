var status = -1;

function start() {
	var vh = cm.itemQuantity(4000994); // ������ ���� ����
	var zs = cm.itemQuantity(4000995); // ������ å����
	var hs = cm.itemQuantity(4000996); // �̽��� ����
	var pb = cm.itemQuantity(4000997); // ������ ��
	    if (vh >= 35 && zs >= 35 && hs >= 35 && pb >= 35){
		var sel = "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L3##b��� �� ��ƿԾ��.!~ ���� ������!#k#l\r\n\r\n";
		} else {
		sel = "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##r������ ��� ������ ���߾��...#k#l\r\n\r\n";
            }
	    if (cm.getPlayer().getMapId() == 100030301){
		var sel2 = "#L1##b[����]#k ���� �ٷ�.. ������ �κ�� �̵��ϱ�#l";
		} else {
		sel2 = "#L2##r[������]#k �̸�.. ����Ʈ�� �������� �̵��ҷ���..#l";
            }
	if (cm.getPlayer().getLevel() <= 200 && cm.getPlayer().getMapId() == 100030301) {
	    var chat0 = "�츮 #r������ �п�#k ����...���� #b����� ä��#k ����� ���ؼ�..\r\n"
	    chat0 += "���� ��� �� ����̰� �ִٳ�.. ������ �׸� ���ؼ���\r\n";
	    chat0 += "���� ���ڿ� �η��� �ʿ�����.. �������μ� �ſ� �δ���\r\n";
	    chat0 += "���� �������� ����.. �� ������ �ſ� ��ó�ϱ⵵ �ϰŵ�..\r\n�׷��� �ڳװ� ���� �� �����ְڳ�?\r\n";
            chat0 += ""+sel2+"\r\n��";
	    cm.sendFriendsSimple(chat0,true);
        } else if (cm.getPlayer().getLevel() <= 200 && cm.getPlayer().getMapId() == 101072000) {
            var chat = "#fn������� Extrabold#�츮 #r������ �п�#k ����...���� #b����� ä��#k ����� ���ؼ�..\r\n";
	    chat += "���� ��� �� ����̰� �ִٳ�.. ������ �׸� ���ؼ���\r\n";
	    chat += "���� ���ڿ� �η��� �ʿ�����.. �������μ� �ſ� �δ���\r\n";
	    chat += "���� �������� ����.. �� ������ �ſ� ��ó�ϱ⵵ �ϰŵ�..\r\n�׷��� �ڳװ� ���� �� �����ְڳ�?\r\n";
            chat += "\r\n--------------------------------------------------------------------------------\r\n";
            if (cm.getQuestStatus(400) == 0) {
	    chat += "#r[����]#k #i4310129# #b��Ӹ��� ����#k #r30 ��#k\r\n#r[����]#k #i1142681# #b#z1142681##k #r�ý��� 200 / ��, �� 200#k\r\n";
            } else {
	    chat += "#r[����]#k #i4310129# #b��Ӹ��� ����#k #r5 ��#k";
            }
	    chat += "\r\n--------------------------------------------------------------------------------\r\n";
            chat += "                          #d[��û ������ ���]#k\r\n";
            chat += "--------------------------------------------------------------------------------\r\n";
	    chat += "#i4000994# #z4000994#            #d("+vh+"/35)#k\r\n";
	    chat += "#i4000995# #z4000995#                 #d("+zs+"/35)#k\r\n";
	    chat += "#i4000996# #z4000996#                     #d("+hs+"/35)#k\r\n";
	    chat += "#i4000997# #z4000997#                        #d("+pb+"/35)#k\r\n";
	    chat += "--------------------------------------------------------------------------------\r\n";
	    chat += ""+sel+"";
	    chat += "--------------------------------------------------------------------------------\r\n";
            chat += ""+sel2+"";
	    cm.sendSimple(chat);
	} else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ���� 200 ������ ĳ����\r\n- ����Ʈ�� ���� �Ǵ� ������ �κ� ���� �÷��� ����#k",9062004);
	cm.dispose();
        }
}
function action(mode, type, selection) {
        cm.dispose();
	if (selection == 0) {
			 cm.sendOk("#fn������� Extrabold##r���� ���� ���� ���� �ɰԳ�..#k");
		         cm.dispose();
	} else if (selection == 1) {
			 cm.warp(101072000,0);
		         cm.dispose();
	} else if (selection == 2) {
			 cm.warp(100030301,0);
		         cm.dispose();
	} else if (selection == 3) {
        if (cm.getQuestStatus(400) == 0) {
	    if (cm.haveItem(4000994, 35) && cm.haveItem(4000995, 35) && cm.haveItem(4000996, 35) && cm.haveItem(4000997, 35)) {
		 if (cm.canHold(4310129) && cm.canHold(1142681)) {
			 cm.sendOk("#fn������� Extrabold#���п� #r����� ä��#k �� ����ϱⰡ �ξ� ����������..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310129# #b��Ӹ��� ����#k #r30 ��#k\r\n#i1142681# #bĿ���� ��Ų �ַ� ����#k #r(�ý��� 200 / ��, �� 200)#k");
			 cm.gainItem(4000994, -35);
			 cm.gainItem(4000995, -35);
			 cm.gainItem(4000996, -35);
			 cm.gainItem(4000997, -35);
			 cm.gainItem(4310129, 30);
			 cm.setAllStat(1142681,200,200,0);
	                 cm.forceStartQuest(400);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ �Ǵ� ��� â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r������.. ���� ������ ���Ѱ� ����..#k");
		 cm.dispose();	
		 }
      } else {
	    if (cm.haveItem(4000994, 35) && cm.haveItem(4000995, 35) && cm.haveItem(4000996, 35) && cm.haveItem(4000997, 35)) {
		 if (cm.canHold(4310129)) {
			 cm.sendOk("#fn������� Extrabold#�� �ٽ� �� �����༭ #b����� ä��#k �� ����ϱⰡ �ξ� ����������..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310129# #b��Ӹ��� ����#k #r5 ��#k");
			 cm.gainItem(4000994, -35);
			 cm.gainItem(4000995, -35);
			 cm.gainItem(4000996, -35);
			 cm.gainItem(4000997, -35);
			 cm.gainItem(4310129, 5);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r������.. ���� ������ ���Ѱ� ����..#k");
		 cm.dispose();	
		 }
      }
	} else {
	cm.dispose();		
}
}