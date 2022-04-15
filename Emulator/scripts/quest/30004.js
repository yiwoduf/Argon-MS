importPackage(Packages.server.quest);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        qm.dispose();
        return;
    } else {
        status++;
        if (status == 0) {

qm.sendOk("자, 여기 주문서!");
qm.gainItem(2431151,1)

qm.dispose();

}
}
}


function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {

qm.sendOk("자, 여기 주문서!");
if(qm.haveItem(2431151,1)) {
qm.gainItem(2431151,-1);
}
qm.gainItem(2431151,1);
qm.startQuest(30004);
qm.dispose();

}
}
}