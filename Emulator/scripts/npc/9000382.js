/*
�� ��ũ��Ʈ�� ���۱��� FoxDevelopTeam ���� Fox���� �ֽ��ϴ�.
���� : rinus_alt / fox_devel@nate.com / opharks (skype)
*/

var status = 0;
var select = -1;

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
			
			var warp = "�۹����� �̵��Ͻðڽ��ϱ�?\r\n\r\n";
			warp += "#L100000003#�۹��̵�#l";

			cm.sendSimple(warp);

		} else if (status == 1) {
			var map = selection;
			if (map >= 100000000) {
				cm.dispose();
				cm.warp(map,0);
			}
			
		}
	}
}