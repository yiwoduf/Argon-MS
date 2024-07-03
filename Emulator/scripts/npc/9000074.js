 /*
# 저작자 : 멜론K [melon_dev@nate.com]
# 기　능 : 자작 퀘스트
*/
importPackage(Packages.tools.RandomStream);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
var servername = "에로스온라인"
reqitem = [4001126, 4001129, 2049360, 1142385, 4310069, 2591186];  qwan = [100, 50, 100, 2, 1, 1]; 
// reqitem : [1,2,3,4,5,6] 차례대로 용기 믿음 의지 기억 추억 qwan : 그 아이템의 양
rewitem = [2430673, 4001433, 1142385, 4032378, 4032379, 5530013];  
// rewitem : 퀘스트완료 증표 or 보상 rewmeso : 마지막 퀘스트까지 완료했을때 얻는 메소
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
    if (status == -1) {
       cm.dispose();
       return;
    }
    if (status == 0) {
    var hello = "　　　　　　　　　　　#fUI/CashShop.img/CSEffect/event/0##fn나눔고딕 Extrabold##fs12#\r\n안녕하세요 #b【"+servername+"】#k 황금사원 퀘스트 NPC입니다.\r\n";
         hello += "#b모든 퀘스트를 완료#k할 시 보상이 주어집니다.\r\n\r\n";
         hello += "보상: #i1012478# #e#e응축된 힘의 결정석, #i1152170# 로얄 블랙메탈 숄더,메소#k\r\n#r【반복획득 불가】\r\n\r\n#k";
         hello += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n";
         if (cm.haveItem(rewitem[5], 1)) {
         hello += "퀘스트를 이미 모두 클리어 하셨습니다.\r\n";
         } else if (cm.haveItem(rewitem[4], 1)) {
         hello += "#d#L5##i1152154#마이스터 견장#n #e#r마지막단계#k\r\n";
         } else if (cm.haveItem(rewitem[3], 1)) {
         hello += "#d#L4##i1152154#마이스터 견장#n #e#r5단계#k\r\n";
         } else if (cm.haveItem(rewitem[2], 1)) {
         hello += "#d#L3#선행퀘스트를 시작할수없습니다.#k\r\n";
         } else if (cm.haveItem(rewitem[1], 1)) {
         hello += "#d#L2#(Lv.115) 황금사원으로의 초대(3) \r\n";
         } else if (cm.haveItem(rewitem[0], 1)) {
         hello += "#d#L1#(Lv.115) 황금사원으로의 초대(2) \r\n";
         } else {
         hello += "#d#L0#(Lv.115) 황금사원으로의 초대(1) \r\n";
}
    cm.sendSimple(hello);
    return;
        } else if (status == 1) {
          if (selection == 0) {
         var say0 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n안녕하세요 #d#h0##k님 황금사원이 오픈하게 되었습니다!\r\n";
             say0 += "하지만 황금사원을 입장하기위해서 필요한 티켓을 잊어버렸내요..."
             say0 += " 죄송하지만.. 입장티켓구매를 위해 \r\n#i"+reqitem[0]+"##b[#z"+reqitem[0]+"#]#k #r"+qwan[0]+"개#k만 가져다주세요.!\r\n";
             //say0 += "#e#e#L6#퀘스트 수락하기#k"
             //say0 += "#e#b#L7#퀘스트 거절하기#k\r\n"
             say0 += "#e#e#L8#퀘스트 완료하기#k"
             cm.sendSimple(say0);
         } else if (selection == 1) {
         var say1 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n얼마전부터 난폭해지기 시작한 원숭이들 때문에 관광객이 줄어들어 더이상 사원을 유지하기가 곤란해졌어요.. ";
             say1 += "사원 유지를 위해 \r\n#i"+reqitem[1]+"##b[#z"+reqitem[1]+"#]#k #r"+qwan[1]+"개#k만 가져다주세요.!\r\n ";
             //say1 += "#e#e#L10#퀘스트 수락하기#k\r\n"
             //say1 += "#e#b#L11#퀘스트 거절하기#k\r\n"
             say1 += "#e#e#L12#퀘스트 완료하기#k"
             cm.sendSimple(say1);
       } else if (selection == 2) {
         var say2 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n 황금사원의 입장 선행퀘스트가 완료되었습니다. \r\n #i4001433# 아이템을가지고 탕따완에게 가주세요! ";
             //say2 += "#e#g#L20#퀘스트 수락하기#k\r\n"
             //say2 += "#e#b#L21#퀘스트 거절하기#k\r\n"
             //say2 += "#e#r#L22#퀘스트 완료하기#k"
             cm.sendOk(say2);
  } else if (selection == 3) {
         var say3 = "#d#h0##k님은 이미 황금사원 퀘스트를 완료하셨습니다.\r\n#r본 컨텐츠는 최종보상획득후 중복으로 보상을 수령할수 없도록 제작되었습니다.#k \r\n -한별-";
             //say3 += "#e#g#L30#퀘스트 수락하기#k\r\n"
             //say3 += "#e#b#L31#퀘스트 거절하기#k\r\n"
             //say3 += "#e#r#L32#퀘스트 완료하기#k"
             cm.sendOk(say3);
  } else if (selection == 4) {
         var say4 = "아직 #i1152154##d#e마이스터 견장#n#k 을 만들기 위해서는\r\n#e#r2가지#n#k의 재료가 남았습니다.\r\n";
             say4 += "#e#g#L40#퀘스트 수락하기#k\r\n"
             say4 += "#e#b#L41#퀘스트 거절하기#k\r\n"
             say4 += "#e#r#L42#퀘스트 완료하기#k"
             cm.sendSimple(say4);
  } else if (selection == 5) {
         var say5 = "#b#h0#님! #k이제 마지막재료 입니다.\r\n";
             say5 += "#e#g#L50#퀘스트 수락하기#k\r\n"
             say5 += "#e#b#L51#퀘스트 거절하기#k\r\n"
             say5 += "#e#r#L52#퀘스트 완료하기#k"
             cm.sendSimple(say5);
}
      } else if (status == 2) {
// sorry0~sorry6 = 자신이 가지고 있는 퀘스트1~6의 조건아이템 개수
// soso0~6 = 자신이 더 모아야 하는 조건 아이템 개수 
var sorry0 = cm.itemQuantity(4000001);  var sorry1 = cm.itemQuantity(4000996);  
var sorry2 = cm.itemQuantity(4000364);  var sorry3 = cm.itemQuantity(4000296);
var sorry4 = cm.itemQuantity(4000446);  var sorry5 = cm.itemQuantity(4000653);
var soso0 = qwan[0] - sorry0;  var soso1 = qwan[1] - sorry1;
var soso2 = qwan[2] - sorry2;  var soso3 = qwan[3] - sorry3;
var soso4 = qwan[4] - sorry4;  var soso5 = qwan[5] - sorry5;
       if (selection == 6) {
         cm.sendOk("도와주셔서 감사합니다. 티켓구매를위해서\r\n  #i"+reqitem[0]+"##b[#z"+reqitem[0]+"#]#k #r"+qwan[0]+"개#k만 가져다주세요.!!");
         cm.dispose();
       } else if (selection == 7) {
          cm.sendOk("그럼 할수없네요.. 나중에라도 도와주세요~");
          cm.dispose();
       } else if (selection == 8) {
          if (cm.haveItem(reqitem[0], qwan[0])) {
          cm.gainItem(reqitem[0], -qwan[0]);
          cm.gainItem(rewitem[0], 1);
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("제가 부탁한만큼 갯수가 부족한것 같아요 #h0#님.. \r\n#h0#님이 소지한 #b#i"+reqitem[0]+"##z"+reqitem[0]+"##k은(는) #r"+sorry0+" 개#k 이며,"
          + "아직 #b"+ soso0 + "개#k가 부족해요..");
          cm.dispose();
}
       } else if (selection == 10) {
         cm.sendOk("고마워~ 그러면 #i"+reqitem[1]+"##b[#z"+reqitem[1]+"#]#k #r"+qwan[1]+"개#k만 모아줘~");
         cm.dispose();
       } else if (selection == 11) {
          cm.sendOk("그럼 할수없네요.. 나중에라도 도와주세요~");
          cm.dispose();
       } else if (selection == 12) {
          if (cm.haveItem(reqitem[1], qwan[1])) {
          cm.gainItem(reqitem[1], -qwan[1]);
          cm.gainItem(rewitem[1], 1);
          cm.gainItem(rewitem[0], -1);
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("제가 부탁한만큼 갯수가 부족한것 같아요 #h0#님.. \r\n가지고 계신 #b#i"+reqitem[1]+"##z"+reqitem[1]+"##k은(는) #r"+sorry1+" 개#k 이며,"
          + "아직 #b"+ soso1 + "개#k가 부족해요..");
          cm.dispose();
}
       } else if (selection == 20) {
         cm.sendOk("고마워~ 그러면 #i"+reqitem[2]+"##b[#z"+reqitem[2]+"#]#k #r"+qwan[2]+"개#k만 모아줘~");
         cm.dispose();
       } else if (selection == 21) {
          cm.sendOk("그럼 할수없네요.. 나중에라도 도와주세요~");
          cm.dispose();
       } else if (selection == 22) {
          if (cm.haveItem(reqitem[2], qwan[2])) {
          cm.gainItem(reqitem[2], -qwan[2]);
          cm.gainItem(rewitem[2], 1);
          cm.gainItem(rewitem[1], -1);
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("아직 덜 가져 오신것 같아요. #h0#님! \r\n가지고 계신 #b#i"+reqitem[2]+"##z"+reqitem[2]+"##k은(는) #r"+sorry2+" 개#k 이며,\r\n"
          + "아직 #b"+ soso2 + "개#k가 부족합니다. 빨리 다 모아와 주세요!");
          cm.dispose();
}
       } else if (selection == 30) {
         cm.sendOk("고마워~ 그러면 #i"+reqitem[3]+"##b[#z"+reqitem[3]+"#]#k #r"+qwan[3]+"개#k만 모아줘~");
         cm.dispose();
       } else if (selection == 31) {
          cm.sendOk("그럼 할수없네요.. 나중에라도 도와주세요~");
          cm.dispose();
       } else if (selection == 32) {
          if (cm.haveItem(reqitem[3], qwan[3])) {
          cm.gainItem(reqitem[3], -qwan[3]);
          cm.gainItem(rewitem[3], 1);
          cm.gainItem(rewitem[2], -1);
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("아직 덜 가져 오신것 같아요. #h0#님! \r\n가지고 계신 #b#i"+reqitem[3]+"##z"+reqitem[3]+"##k은(는) #r"+sorry3+" 개#k 이며,\r\n"
          + "아직 #b"+ soso3 + "개#k가 부족합니다. 빨리 다 모아와 주세요!");
          cm.dispose();
}
       } else if (selection == 40) {
         cm.sendOk("고마워~ 그러면 #i"+reqitem[4]+"##b[#z"+reqitem[4]+"#]#k #r"+qwan[4]+"개#k만 모아줘~");
         cm.dispose();
       } else if (selection == 41) {
          cm.sendOk("그럼 할수없네요.. 나중에라도 도와주세요~");
          cm.dispose();
       } else if (selection == 42) {
          if (cm.haveItem(reqitem[4], qwan[4])) {
          cm.gainItem(reqitem[4], -qwan[4]);
          cm.gainItem(rewitem[4], 1);
          cm.gainItem(rewitem[3], -1);
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("아직 덜 가져 오신것 같아요. #h0#님! \r\n가지고 계신 #b#i"+reqitem[4]+"##z"+reqitem[4]+"##k은(는) #r"+sorry4+" 개#k 이며,\r\n"
          + "아직 #b"+ soso4 + "개#k가 부족합니다. 빨리 다 모아와 주세요!");
          cm.dispose();
}
       } else if (selection == 50) {
         cm.sendOk("#i"+reqitem[5]+"##b[#z"+reqitem[5]+"#]#k #r"+qwan[5]+"개#k를 가져와 보세요!");
         cm.dispose();
       } else if (selection == 51) {
          cm.sendOk("나중에 도전하신다니, 알겠습니다.");
          cm.dispose();
       } else if (selection == 52) {
          if (cm.haveItem(reqitem[5], qwan[5])) {
          cm.gainItem(reqitem[5], -qwan[5]);
          cm.gainItem(rewitem[4], -1);
          cm.gainItem(rewitem[5], 1)
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("아직 덜 가져 오신것 같아요. #h0#님! \r\n가지고 계신 #b#i"+reqitem[5]+"##z"+reqitem[5]+"##k은(는) #r"+sorry5+" 개#k 이며,\r\n"
          + "아직 #b"+ soso5 + "개#k가 부족합니다. 빨리 다 모아와 주세요!");
          cm.dispose();
}
}
        }
}
