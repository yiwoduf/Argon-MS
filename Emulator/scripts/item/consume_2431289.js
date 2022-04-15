var status;
var itemid = Array(3010000,3010000,3010000,3010000,3010000,3010000,5204007,5204009,5204012,3010110,3010131,3010194,3010206,3010423,3010435,3010519,3010541,3010878,3010964,3014003,3014055,3010097);
var number = Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
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
		cm.gainItem(itemid[rand], number[rand]);
		cm.gainItem(2431289, -1);
		cm.dispose();
        } else { 
            cm.dispose();
        }
    }
}
