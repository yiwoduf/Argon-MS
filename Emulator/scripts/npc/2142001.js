importPackage(Packages.constants);

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 10 && mode == 0) {
	cm.sendOk("�׷��� �� �������� �����ټ� ���� �ٽ� �� �����غ�.");
	cm.dispose();
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
    if (cm.getPlayer().getMapId() == 4000041) {
    if (cm.getQuestStatus(9) == 1) {
       	cm.sendOk("��..�ڳױ��� �� ��Ÿ�� ���� �ڰ�.. ��ٷȴٰ�..\r\n#r�������� ���� ���谡#k�α� �ݰ��� \r\n���� �� ������ ��� #b�˷���#k��� �Ѵٳ�\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0##k  840 exp");
	cm.gainExp(840);
	cm.playerMessage(5, "[�˸�] ��� �˷������� ���� �ٽ� �ɾ ����Ʈ�� ���� �ϼ���.");
	cm.forceCompleteQuest(9);
	cm.dispose();
	} else {
	cm.sendNext("������ ����.. ��� �����̶� �ȿ��÷��� �Ŀ�..\r\n\r\n  #fUI/UIWindow2.img/UtilDlgEx/list0#\r\n#e#r#L1#[�ʼ�]#k#n (Lv.9) ������ ����");
	}
    } else {
	cm.sendOk("������.. ����..");
	cm.dispose();
    }
    } else if (status ==1) {
	cm.sendNext("���� �ݰ�����, #b#h ##k �츮 ������ �� ���� ȯ���ϳ�! �ڳ״� ��� �� ���ΰ�?");
    } else if (status ==2) {
	cm.sendNextPrevS("�׵��� �־��� �ϵ��� ���� �����ȴ�.",2);
    } else if (status ==3) {
	cm.sendNext("��.. �׷� ���� �־��� �ŷα� ���� #b���� �ƴ°�#k�� �Ȱ�����");
    } else if (status ==4) {
      	cm.sendNextPrevS("��? �׷� ���� �����̴� �� �˰� ��̱���? \r\n#r���͵��� �̻�#k���� �͵鵵 �� �װ͵�� #e����#n�� �������?",2);
    } else if (status ==5) {
       	cm.sendNextPrev("�׷�, ���� �ƴ°��� ��� ���ְٳ� ����.. �������κ��� 1���� ���̿��� �ž� �׳��� �ٸ� ������ #b������ ���#k #e�ϴÿ��� ����#n�� �ܶ� �� ���¿���");
    } else if (status ==6) {
       	cm.sendNextPrev("�׷��� �����ϴÿ��� ������ #e��û�� �Ҹ�#n�� �Բ� #b������ õ��#k�� �ƴٳ� �׷� ���� #b"+ServerConstants.serverName+"#k ���� ������ �տ��� ���ܹ��Ȱ� ����� �� �տ��� �ٸ� ����� �̾��� �ִ� �� ���ٳ�");
    } else if (status ==7) {
       	cm.sendNextPrevS("����.. �׷��ٸ� �� #r������ õ��#k�� ���� �� ������ Ȥ�� �ƽó���?",2);
    } else if (status ==8) {
       cm.sendNextPrev("�� ������ �и� #fs15##r#e�ƽ�Ÿ�ε�#n#k#fs12#�� ��θӸ����� ���� ���� ���µ� ���̾�.. #d����#k �� ���ְ� #b"+ServerConstants.serverName+"#k �� �ڽŵ� ������ ����� ���� �跫�� ù �����ΰ���..");
    } else if (status ==9) {
       cm.sendNextPrev("�ƹ����� ������ �ʿ��ѵ� ����� #r����#k�� ���� �ʴٳ�, ������ #b#h ##k! �ڳװ� �ٷ� #b"+ServerConstants.serverName+"#k �� ������ ���� �̶�� �� ���� �ϰ� ����!");
    } else if (status ==10) {
       cm.sendNextPrevS("������ ����.. #b����#k�� ���� #r��#k�� ���°ɿ�..?");
    } else if (status ==11) {
       cm.sendYesNo("�����̾� ���ݺ��� ������ #e����#n�� �ؼ� #r��#k�� �⸣�� �ȴٳ�, ���� �ð��� ������ �־�\r\n#b#h ##k, �ڳװ� ���� Ű��� ������ ���� ���� �Ǹ� ���� �ϰڳ�\r\n#fs15##fn������� Extrabold#��, #h #��  ������ ���� �غ��ڴ°�?");
    } else if (status ==12) {
       cm.warp(0,0);
       cm.gainExp(1242);
       cm.playerMessage(-1,"[�˸�] �������� ���� �ɾ� ��� ���� �ϼ���.");
       cm.playerMessage(5,"[�˸�] �������� ���� �ɾ� ��� ���� �ϼ���.");
    }
}
