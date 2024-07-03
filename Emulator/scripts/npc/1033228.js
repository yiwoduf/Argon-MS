var status = 0;
var mapid = Array(280030100,240060200,271040100,230040420,270050100,262031300,401060200,280030001,240060201,211070102,272020200,262031300,270051100,910700300,105200310);
var mobcode = Array(1,2,8850011,9300461,9300708,8870000,8880000,1,2,8840000,8860000,8820200,9303101,8930000,8930001);
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
if(cm.isLeader()) {
if(cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
cm.sendYesNo("포션은 든든하게 준비 하셨나요?\r\n자 그럼 이제부터 보스소탕을 시작 하겠습니다.");
} else {
cm.sendOk("이미 보스를 소환 하셨군요?");
cm.dispose();
}
} else {
cm.sendOk("포션은 든든히 준비 하셨나요?");
cm.dispose();
}
} else if (status == 1) {
if(cm.getPlayer().getMapId() == 271040100) {
cm.spawnMob(mobcode[2],cm.getPlayer().getPosition().getX(),cm.getPlayer().getPosition().getY());
}
if(cm.getPlayer().getMapId() == 401060200) {
cm.spawnMob(mobcode[6],cm.getPlayer().getPosition().getX(),cm.getPlayer().getPosition().getY());
}
if(cm.getPlayer().getMapId() == mapid[9]) {
cm.spawnMob(mobcode[9],cm.getPlayer().getPosition().getX(),cm.getPlayer().getPosition().getY());
}
if(cm.getPlayer().getMapId() == mapid[10]) {
cm.spawnMob(mobcode[10],cm.getPlayer().getPosition().getX(),cm.getPlayer().getPosition().getY());
}
if(cm.getPlayer().getMapId() == mapid[13]) {
cm.spawnMob(mobcode[13],cm.getPlayer().getPosition().getX(),cm.getPlayer().getPosition().getY());
cm.spawnMob(mobcode[14],cm.getPlayer().getPosition().getX(),cm.getPlayer().getPosition().getY());
}
cm.removeNpc(1033228);
cm.dispose();
}
}
}