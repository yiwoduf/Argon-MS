var status = -1;
var a = 1000;
var b = 800;
var c = 600;


function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
    if (cm.getPlayer().getMapId() == 100030301) {
        cm.sendOk("#fn������� Extrabold#�ɺ� ���ӿ� �������� ������?\r\n�װ� �ɺ��� �Ǵ°ž�! ���� ��հ���!?\r\n\r\n#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#b#L1#�ɺ� ���� ����\r\n#L2#���� �÷��� ���\r\n#L4#�ɺ� ���� ���ǥ\r\n#L3#������ ���� ���� Ƚ��");
    } else {
         if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= a) {
	cm.sendNext("#fn������� Extrabold##r[���� : ���� �ޱ�]#k\r\n\r\n                              �� #r1 ���#k �� ����� ���� ��\r\n                                        #i4310129# X #r10 ��#k\r\n\r\n#d�ɺ� ���� Ŭ���� ����!#k\r\n�ʴ� #r"+cm.getPinBallPoint()+" ��#k �� ����ؼ� #b��Ӹ��� ����#k #r10 ��#k �� ȹ���߾�!\r\n\r\n#r(������ ���� Ƚ�� :  "+cm.GetCount("�ɺ�", 6)+" ȸ)#k\r\n");
        } else if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= b && cm.getPinBallPoint() <= a - 1) {
	cm.sendNext("#fn������� Extrabold##r[���� : ���� �ޱ�]#k\r\n\r\n                              �� #r2 ���#k �� ����� ���� ��\r\n                                          #i4310129# X #r8 ��#k\r\n\r\n#d�ɺ� ���� Ŭ���� ����!#k\r\n�ʴ� #r"+cm.getPinBallPoint()+" ��#k �� ����ؼ� #b��Ӹ��� ����#k #r8 ��#k �� ȹ���߾�!\r\n\r\n#r(������ ���� Ƚ�� :  "+cm.GetCount("�ɺ�", 6)+" ȸ)#k\r\n");
        } else if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= c && cm.getPinBallPoint() <= b - 1) {
	cm.sendNext("#fn������� Extrabold##r[���� : ���� �ޱ�]#k\r\n\r\n                              �� #r3 ���#k �� ����� ���� ��\r\n                                          #i4310129# X #r4 ��#k\r\n\r\n#d�ɺ� ���� Ŭ���� ����!#k\r\n�ʴ� #r"+cm.getPinBallPoint()+" ��#k �� ����ؼ� #b��Ӹ��� ����#k #r4 ��#k �� ȹ���߾�!\r\n\r\n#r(������ ���� Ƚ�� :  "+cm.GetCount("�ɺ�", 6)+" ȸ)#k\r\n");
        } else if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= 0 && cm.getPinBallPoint() <= c - 1) {
	cm.sendNext("#fn������� Extrabold##r[���� : ���� �ޱ�]#k\r\n\r\n#d�ɺ� ���� Ŭ���� ���С�#k\r\n\r\n#h #, �ʴ� #b"+cm.getPinBallPoint()+" ��#k �� ����ؼ� �ƹ��͵� ���� ���߾�.. �Ǹ��̾�..\r\n\r\n#r(������ ���� Ƚ�� :  "+cm.GetCount("�ɺ�", 6)+" ȸ)#k\r\n");
        } else {
           if (cm.getPlayer().getMapId() == 910800200) {
	cm.sendYesNo("#fn������� Extrabold##r���� ������ �����ϰ� ���� �ϰھ�?#k");
        } else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ����Ʈ�� ���� ���� �÷��� ����#k",9062004);
	cm.dispose();
    }
    }
    }
    } else if (status == 1) {
        if (selection == 2) {
	cm.sendOk("#fn������� Extrabold#�ɺ� ������ ��Ʈ���� ���� �ɺ� ���� �ƴ� �ʰ� ���� ����!\r\nƨ��� ������ ȹ���ϴ� ����ִ� �̴� �����̾�!\r\n������ ��� ���� ��� �̰Թٷ� �ϼ����� �ƴϰھ�!?");
	cm.dispose();
        } else if (selection == 3) {
	cm.sendOk("                   #fn������� Extrabold##r(������ ���� ���� Ƚ�� : "+cm.GetCount("�ɺ�", 6)+" ȸ)#k");
	cm.dispose();
        } else if (selection == 4) {
	cm.sendOk("#fn������� Extrabold##r[�ɺ� ���� ���ǥ]#k\r\n\r\n��, ��. �ɺ� ���� ��� ǥ, ����, ������� �Ʒ��� ����.\r\n\r\n#b[1 ���]#k #i4310129# 10 �� : #d" + (a) + " �� �̻�#k\r\n#b[2 ���]#k #i4310129# 8 �� : #d" + (a - 1) + " �� ���� " + b + " �� �̻�#k\r\n#b[3 ���]#k #i4310129# 4 �� : #d" + (b - 1) + " �� ���� " + c + " �� �̻�#k\r\n#b[4 ���]#k #i4310129# 0 �� : #d" + (c - 1) + " �� ����#k\r\n\r\n#Cgray#(4 ����� Ŭ���� ���� �� ���ֵ˴ϴ�.)");
	cm.dispose();
        } else {
        if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= a) {
	cm.gainItem(4310129, 10);
	cm.warp(100030301,0);
	cm.resetPinBallPoint();
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
        } else if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= b && cm.getPinBallPoint() <= a - 1) {
	cm.gainItem(4310129, 8);
	cm.warp(100030301,0);
	cm.resetPinBallPoint();
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
        } else if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= c && cm.getPinBallPoint() <= b - 1) {
	cm.gainItem(4310129, 4);
	cm.warp(100030301,0);
	cm.resetPinBallPoint();
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
        } else if (cm.getPlayer().getMapId() == 910800250 && cm.getPinBallPoint() >= 0 && cm.getPinBallPoint() <= c - 1) {
	cm.warp(100030301,0);
	cm.resetPinBallPoint();
	cm.showEffect(false,"quest/carnival/lose");
        cm.playSound(false,"Field.img/Party1/Failed");
	cm.dispose();
        } else {
        if (cm.getPlayer().getMapId() == 100030301) {
	cm.sendYesNo("#fn������� Extrabold##r[�ɺ� ���� ����]#k\r\n\r\n����! ƨ��� ������ ��� �ɺ� ����! ���� �ٷ� �����ϰھ�?\r\n\r\n#b(���� �� �ɺ� ���� ������ �̵� �˴ϴ�.)");
        } else {  
	cm.warp(100030301,0);
	cm.resetPinBallPoint();
        cm.sendOk("#fn������� Extrabold##r�������� �� ��� �ְ� �����ϱ� �ٷ�..#k");
	cm.showEffect(false,"quest/carnival/lose");
        cm.playSound(false,"Field.img/Party1/Failed");
	cm.dispose();
        }
        }
        }
    } else if (status == 2) {
	if (cm.getPlayerCount(910800200) > 0) {
	cm.sendOk("#fn������� Extrabold##r��!, ���� �̹� �������� �÷��̾ �ִ°� ������?!..\r\n���ݸ� ��ٸ��ų�, �ٸ� ä�ο��� �ٽ� ���ڲٳ�!#k");
	cm.dispose();
	} else
        if (cm.CountCheck("�ɺ�", 6)) {
	cm.resetPinBallPoint();
	cm.warp(910800200, 0);
	cm.CountAdd("�ɺ�");
	cm.dispose();
           } else {
	cm.sendOk("#fn������� Extrabold##b#h ##k, �� ������ ���� Ƚ���� �ʰ� �� �� ������?\r\n\r\n#r�Ϸ翡 ���� ������ Ƚ���� 6 ȸ��..\r\n���� ����ϸ� �ٽ� ���� �ٷ�..#k");
	cm.dispose();
           }
}
}
