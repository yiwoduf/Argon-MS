/*
 * Mady By Spirit(Spiritcube)
 */
var items = new Array(new Array(1190100,1,100), new Array(1190101,1,100), new Array(1190300,1,100), new Array(1190301,1,100), new Array(1190302,1,100), new Array(1190400,1,100));

function start() {
 var txt = "어떤 엠블렘을 구매하시겠습니까?  (개당1000만원)\r\n";
 for (var i = 0; i < items.length; i++) {
 txt += "#L"+i+"# #i"+items[i][0]+"# #z"+items[i][0]+"# (x "+items[i][1]+")\r\n";
 }
 cm.sendSimple(txt);
}

function action(m,t,s) {
 meso = items[s][2] * 100000;
 if (cm.getMeso() >= meso) {
 cm.gainMeso(-meso);
 cm.gainItem(items[s][0], items[s][1]);
 cm.sendOk("성공적으로 구매하였습니다.");
 } else {
 cm.sendOk("메소가 부족합니다.\r\n#b(아이템 가격 : "+meso+")");
 }
 cm.dispose();
}