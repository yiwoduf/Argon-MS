 // Author : 멜론K
// Function : 상점
// 사용하실 때 이 주석은 지우지 말아 주셨으면 좋겠습니다.
importPackage(java.lang);
function start() {
status = -1;
action(1, 0, 0); }

function action(mode, type, selection) {

var reward = "#fUI/UIWindow.img/QuestIcon/4/0#";
itemlist = [2050004, 2000005, 2120000, 5370000,5076000,5076000,5190010,5190001,5190003,5190006,5190000] // 아템코드
qty = [100,1000,100,1,100,100,1,1,1,1,1] //개수
cost = [50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000] // 가격

 if (mode == -1) { 
    cm.dispose(); 
    } else {

 if (mode == 0) {
    cm.dispose(); 
    return; 
      }
 if (mode == 1)
    status++;
    else status--;    

 if (status == 0) {
    var hello  = "안녕하세요 #b#h0##k 고객님!\r\n";
    for (var i = 0; i < itemlist.length; i++) {
    for (var i = 0; i < qty.length; i++) {
    for (var i = 0; i < cost.length; i++) {
    hello += "#L" +i+ "# #i"+itemlist[i] + "# #z"+itemlist[i]+"#["+qty[i]+"개] #b("+cost[i]+" 메소)#k\r\n"
  }
}
}
    cm.sendSimple(hello);
        } else if (status == 1) {
            if(cm.getMeso() >= cost[selection]) {
               cm.gainItem(itemlist[selection], qty[selection]);
               cm.gainMeso(-cost[selection]);
               cm.sendOk("여기 있습니다. 고객님~ 감사합니다 고객님~\r\n\r\n"+reward+"\r\n#i"+itemlist[selection] + "# #b[#z " + itemlist[selection]+ "#]#k");
        } else {
               cm.sendOk("메소가 부족해요 고객님..");
    }
  
               cm.dispose();
 }

 }
}
