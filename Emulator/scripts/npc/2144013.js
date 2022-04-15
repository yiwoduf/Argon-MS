
/*
제작:모름 수정:에덴
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var cost = 50000; // 소환가격
var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 status++;
 if (status == 0) {
  cm.sendSimple("#L1##e#b블루존 [영환불 드롭]#l#k\r\n\r\n(모두입장가능#r*제한시간 5분*#k)\r\n#i4001431##z4001431# 1장 소비");
 } else if(status == 1) {
  if(selection == 10) {
  if (cm.getPlayer().getLevel() >= 10) {
  cm.sendOk("10 이상이라니까?.");
  cm.dispose();
 } else {    
cm.warp(1040400002, 0);

 cm.dispose();
}
  } else if (selection == 1) {
            if (cm.itemQuantity(4001431) >= 1 && cm.getPlayerCount(109060001) == 0) {
                cm.TimeMoveMap(109060001,100000000,300); // 9302039
                cm.sendOk("#e#r디멘션 게이트#k에게 말을 걸어주십시오.");

            } else if(cm.getPlayerCount(109060001) >= 0) {
                cm.sendOk("#e#b다른 채널#k을 이용해주십시오.\r\n누군가 이용중입니다.");

            } else if(cm.itemQuantity(4001431) <= 1) {
                cm.sendOk("#e#r입장티켓#k이 없습니다.\r\n티켓을 1개이상 소지해주십시오.");


            }
cm.dispose();



cm.dispose();
  } else {
   cm.dispose();
  }
 } else {
  cm.dispose();
 }
}