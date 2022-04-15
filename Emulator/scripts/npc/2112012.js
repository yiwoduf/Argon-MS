
var status = -1;
function action(mode, type, selection) {
    if (mode == 1 && type != 1) {
        status++;
    } else {
        if (type == 1 && mode == 1) {
            status++;
            selection = 1;
        } else if (type == 1 && mode == 0) {
            status++;
            selection = 0;
        } else {
            cm.dispose();
            return;
        }
    }
    mapid = cm.getPlayer().getMapId()
    switch (mapid) {
        case 926100500:
        case 926110500:
            {
                var em = cm.getEventManager(mapid == 926100500 ? "Romeo" : "Juliet");
                if (em.getProperty("persuade_urete") != null) {
                    if (status == 0) {
                        cm.sendNext("#fn������� Extrabold#�̷�����.. ���� �׵��� �׾ƿ� ��� ���� �Ұ� ���Ҿ�...\r\n#b #L0#������ �ƹ��͵� �����. ����� ��� ������ �����̵� �ٽ� ������ �� �ֽ��ϴ�.#l")
                    } else if (status == 1) {
                        cm.sendNext("#fn������� Extrabold#�׷��� �����ִ� ��ô ����. �����δ� ����Ƽ�ƿ� �����ϵ��� �ϰھ�.");
                        cm.playerMessage(6, "#fn������� Extrabold#�����״� ������ ���ĸ԰� ����Ƽ�ƿ� �����ϰڴٰ� ���Ѵ�.");
                    } else if (status == 2) {
                        cm.gainExp(10500);
                        cm.forceStartQuest(7072, "1");
                        cm.playerMessage(6, "#fn������� Extrabold#�����׸� ���ϴµ� �����Ͽ� �߰� ����ġ�� ���޵˴ϴ�.");
                        cm.warp(mapid + 100);
                        cm.dispose();
                    }
                } else {
                    cm.warp(mapid + 100);
                    cm.dispose();
                }
                break;
            }
        case 926100600:
        case 926110600:
            {
                if (status == 0) {
                    cm.sendSimple("#fn������� Extrabold#���ϴ� �� �����Ű�..?\r\n#L0##v1122010# #b#z1122010##k #r(�ý��� 500 / ��, �� 500)#k ��ȯ\r\n             > #d#z4001159# #r50 ��#k#l");
                } else if (status == 1) {

                if (selection == 0) {
            		if(cm.haveItem(4001159,50)) {
                	if (cm.canHold(1122010)) {
	            	cm.gainItem(4001159, -50);
	            	cm.setAllStat(1122010,500,500,0);
                    	cm.sendOk("#fn������� Extrabold##d����� ���� ���Ҵ°�..?#k\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i1122010# �� ȹ�� �Ͽ����ϴ�.");
                    	cm.dispose();
                	} else {		         
                    	cm.sendOk("#fn������� Extrabold##r���â�� �� ĭ �̻� ����ְԳ�..#k");
                    	cm.dispose();	
	        	}
	     	 	} else {		         
                 	cm.sendOk("#fn������� Extrabold##r#z4001159#�� ������ �� ����..#k");
                 	cm.dispose();	
	     		}
		}

                } 
                break;
            }
    }
}