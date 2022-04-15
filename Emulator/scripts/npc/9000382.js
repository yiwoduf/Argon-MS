/*
위 스크립트의 저작권은 FoxDevelopTeam 팀장 Fox에게 있습니다.
문의 : rinus_alt / fox_devel@nate.com / opharks (skype)
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
			
			var warp = "작방으로 이동하시겠습니까?\r\n\r\n";
			warp += "#L100000003#작방이동#l";

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