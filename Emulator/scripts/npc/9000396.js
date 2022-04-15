

var status = -1;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";

importPackage(Packages.constants);


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
if (cm.getPlayer().getLevel() >= 100) {
        cm.sendGetText("\r\n           #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 데미지 스킨 상점 "+별+"\r\n#fs10##Cgray#                                     원하시는 메뉴를 선택해주세요.#k\r\n\r\n#fs11##b데미지 스킨#k 이 필요하신가요?\r\n구매를 위해서는 #i4310175# #bM 코인#k #r5 개#k 가 필요하며\r\n#b데미지 스킨 상자#k 를 오픈시 랜덤으로 #b데미지 스킨#k #r1 개#k 가 나온답니다.\r\n\r\n#i2434981# #fs12##b데미지 스킨 상자#k 를 #r몇 개#k 구매하실건가요?");
} else {
cm.sendOk("#fn나눔고딕 Extrabold##r데미지 스킨 상점은 레벨 100 이상만 이용 가능합니다.");
cm.dispose();
}
   } else if (status ==1) {
     text = cm.getText();
    if (text <= 0) {
     cm.sendOk("#fn나눔고딕 Extrabold##r최소 수량 1 개 이상부터 구매가 가능하답니다.#k");
     cm.dispose();
    } else {
if (cm.haveItem(4310175, cm.getText() * 5)) {
     if(cm.canHold(2434981)) {
     cm.gainItem(2434981, cm.getText());
     cm.gainItem(4310175, -cm.getText() * 5); 
     cm.sendOk("#fn나눔고딕 Extrabold##i2434981# #b데미지 스킨 상자#k #r"+cm.getText()+" 개#k 가 구매 완료 되었어요.");
    } else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없는 것 같아요.#k");
	cm.dispose();
	}
            } else {
                cm.sendOk("#fn나눔고딕 Extrabold##rM 코인의 갯수가 충분한지 확인해주세요.#k");
                cm.dispose();
            }
    }
}
}
