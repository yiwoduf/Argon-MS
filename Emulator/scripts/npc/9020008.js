/*
Cps ProJect

ī��(kai__)
unfix(unfix__)
��ȣ(kast1a)

*/
var status = 0;
var select = -1;
var load = 0;
var job = 0;
var level = 0;
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
	    var cps ="�����ϰ� �����ðڽ��ϱ�?\r\n";
	    cps += "#L1#�����Ѵ�.\r\n";		  
	    cm.sendSimple(cps);
} else if (selection == 1) {
	    cm.warp(921160000,0)
            cm.dispose();
}
}
}