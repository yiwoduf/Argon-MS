/*
# 저작자 : 멜론K [melon_dev@nate.com]
# 기　능 : 자작 퀘스트
*/
importPackage(Packages.tools.RandomStream);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
var servername = "로안스토리"
var boss = 9500391; //보스 코드
var back = 100000000; //돌아갈 맵 코드
var x = 994; //소환x좌표
var y = 513; //소환y좌표
reqitem = [4032311, 1003455, 4032868, 11423850, 87857555, 25911860];  qwan = [1, 1, 1, 5, 1, 1]; 
// reqitem : [1,2,3,4,5,6] 차례대로 용기 믿음 의지 기억 추억 qwan : 그 아이템의 양
rewitem = [1003455, 4032868, 11423850, 0518486, 90000000, 11521540];  
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
    var hello = "　　　　　　　　　　　#fUI/CashShop.img/CSEffect/event/0##fn나눔고딕 Extrabold##fs12#\r\n마지막관문을 통과하신것을 축하드립니다! 얼른 라바나를 봉인시켜주세요!\r\n※#r(Lv.115) 라바나를 퇴치하고싶습니다【퀘스트】#k수락과동시에 #i1003455#을획득하게됩니다. #i1003455#으로 최종 보상 퀘스트를 완료할수있습니다.\r\n";
         //hello += "#b모든 퀘스트를 완료#k할 시 보상이 주어집니다.\r\n\r\n";
         //hello += "보상: #i1012478# #e#r응축된 힘의 결정석#k 【반복가능】\r\n\r\n";
         hello += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n";
         if (cm.haveItem(rewitem[5], 1)) {
         hello += ".";
         } else if (cm.haveItem(rewitem[4], 1)) {
         hello += "#d#L5#(Lv.115) 라바나의 봉인장소\r\n";
         } else if (cm.haveItem(rewitem[3], 1)) {
         hello += "#d#L4#(Lv.115) 봉인이 풀려이유(4)\r\n";
         } else if (cm.haveItem(rewitem[2], 1)) {
         hello += "#d#L3#(Lv.115) 라바나를 퇴지하고싶습니다【반복】\r\n";
         } else if (cm.haveItem(rewitem[1], 1)) {
         hello += "#d#L2#(Lv.115) 라바나를 퇴지하고싶습니다【반복】\r\n";
         } else if (cm.haveItem(rewitem[0], 1)) {
         hello += "#d#L1#(Lv.115) 황금사원 테마 컨텐츠 완료 \r\n";
         } else {
         hello += "#d#L0#(Lv.115) 라바나를 퇴치하고싶습니다【퀘스트】\r\n";
}
    cm.sendSimple(hello);
    return;
        } else if (status == 1) {
          if (selection == 0) {
         var say0 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n#h0#님 모든 퀘스트를 완료해주셨내요! 마지막으로 라바나를 퇴치하여 컨텐츠 보상을 획득하세요!  \r\n#r#i4032311#아이템을 소모하여 소환하게됩니다.#k #e#e【보스를 꼭잡아주세요!】#k\r\n";
             //say0 += "그때문에 많은 사람과 동물이 죽게되었고 더이상 사원의 안전을 장담할수 없어 우리는 라바나를 이곳 신전의 지하 깊은곳에 봉인해버렸다내..\r\n\r\n하지만 최근에 들어 라바나의 봉인이 서서히 풀리기 시작하였고 그와 동시에 황금사원 전역에 걸쳐서 라바나의 폭주이유를 알수있는 이상한 증조들이 포착되었다내.. \r\n\r\n우리를 도와 다시한번 라바나를 봉인 시켜주게 \r\n"
             //say0 += " 죄송하지만.. 입장티켓구매를 위해 \r\n#i"+reqitem[0]+"##b[#z"+reqitem[0]+"#]#k #r"+qwan[0]+"개#k만 가져다주세요.!\r\n";
             //say0 += "#e#e#L6#퀘스트 수락하기#k"
             //say0 += "#L7#퀘스트 거절하기#k\r\n"
             say0 += "#L8#라바나 소환【퀘스트】#k"
             cm.sendSimple(say0);
         } else if (selection == 1) {
         var say1 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n안녕하십니까! #h0#님 [GM]한별입니다.\r\n\r\n이번에 기획된 컨텐츠는 즐거우셨는가요~^^? 다음 컨텐츠도 곧공개될 예정이며 유저분들의 많은 의견을 받고있습니다!.\r\n\r\n 컨텐츠에관한 많은의견 주시면 감사하갰습니다! 이로써 황금사원의 모든 퀘스트를 완료하셨습니다~ 수고하셨습니다!#r\r\n【장비창을 3칸비워두세요!】#k\r\n";
             say1 += "\r\n                                               -제작자-\r\n                                             [Gm]한별\r\n                                          -도움을주신분-\r\n                                                 -비모-\r\n                                                 -슬픔-\r\n                                                 -윤재-\r\n                                                 -쵸파-\r\n                 황금사원 컨텐츠를 제작함에있어 테스터 지원과 \r\n       더불어 각종 의견과 오류를찾아주신 4분께 감사합니다! (__) ";
             //say1 += "#e#e#L10#퀘스트 수락하기#k\r\n"
             //say1 += "#e#b#L11#퀘스트 거절하기#k\r\n"
             say1 += "\r\n#e#e#L12#보상받기(헤네시스이동)#k"
             cm.sendSimple(say1);
       } else if (selection == 2) {
         var say2 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n 다시한번 라바나를 퇴치하로 오셨군요!\r\n【보스퇴치후 @마을 명령어를 사용해주세요】\r\n\r\n【안내】  (Lv.115)라바나를 퇴지하고싶습니다【반복】\r\n#r퀘스트를 통해 입장하면 컨텐츠 완료보상은 지급되지않습니다.   \r\n#r#i4032868#아이템을 소모하여 소환하게됩니다#k.";
             //say2 += "\r\n【#r#r시련자의방1,2#k】에서 붉은 도깨비를 퇴치하여\r\n#i"+reqitem[2]+"##b[#z"+reqitem[2]+"#]#k #r"+qwan[2]+"개#k만 가져와주게나. \r\n";
             //say2 += "#e#g#L20#퀘스트 수락하기#k\r\n"
             //say2 += "#e#b#L21#퀘스트 거절하기#k\r\n"
             say2 += "\r\n#e#e#L22#소환하기#k"
             cm.sendSimple(say2);
  } else if (selection == 3) {
         var say3 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n안녕하십니까! #h0#님 [GM]한별입니다.\r\n\r\n이번에 기획된 컨텐츠는 즐거우셨는가요~^^? 다음 컨텐츠도 곧공개될 예정이며 유저분들의 많은 의견을 받고있습니다!.\r\n\r\n 컨텐츠에관한 많은의견 주시면 감사하갰습니다! 이로써 황금사원의 모든 퀘스트를 완료하셨습니다~ 수고하셨습니다!\r\n";
             say3 += "\r\n                                               -제작자-\r\n                                             [Gm]한별\r\n                                          -도움을주신분-\r\n                                                 -비모-\r\n                                                 -슬픔-\r\n                                                 -윤재-\r\n                                                 -쵸파-\r\n                 황금사원 컨텐츠를 제작함에있어 테스터 지원과 \r\n       더불어 각종 의견과 오류를찾아주신 4분께 감사합니다! (__) ";
             //say3 += "#e#g#L30#퀘스트 수락하기#k\r\n"
             //say3 += "#e#b#L31#퀘스트 거절하기#k\r\n"
             say3 += "#e#e#L32#라바나 퇴치#k"
             cm.sendSimple(say3);
  } else if (selection == 4) {
         var say4 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n또한번 라바나에게 도전하고싶은겐가?";
             say4 += "\r\n【#r#r고난자의방#k】에서 가네시를 퇴치하여\r\n#i"+reqitem[4]+"##b[#z"+reqitem[4]+"#]#k #r"+qwan[4]+"개#k를 모아오면 다시한번 도전하게 해주지. \r\n ";
             //say4 += "#e#g#L40#퀘스트 수락하기#k\r\n"
             //say4 += "#e#b#L41#퀘스트 거절하기#k\r\n"
             say4 += "#e#e#L42#퀘스트 완료하기#k"
             cm.sendSimple(say4);
  } else if (selection == 5) {
         var say5 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn나눔고딕 Extrabold##fs12#\r\n봉인이 풀린 모든이유를 알아냈내 라바나의 봉인장소는\r\n #i4032127#을가지고 【#r#r버려진사원#k】의 토니쟈에게 가면 장소를 알려줄걸쎄  ";
             //say5 += "#e#g#L50#퀘스트 수락하기#k\r\n"
             //say5 += "#e#b#L51#퀘스트 거절하기#k\r\n"
             //say5 += "#e#e#L52#퀘스트 완료하기#k"
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
          cm.gainItem(reqitem[1], 1);
	  cm.spawnMob(boss,x,y);                 
          cm.changeMusic("Bgm16/InWartime");        
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk(" 【#b#e고난자의방#k】에서 시험의 문을통해 선행퀘스트를 완료해주세요.^^");
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
          cm.gainItem(1152170, 1);
          cm.gainItem(1012478, 1);
          cm.gainItem(5530013, 1);
          cm.warp(100000000);
          cm.gainMeso(10000000);
          cm.gainItem(1142385, 1);          
          cm.changeMusic("BgmEvent2/risingStar2");
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
          cm.spawnMob(boss,x,y); 
          cm.changeMusic("Bgm16/InWartime");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("제가 부탁한만큼 갯수가 부족한것 같아요 #h0#님.. \r\n가지고 계신 #b#i"+reqitem[2]+"##z"+reqitem[2]+"##k은(는) #r"+sorry2+" 개#k 이며,"
          + "아직 #b"+ soso2 + "개#k가 부족해요..");
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
          cm.warp(925120100);
          cm.gainItem(reqitem[3], -qwan[3]);
          cm.changeMusic("Bgm22/DespairOnDevil");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("제가 부탁한만큼 갯수가 부족한것 같아요 #h0#님.. \r\n가지고 계신 #b#i"+reqitem[3]+"##z"+reqitem[3]+"##k은(는) #r"+sorry3+" 개#k 이며,\r\n"
          + "아직 #b"+ soso3 + "개#k가 부족해요..");
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
          cm.changeMusic("Bgm16/InWartime");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("제가 부탁한만큼 갯수가 부족한것 같아요 #h0#님.. \r\n가지고 계신 #b#i"+reqitem[4]+"##z"+reqitem[4]+"##k은(는) #r"+sorry4+" 개#k 이며,\r\n"
          + "아직 #b"+ soso4 + "개#k가 부족해요..");
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
          cm.changeMusic("Bgm16/InWartime");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("제가 부탁한만큼 갯수가 부족한것 같아요 #h0#님.. \r\n가지고 계신 #b#i"+reqitem[5]+"##z"+reqitem[5]+"##k은(는) #r"+sorry5+" 개#k 이며,\r\n"
          + "아직 #b"+ soso5 + "개#k가 부족해요..");
          cm.dispose();
}
}
        }
}