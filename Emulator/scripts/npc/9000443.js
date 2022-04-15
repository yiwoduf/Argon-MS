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
   var text = "[#e박치상점#k를 담당하는 스마트 노히메입니다]] #i4001189#으로 교환가능) ";
   //text += "\r\n#L3# #i1702627# #b#z1702627##k (12000개)500/300 ";
   //text += "\r\n#L8# #i1102861# #b#z1102861##k (12000개)500/300 ";
   text += "\r\n#L8# #i3015447# #b#z3015447##k (12000개)";
   text += "\r\n#L9# #i3015448# #b#z3015448##k (12000개)";
   text += "\r\n#L4# #i3015341# #b#z3015341##k (12000개)";   
   text += "\r\n#L5# #i3015331# #b#z3015331##k (6000개)";
   text += "\r\n#L6# #i5010135# #b#z5010135##k (6000개)";
   text += "\r\n#L7# #i3015332# #b#z3015332##k (6000개)";
   text += "\r\n#L12# #i3015279# #b#z3015279##k (6000개)";
   text += "\r\n#L13# #i3010946# #b#z3010946##k (6000개)";
   text += "\r\n#L14# #i3015157# #b#z3015157##k (6000개)";
  
   

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
    if (cm.haveItem(4001189, 12000)) {
     cm.gainItem(4001189, -12000);
     cm.gainSponserItem(1702627,'[박치상점]',500,300,0);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 4) {
    if (cm.haveItem(4001189, 12000)) {
     cm.gainItem(4001189, -12000);
     cm.gainItem(3015341, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 5) {
    if (cm.haveItem(4001189, 6000)) {
     cm.gainItem(4001189, -6000);
     cm.gainItem(3015331, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 6) {
    if (cm.haveItem(4001189, 6000)) {
     cm.gainItem(4001189, -6000);
     cm.gainItem(5010135, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 7) {
    if (cm.haveItem(4001189, 6000)) {
     cm.gainItem(4001189, -6000);
     cm.gainItem(3015332, 1);
     cm.sendOk("박치교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 8) {
    if (cm.haveItem(4001189, 12000)) {
     cm.gainItem(4001189, -12000);
     cm.gainItem(3015447, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 9) {
    if (cm.haveItem(4001189, 12000)) {
     cm.gainItem(4001189, -12000);
     cm.gainItem(3015448, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 10) {
    if (cm.haveItem(4031311, 5)) {
     cm.gainItem(4031311, -5);
     cm.gainItem(2023388, 1);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
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
    if (cm.haveItem(4001189, 6000)) {
     cm.gainItem(4001189, -6000);
     cm.gainItem(3015279, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 13) {
    if (cm.haveItem(4001189, 6000)) {
     cm.gainItem(4001189, -6000);
     cm.gainItem(3010946, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
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
    if (cm.haveItem(4001189, 6000)) {
     cm.gainItem(4001189, -6000);
     cm.gainItem(3015157, 1);
     cm.sendOk("박치 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("박치가 부족합니다.");
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