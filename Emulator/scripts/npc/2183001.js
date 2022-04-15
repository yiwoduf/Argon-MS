
/*

	MapleStory 1.2.246 Varon Team Script Maker	Scripted By Varon Team :: MelonK


	SCRIPT MAKER : 키네시스

	NPC ID : 2183001

	NPC NAME : 메디사

*/

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
      cm.dispose();
      cm.openNpc(2184000);
    }
}
