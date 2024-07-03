
var status = 0;

function start() {
	status = -1;
	action(1,0,0);
}


function action(mode , type , selection){
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0 && (status == 0)) {
		cm.sendOk("안녕히 가세요.");
		cm.dispose();
	} 
	if (mode > 0)
	    status++;
	else
	    status--;
	if (status == 0) {
    		cm.sendYesNo("세드하 라델중 나가시겠습니까?");
        	
        } else if (status == 1) {
		cm.getPlayer().getMap(680000000).setTeyp(0);
		cm.getPlayer().setKeyValue2("Raed",0);
		cm.getPlayer().getMap(680000000).KillAllMonster(true);
		cm.warp(0);

	}
}
