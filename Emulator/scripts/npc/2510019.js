importPackage(Packages.packet.creators);

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
        cm.sendNext("#fn������� Extrabold#\r\n#r������ ::#k ������.... ��.. �� �༮����.. ��Ÿ����..");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����������!! #r������#k ��!",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r������ ::#k ��..�츰.. �� �༮�� ������ ������ ���Ҿ�..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k �ƾ�.. ���� ����������...",2);
    } else if (status == 4) {
        cm.sendNextPrev("#fn������� Extrabold#\r\n#r������ ::#k ���� ���� �� ���� �ʾҴٳ�..\r\n�ڳװ� �ε�.. �׸� �Ѿ��ְԳ�.. �״�.. �״�..");
    } else if (status == 5) {
        cm.warp (303090020,0);
	cm.showEffect(false,"Ereb/attack");
        cm.playSound(false,"Field.img/rootabyss/undo");
        cm.getPlayer().dropMessage(-1,"[���ζ� ����] �ż��� �� ������.. �� �����Ͽ����ϴ�.");
        cm.getPlayer().dropMessage(5,"[���ζ� ����] �ż��� �� ������.. �� �����Ͽ����ϴ�.");
        cm.sendNext("#fn������� Extrabold#�״�.. �и� �� ������ ���ٳ�..\r\n�츮�� �������� �ҽ��� ����� ��.. �� �� ������..\r\n\r\n�� �̻�.. #r������#k �� �Ҹ��� �鸮�� �ʴ´�.\r\n\r\n#d(�� �������� Ŭ���� ��Ȳ�� �˾ƺ���.)#k");
        cm.dispose();
    }
}