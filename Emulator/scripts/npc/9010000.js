var status;
var itemid = Array(4310119,2450042,1112586,4310015,2049360);
var number = Array(1000,1,1,1000,1);
importPackage(Packages.tools.RandomStream);
importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);
function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
var rand = Randomizer.nextInt(itemid.length);
		cm.sendOk("축하해~ 시크릿 상자에서 #i" + itemid[rand] + "##b#z" + itemid[rand] + "#(" + number[rand] + ")가 나왔어");
		cm.dispose();
        } else { 
            cm.dispose();
        }
    }
}
