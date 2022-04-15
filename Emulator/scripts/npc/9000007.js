importPackage(Packages.client);
importPackage(Packages.constants);

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
		//cm.showWZEffect("UI/UIWindow1.img/HofMEffect/teleport", 1);
        cm.sendOk("#fn³ª´®°íµñ ExtraBold##fs22##eÀºº°´Ô µÞ´ã ½ºÅ©¸³Æ®ÀÔ´Ï´Ù!");
        cm.dispose();
        return;
    }
}