var status = 0;

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
		var jessica = "#fn������� Extrabold#��⵵.. �ɷµ� ������.. �� ��������..\r\n";
		jessica += "#L1##r5 õ�� �޼�#k - #d�ɷ��� �ϴ��� ��..#k\r\n"
		jessica += "#L0##b����ö �ⱸ ����Ʈ..#k\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
                cm.warp(100030301);
	} else if (selection == 1) {
                if(cm.getMeso() >= 50000000){
                cm.gainMeso(-50000000);
                cm.giveBuff(30021237,1);
                cm.dispose();
                }else{
                cm.sendOk("#fn������� Extrabold##r�����.. �繰�� �ɷ��� ���� ��..#k");
		cm.dispose();
		}
	}
}
}
}