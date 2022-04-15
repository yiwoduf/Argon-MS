/*


내꼬임


*/


var status = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
 if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0 && status == 0) {
              cm.dispose();
              return;
         }
         if (mode == 1)
              status++;
         else
              status--;
         if (status == 0) {
var j_coin = cm.itemQuantity(4310029);
   var text = "#e《《 Buy Pink Bean 》》#nand have some FUN!\r\n#e(only available with rebirth points) ";
   text += "\r\n\r\n #r#eCurrent rebirth point : "+cm.getPlayer().getGP();
   text += "\r\n#L4# #i4310229# #e#b#z4310229##n#k I want to buy a coin #e(10000pts)";   
  
   

   cm.sendSimple(text);
  } else if (status == 1) {
   if (selection == 0) {
    if (cm.haveItem(4310057, 1500)) {
     cm.gainItem(4310057, -1500);
     cm.gainItem(4310067, 1000);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 3) {
    if (cm.haveItem(4310185, 1000)) {
     cm.gainItem(4310185, -1000);
     cm.gainItem(3015325, 1);
     cm.sendOk("#b#z3015325##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 4) {
     if (cm.getPlayer().getGP() >= 10000) {
     cm.getPlayer().gainGP(-10000);
     cm.gainItem(4310229, 1);
     cm.sendOk("#b#i4310229##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#e환생포인트#n#k가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 5) {
     if (cm.getRC() >= 1000000) {
     cm.getPlayer().loseRC(1000000);
     cm.gainItem(3015405, 1);
     cm.sendOk("#b#z4310185##k이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 5) {
    if (cm.haveItem(4310185, 500)) {
     cm.gainItem(4310185, -500);
     cm.gainSponserItem(3015368, 1);
     cm.sendOk("#b#z4310185##k이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 7) {
    if (cm.haveItem(4310185, 500)) {
     cm.gainItem(4310185, -500);
     cm.gainItem(3015368, 1);
     cm.sendOk("#b#z3015368##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 8) {
    if (cm.haveItem(4310185, 1000)) {
     cm.gainItem(4310185, -1000);
     cm.gainItem(3015405, 1);
     cm.sendOk("#b#z4310185##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 9) {
    if (cm.haveItem(4310185, 500)) {
     cm.gainItem(4310185, -500);
     cm.gainItem(3015367, 1);
     cm.sendOk("#b#z3015367##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 10) {
    if (cm.haveItem(4310185, 1500)) {
     cm.gainItem(4310185, -1500);
     cm.gainItem(3015172, 1);
     cm.sendOk("#b#z3015172##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 11) {
    if (cm.haveItem(4031311, 5)) {
     cm.gainItem(4031311, -5);
     cm.gainItem(5122015, 1);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 12) {
    if (cm.haveItem(4310185, 1000)) {
     cm.gainItem(4310185, -1000);
     cm.gainItem(3015326, 1);
     cm.sendOk("#b#z3015326##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 99) {
    if (cm.haveItem(3994475, 50)) {
     cm.gainItem(3994475, -50);
     cm.gainSponserItem(1082101,'[크리스마스]',500,100,0);
     cm.sendOk("#b#z3994475##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z3994475##k이 부족합니다.");
     cm.dispose();
    }
 } else if (selection == 13) {
    if (cm.haveItem(4310185, 1000)) {
     cm.gainItem(4310185, -1000);
     cm.gainItem(3015327, 1);
     cm.sendOk("#b#z3015327##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 14) {
    if (cm.haveItem(4310185, 1000)) {
     cm.gainItem(4310185, -1000);
     cm.gainItem(3015354, 1);
     cm.sendOk("#b#z3015354##k 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 15) {
    if (cm.haveItem(4031311, 8000)) {
     cm.gainItem(4031311, -8000);
     cm.gainItem(5010110, 1);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 16) {
    if (cm.haveItem(4310185, 2000)) {
     cm.gainItem(4310185, -2000);
     cm.gainSponserItem(1142603,'[2016 설날]',1500,350,0);
     cm.sendOk("#b#z1142603##k 교환 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310185##k이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 17) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102630,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 18) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102644,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 19) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102466,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 20) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102643,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 21) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1052671,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 22) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1002665,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 23) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1052137,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 24) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702299,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 25) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702442,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 26) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702211,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 27) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1002738,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 28) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702309,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();


    }
   }
  }
 }
}