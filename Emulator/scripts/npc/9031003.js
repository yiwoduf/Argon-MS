/*

바론팩 전용 스크립트입니다
유출&배포는 땍!!

*/
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
var status = -1;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
          NotAllowed = [1115100, 1115101, 1115102, 1115012, 1115013, 1115014, 1050478, 1051545, 1070095, 1071112, 1702808, 1005089, 1050479, 1051546, 1702809, 1050477, 1051544, 1103072, 1073255, 1702807, 1005083, 1005084, 1003775, 1051051, 1050065]
          if (mode == -1 || mode == 0) {
              cm.dispose();
         return;
         }
         if (mode == 1) {
         status++;
         }
         if (status == 0) {
	      cm.sendGetText("#fn나눔고딕 Extrabold##fs14##e캐시아이템 이름을 입력하세요(정확한 이름을 입력 안할시 검색 내용이 너무 많아 팅길수도 있습니다.)\r\n\r\n황금색 단풍잎 15개 소진#k\r\n\r\n추가옵션 : #g올스텟+50 공/마+25#k");
         } else if (status == 1) {
              var itemid = cm.getText();
	      cm.SearchItem(itemid);
         } else if (status == 2) {
          for (i=0; i<NotAllowed.length; i++) {
          if (selection == NotAllowed[i]) {
              cm.sendOk("이 아이템은 후원 전용 캐시템 입니다.");
              cm.dispose();
              return;
         }
         }
	  if (cm.getPlayer().haveItem(4033247, 15, true, true)) { // 이하소지시 아이템구매 불가 

	      cm.sendOk("#i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#을(를) 획득하셨습니다.");
              cm.gainSponserItem(selection,'',50,25,0); // 올스텟,공격력
	      cm.gainItem(4033247, -15); // 삭감 갯수		
              cm.dispose();
	 } else {
	      cm.sendOk("#i4033247# #z4033247# 5개 미만이므로 아이템 구매가 불가능 합니다.");
              cm.dispose();
	}
    }
}