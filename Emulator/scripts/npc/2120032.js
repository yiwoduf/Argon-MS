/*

	Á¦ÀÛ Àè½¼¿Â¶óÀÎ
	2Â÷¼öÁ¤ Ä¡ ¿ì ¾¾ : projectchiu16@nate.com
	3Â÷¼öÁ¤ »ç ¶ó ¼¾ : saracen_dev@nate.com

*/

var k = "#fUI/StarCityUI.img/GradeInfo/icon_ss/0#"

function start() {
 if (true) {
	    var chat = "#fUI/UIMiniGame.img/custom/check# #fn³ª´®°íµñ Extrabold##fs17##b[System 1]#n\r\n";
            chat += "#fs13##k#e#L1#"+k+"Delivery#l#L2#"+k+"EQPBKP#L3#"+k+"Storage#l#L4#"+k+"Exchange#l#n\r\n\r\n";
            chat += "#fUI/UIMiniGame.img/custom/check# #fn³ª´®°íµñ Extrabold##fs17##b[System 2]#n\r\n";
            chat += "#fs13##k#e#L5#"+k+"Pet Shop#l#L6#"+k+"Bank#l#L7#"+k+"Rank#l#L8#"+k+"Guild#l#n\r\n\r\n";
			chat += "#fUI/UIMiniGame.img/custom/check# #fn³ª´®°íµñ Extrabold##fs17##b[System 3]#n\r\n";
            chat += "#fs13##k#e#L9#"+k+"Attendence#l#L10#"+k+"Cash Search#L11#"+k+"RemoveQs#l\r\n#L12#"+k+"Gift#l#n\r\n\r\n";
            chat += "#fs13##k#e#L13#"+k+"Beauty#l#L14#"+k+"Premium Search#L15#"+k+"Reset Item\r\n#L16#"+k+"Zero Beauty#k#l";

    	    cm.sendSimple(chat);
}
}
function action(mode, type, selection) {
	cm.dispose();
        if (selection == 1) {
	cm.dispose();
	cm.openNpc(9010009);

} else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9000217);

} else if (selection == 3) {
	cm.dispose();
	cm.openNpc(2400002);

} else if (selection == 4) {
	cm.dispose();
	cm.openNpc(1530545);

} else if (selection == 5) {
	cm.dispose();
	cm.openNpc(1530132);

} else if (selection == 6) {
	cm.dispose();
	cm.openNpc(9000018);

} else if (selection == 7) {
	cm.dispose();
	cm.openNpc(2192002);

} else if (selection == 8) {
	cm.dispose();
	cm.openNpc(2010011);

} else if (selection == 9) {
	cm.dispose();
	cm.openNpc(9330027);

} else if (selection == 10) {
	cm.dispose();
	cm.openNpc(9070207);

} else if (selection == 11) {
	cm.dispose();
	cm.openNpc(1052107);

} else if (selection == 12) {
	cm.dispose();
	cm.openNpc(9001040);

} else if (selection == 13) {
	cm.dispose();
	cm.openNpc(2159473);

} else if (selection == 14) {
	cm.dispose();
	cm.openNpc(9031003);

} else if (selection == 15) {
	cm.dispose();
	cm.openNpc(1032009);

} else if (selection == 16) {
	if (cm.getPlayer().getJob() == 10112) {
			cm.dispose();
	cm.openNpc(1302101);
	} else {
	cm.dispose();
	cm.sendOk("Please use the #e#r'Beauty'#n#k system instead if you are not Zero.");
	}
	    }
	}
    




