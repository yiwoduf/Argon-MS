/*
 * 프로젝트 : 1.2.214 SpiritStyle
 * Script Author : 하요(ifhayo)
 * 이 주석은 지우지 않아주셨으면 좋겠습니다.
 *
 */


importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var status = 0;
var itemid = new Array(3010700, 3010681, 3015326, 3015440, 3010021, 3010062, 3010000, 3015111, 3015111, 3015434, 3015433, 3015438, 3015438, 3015311, 3015278, 3010570, 3010130)
var itemNed = 2430686

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
	itemSet = itemid[Math.floor(Math.random() * itemid.length)];
	var itemQty = 1
	cm.gainItem(itemSet, itemQty);
	cm.gainItem(itemNed, -1);
	cm.getPlayer().send(MainPacketCreator.getGMText(6, "아이템을 획득하였습니다. ("+Packages.server.items.ItemInformation.getInstance().getName(itemSet)+")"));
	cm.dispose();
	}
}
}