/*

	제작 잭슨온라인
	2차수정 치 우 씨 : projectchiu16@nate.com
	3차수정 사 라 센 : saracen_dev@nate.com

*/
function start() {
 if (true) {
	    var chat = "#Cgray##e[ARGON ONLINE CONTENTS no.1]\r\n";
            chat += "#b#e#L1#Rebirth#l#L2#MapleMon#L3#Dream#l#L4#DmgCalc#l#n\r\n\r\n";
            chat += "#Cgray##e[ARGON ONLINE CONTENTS no.2]\r\n";
            chat += "#r#e#L5#BET!#l#L6#MiniGame#l#L7#Marry#l#L8#P vs. P#l#n\r\n\r\n";
            chat += "#Cgray##e[ARGON ONLINE CONTENTS no.3]\r\n";
            chat += "#d#e#L9#Tag#l#L10#Jewelry#L11#Trash#l#L12#Spinner#l#n\r\n\r\n";
            chat += "#Cgray##e[ARGON ONLINE CONTENTS no.4]\r\n";
            chat += "#k#e#L13#HOT Time#l#L14#Betting#l#L15#Feelin Lucky?#l#n\r\n\r\n";
    	    cm.sendSimple(chat);
}
}
function action(mode, type, selection) {
	cm.dispose();
        if (selection == 1) {
	cm.dispose();
	cm.openNpc(3003228);

} else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9000268);

} else if (selection == 3) {
	cm.dispose();
	cm.openNpc(1540315);

} else if (selection == 4) {
	cm.dispose();
	cm.openNpc(9000036);

} else if (selection == 5) {
	cm.dispose();
	cm.openNpc(3003150);

} else if (selection == 6) {
	cm.dispose();
	cm.warp(910002020, 0);
	cm.playerMessage(1, "젠에게 말을 걸어보세요.");

} else if (selection == 7) {
	cm.dispose();
	cm.warp(680000300, 0);
	cm.playerMessage(1, "문월하or비비안에게 말을 걸어보세요.");

} else if (selection == 8) {
	cm.dispose();
	cm.openNpc(9000254);

} else if (selection == 9) {
	cm.dispose();
	cm.warp(109090000);

} else if (selection == 10) {
	cm.dispose();
	cm.openNpc(9010015);

} else if (selection == 11) {
	cm.dispose();
	cm.openNpc(1012121);

} else if (selection == 12) {
	cm.dispose();
	cm.openNpc(9000155);

} else if (selection == 13) {
	cm.dispose();
	cm.openNpc(9000453);

} else if (selection == 14) {
	cm.dispose();
	cm.openNpc(9031004);

} else if (selection == 15) {
	cm.dispose();
	cm.openNpc(10200);

} else if (selection == 16) {
	cm.dispose();
	cm.openNpc(2010011);
	    }
	}
    




