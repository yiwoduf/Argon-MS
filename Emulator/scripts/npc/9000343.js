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
   var text ="《《『 스마트설날 』》 #i3994487# #i3994488# #i3994489#  으로 교환가능) ";
   text += "\r\n#L8# #i4310185# #b#z4310185##k (100개) 200:100";
   text += "\r\n#L9# #i4310185# #b#z4310185##k (300개) 600:300";
   text += "\r\n#L10# #i4310185# #b#z4310185##k (500개)1000:500";
  
   

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
    if (cm.haveItem(4031311, 10)) {
     cm.gainItem(4031311, -10);
     cm.gainltem(4310059, 10);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 4) {
    if (cm.haveItem(4031311, 10)) {
     cm.gainItem(4031311, -10);
     cm.gainItem(4310038, 30);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 5) {
    if (cm.haveItem(4031311, 30)) {
     cm.gainItem(4031311, -30);
     cm.gainItem(4310027, 30);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 6) {
    if (cm.haveItem(4031311, 300)) {
     cm.gainItem(4031311, -300);
     cm.gainItem(4310119, 100);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 7) {
    if (cm.haveItem(4031311, 500)) {
     cm.gainItem(4031311, -500);
     cm.gainItem(4310154, 100);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 8) {
     if (cm.haveItem(3994487, 1)) {
     cm.gainItem(3994489, -200);
     cm.gainItem(3994488, -200);
     cm.gainItem(3994487, -200);
     cm.gainItem(4310185, 100);
     cm.sendOk("#i4310185# 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("재료가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 9) {
    if (cm.haveItem(3994487, 1)) {
     cm.gainItem(3994489, -600);
     cm.gainItem(3994488, -600);
     cm.gainItem(3994487, -600); 
     cm.gainItem(4310185, 300);
     cm.sendOk("#i4310185# 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("재료가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 10) {
    if (cm.haveItem(3994487, 1)) {
     cm.gainItem(3994489, -1000);
     cm.gainItem(3994488, -1000);
     cm.gainItem(3994487, -1000);
     cm.gainItem(4310185, 500);
     cm.sendOk("#i4310185# 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("재료가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 11) {
    if (cm.haveItem(3991018, 1)) {
     cm.gainItem(3991018, -200);
     cm.gainItem(3991012, -200);
     cm.gainItem(3991000, -200);
     cm.gainItem(3991017, -200);
     cm.gainItem(3991019, -200);
     cm.gainItem(4310195, 100);
     cm.sendOk("#i4310195# 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310195#이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 12) {
    if (cm.haveItem(3991018, 1)) {
     cm.gainItem(3991018, -600);
     cm.gainItem(3991012, -600);
     cm.gainItem(3991000, -600);
     cm.gainItem(3991017, -600);
     cm.gainItem(3991019, -600);
     cm.gainItem(4310195, 300);
     cm.sendOk("#i4310195# 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310195#이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 13) {
      if (cm.haveItem(3991018, 1)) {
      cm.gainItem(3991018, -1000);
     cm.gainItem(3991012, -1000);
     cm.gainItem(3991000, -1000);
     cm.gainItem(3991017, -1000);
     cm.gainItem(3991019, -1000);
     cm.gainItem(4310195, 500);
     cm.sendOk("#i4310195# 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310195#이 부족합니다.");
     cm.dispose();
    }
 } else if (selection == 13) {
    if (cm.haveItem(4031311, 3000)) {
     cm.gainItem(4031311, -3000);
     cm.gainSponserItem(1142724,'[이벤트]',2000,500,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 14) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(4310154, 30);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 15) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(4310027,30);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 16) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102532,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
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