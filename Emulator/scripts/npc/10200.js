/* 	
Author : 정예인(Yein__@nate.com)
무단 배포 금지. 이 파일은 USFM에서만 배포했음을 알립니다.
상업적 용도로 쓰는건 니좆대로 하세요^^
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
var status = -1;
var item = 4033915; // 고정 건들 X
var Lucky = 1402224; // 럭키 아이템
var trycount = 1001; // 네모상자 갯수
var mesocount = 100000000; // 메소
var Item = new Array(2000005, 2000005); // 꽝일시에 뽑히는 아이템


function action(mode, type, selection) {
    if (mode == 1 && status == 1) {
	trycount = trycount - 1;
	mesocount = mesocount + 50000000; // 추가되는 메소
	status = 0;
    } else if (mode == 1) {
	status++;
    } else {
	status = 999;
    }

    if (status == 0) {
		 text = "#r#e★#k#d이번 달 행운의 아이템 : #b#i" + Lucky + "##z" + Lucky + "##k#n\r\n\r\n" + 
			"#r#e메소나 아이템 창이 충분하지 않으면, 체스판의 진행이 원활하게 이루어지지 못할 수도 있습니다. 유의해주세요.#k#n\r\n\r\n" +
			"원하시는 칸을 클릭하시면 랜덤으로 아이템을 획득합니다.\r\n" +
			"#b원하시는 칸을 클릭 시 일정 메소가 차감되며,\r\n횟수가 증가할수록 메소 차감량이 점차 증가합니다.#k\r\n" +
			"원하시는 칸을 골라주세요. \r\n#d#e(현재 메소 차감량 " + mesocount + ")#k#n\r\n\r\n";
	    for(var meso = 1; meso < trycount; meso++) {
		text += "#L" + meso + "##i" + item + "##l     ";
	    }
		cm.sendSimple(text);
    } else if (status == 1) {
	Random = Math.floor(Math.random()*trycount);
	RandomItem = Item[Math.floor(Math.random() * Item.length)];
	if (cm.canHold(4000000) && cm.canHold(1000000) && cm.canHold(2000000) && cm.canHold(3000000) && cm.canHold(5000000)) {
	if (cm.getMeso() >= mesocount) {
	cm.gainMeso(-mesocount);
	if (selection == Random) {
	WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "["+ cm.getPlayer().getName()+"] 님께서 금주의 행운 아이템에 당첨되셨습니다! 모두 축하해주세요!")); // 게임 채팅서버알림 메세지 
	cm.sendOk("#r이번 주의 행운의 아이템인 #e#i" + Lucky + "##z" + Lucky + "##n 아이템을 획득하셨습니다!\r\n#b지금 바로 아이템 창을 확인해보세요!");
	cm.gainItem(Lucky, 1);
	cm.dispose();
	} else {
	cm.gainItem(RandomItem, 1);
	cm.sendYesNo("#b안타깝지만 행운의 아이템은 당첨되지 못했습니다....\r\n#k#r그래도 #e#i" + RandomItem + "##n#z" + RandomItem + "##n 아이템을 획득하셨습니다!\r\n#d다시 한 번 체스판을 열여보시겠어요?\r\n#b(아니오 버튼 클릭 시 체스판이 초기화됩니다.)");
	}
	} else {
	cm.playerMessage(6, "메소가 부족하여 체스판이 도중에 종료됩니다.");
	cm.sendOk("메소가 부족하여 체스판이 도중에 종료됩니다.");
	cm.dispose();
	}
	} else {
	cm.playerMessage(6, "인벤토리 창이 부족하여 체스판이 도중에 종료됩니다.");
	cm.sendOk("인벤토리 공간이 부족하여 체스판이 도중에 종료됩니다.     모든 인벤토리의 공간을 넉넉하게 비우는 게 좋습니다.");
	cm.dispose();
	}
    } else if (status == 2) {
	cm.sendOk("이씨발 필요도없는 스테이더스 공간차지하는 새기");
	cm.dispose();
    } else if (status == 999) {
	cm.sendOk("음... 다음에 또 도전해주세요! 아쉽지만 방금 체스판은 하늘로 날아가 버렸답니다 T.T...");
	cm.dispose();
    }
}