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
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
    if (cm.getPlayer().getMapId() == 100030301) {
        var sumi = "#fn������� Extrabold#�̷�... �������...? ģ�� ���� �Ҿ������ ���Ҿ�... \r\n��¼��...? ���� �� ���������� ��������... ���ν�.. ������...\r\n\r\n";
    if (!cm.haveItem(4031039,1)) {
        sumi += "#fs11##fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#fn����##L1##d������ �Ҿ���� ����";
    } else {
        sumi += "#fs11##fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#fn����##L2##d������ �Ҿ���� ����";
    }
        cm.sendSimple(sumi);
    } else {
        cm.dispose();
    }
    } else if (status == 1) {
            if (selection == 2 ) {
	cm.sendOk("#fn������� Extrabold#�� �����༭ ���� ����! �̰� �� ���� �����̾�!\r\n\\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#i4310129# #b��Ӹ��� ����#k #r1 ��#k");
	cm.gainItem(4031039,-1);
	cm.gainItem(4310129, 1);
	cm.forceStartQuest(500);
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
        } else {
        cm.sendNextS("#fn������� Extrabold##d(��û ����� ���̴� ���� ���̰� �ִ�. ���������� �����..)",2);
        }
    } else if (status == 2) {
        cm.sendNextPrevS("#fn������� Extrabold##b���⡦? ���� �� �־�..?#k",2);
    } else if (status == 3) {
        cm.sendNextPrev("#fn������� Extrabold#�� ���߾�.. �쿡����_�� ģ�� ���� �׷��� ���� �Ҿ�����ٴ�..\r\n���� ��.. �賭��.. #b����ö ��#k ���� �Ҿ���� �ž�...�Ф�\r\n��ü.. ��! �ФС� ��.. ���� �������� ��������..?");
    } else if (status == 4) {
        cm.sendNextS("#fn������� Extrabold##d(��⸦ ���� �ʾƵ� � ������ �� �� ����, ��� �ұ�?)#k\r\n\r\n#fs13##L1##b���̸� �����ش�.\r\n#L2#�� �� ����? �� �� ����.#k",2);
    } else if (status == 5) {
            if (selection == 2) {
	cm.sendOkS("#fn������� Extrabold##b���̰� �״� ���� �˺� �ƴ���! �ϴ��ų� ����..#k",2);
	cm.dispose();
	} else {
        	cm.sendYesNo("#fn������� Extrabold##fs15#����..!? #fs12#���� ���� �����ִ°ž� #b#h ##k !?\r\n�ų���!! ����..!! ����.. ���� ����!! �Ф�..\r\n���� ã�ƿ� �شٸ� ���� �ʿ��� ������ �Ǵ°� �ٰ�!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#i4310129# #b��Ӹ��� ����#k #r1 ��#k\r\n\r\n#d�׷� ���� �ٷ� �Ҿ���� ���� ã���� ����..??#k");
    }
    } else if (status == 6) { 
        cm.warp(910360000,0);
        cm.sendOk("#fn������� Extrabold#�� #b����#k �� ã���� �ٽ� ������ ����! �׷� ��Ź�Ұ�..!!");
      }
    }

