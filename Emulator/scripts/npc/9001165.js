var status = -1;
	       // ���ڸ� �ڵ� , ���ڸ� ȯ�� ����Ʈ
var itemlist = [[4001126,1],[4001126,1],[4001126,1]];// �Ǹ��Ͻô°� �������̶� �� �ֳ��� ?�������̶� ȯ������Ʈ�� �Ŀ�����Ʈ ��ȯ�̿�


function start() {
    status = -1;
    action (1, 0, 0);
}function action(mode, type, selection) {  //ȯ�� ��
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {

	var texts = "ȯ�� ����Ʈ �������Դϴ�. �޴��� �������ּ���\r\n";
	
	texts += "#L0#ȯ�� ����Ʈ �������� �����ϰڽ��ϴ�.\r\n";
		
	cm.sendSimple(texts);

	} else if (status == 1) {
		sel = selection;
		if (sel  == 0) {
                    cm.dispose();
                    cm.openNpc(2007);
		} else if (sel == 1) {
			cm.sendGetText("��ȯ�Ͻ� �׼��� �����ּ��� ���� ȯ�� ����Ʈ : #e" + cm.getPlayer().getGP());+"#n"
	}

     } else if (status == 2) {
	sele = selection;
			if (sel == 0) {
			cm.sendYesNo("�����Ͻ� �������� : #i" +  itemlist[sele][0] + " # #b#z"+itemlist[sele][0] + "##k �� �½��ϱ�?");
		} else if (sel == 1) {
				if (cm.getPlayer().getGP() > 10000) {
			
					cm.sendYesNo(cm.getText()+" �� �Ŀ�����Ʈ " + ( cm.getText() * 8 / 10 )+ " �� ��ȯ�Ͻðڽ��ϱ�?");

				} else {
					cm.sendOk("ȯ�� ����Ʈ�� �ּ� 1�� �̻� �̿��� �մϴ�.");
					}

		      } 
	} else if (status == 3) {
		money = cm.getText();
		   if (sel == 0) {
		       if (cm.getPlayer().getGP() > itemlist[sele][1]) {

			cm.getPlayer().gainGP(itemlist[sele][1]);
			cm.gainItem(itemlist[sele][0],1);
			cm.sendOk("���Ű� ���������� �Ϸ� �Ǿ����ϴ�.");
		 	cm.dispose();return;
	                  	       } else {
				cm.sendOk("ȯ�� ����Ʈ�� �����մϴ�.");
		 		cm.dispose();return;
				}
			} else if (sel == 1) {
                            if (cm.getPlayer().getGP() > money) {
			cm.getPlayer().gainGP(cm.getPlayer().getGP() - money);
			cm.getPlayer().gainRC(cm.getPlayer().getRC() + money * 8 / 10 );
			cm.sendOk("���������� ��ȯ �Ǿ����ϴ�. ");	
			cm.dispose();return;
                        } else {
				cm.sendOk("ȯ�� ����Ʈ�� �����մϴ�.");
		 		cm.dispose();return;
                        }
		       }
		}
}