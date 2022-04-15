
/*

	MapleStory 1.2.246 Varon Team Script Maker	Scripted By Varon Team :: MelnoK


	SCRIPT MAKER : 멜론K

	NPC ID : 2144010

	NPC NAME : 아카이럼

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
        cm.sendYesNo("내 오랜 계획을 물거품으로 만든 녀석들이 이렇게 제 발로 찾아와주니 정말 기쁘기 그지 없군.\r\n\r\n#r그 댓가로 세상에서 제일 고통스러운 죽음을 선사해 주마!");
        cm.playSound(false,"Sound/Voice.img/akayrum/3")
    } else if (status == 1) {
        cm.spawnMob(8860007,446,-181);
        cm.removeNpc(cm.getPlayer().getMapId(), 2144010);
        cm.dispose();
    }
}
