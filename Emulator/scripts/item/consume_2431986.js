/*
제작자 : ljw5992@naver.com / dbg_yeane@nate.com
*/

importPackage(Packages.client.items);

var status = -1;
var arr = "2431965,2431966,2431967,2432131,2432153,2432154,2432207,2432354,2432355,2432465,2432479,2432526,2432532,2432592";

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 if (mode == 1) {
  status++;
 } else {
  status--;
  cm.dispose();
 }
 if (status == 0) {
  cm.sendYesNo("데미지 스킨 상자를 열겠보겠어? 소비칸을 1칸 이상 비워둬");

 } else if (status == 1) {
  if (cm.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() > 1){
   var itemid = arr.split(",")[Math.floor(Math.random()*54+1)/1];
   cm.sendOk("#i" + itemid + "##b(#z"+itemid+"##k)를 획득했습니다.");
   cm.gainItem(2431986, -1);
   cm.gainItem(itemid,1);
   cm.dispose();
  } else {
   cm.sendOk("장비창에 공간이 부족해");
   cm.dispose();
  }
 }
}
