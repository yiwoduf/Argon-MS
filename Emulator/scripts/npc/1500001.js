var status = -1;

function start() {
	var vh = cm.itemQuantity(4000994); // 요정의 마법 가루
	var zs = cm.itemQuantity(4000995); // 요정의 책갈피
	var hs = cm.itemQuantity(4000996); // 싱싱한 양파
	var pb = cm.itemQuantity(4000997); // 순무의 싹
	    if (vh >= 35 && zs >= 35 && hs >= 35 && pb >= 35){
		var sel = "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L3##b모두 다 모아왔어요.!~ 교장 선생님!#k#l\r\n\r\n";
		} else {
		sel = "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##r아직은 모두 모으지 못했어요...#k#l\r\n\r\n";
            }
	    if (cm.getPlayer().getMapId() == 100030301){
		var sel2 = "#L1##b[입장]#k 지금 바로.. 엘리넬 로비로 이동하기#l";
		} else {
		sel2 = "#L2##r[나가기]#k 이만.. 퀘스트의 전당으로 이동할래요..#l";
            }
	if (cm.getPlayer().getLevel() <= 200 && cm.getPlayer().getMapId() == 100030301) {
	    var chat0 = "우리 #r엘리넬 학원#k 에선...요즘 #b유기농 채소#k 양산을 위해서..\r\n"
	    chat0 += "많은 노력 을 기울이고 있다네.. 하지만 그를 위해서는\r\n";
	    chat0 += "많은 투자와 인력이 필요하지.. 교장으로서 매우 부담이\r\n";
	    chat0 += "되지 않을수가 없어.. 내 입장이 매우 난처하기도 하거든..\r\n그래서 자네가 나를 좀 도와주겠나?\r\n";
            chat0 += ""+sel2+"\r\n　";
	    cm.sendFriendsSimple(chat0,true);
        } else if (cm.getPlayer().getLevel() <= 200 && cm.getPlayer().getMapId() == 101072000) {
            var chat = "#fn나눔고딕 Extrabold#우리 #r엘리넬 학원#k 에선...요즘 #b유기농 채소#k 양산을 위해서..\r\n";
	    chat += "많은 노력 을 기울이고 있다네.. 하지만 그를 위해서는\r\n";
	    chat += "많은 투자와 인력이 필요하지.. 교장으로서 매우 부담이\r\n";
	    chat += "되지 않을수가 없어.. 내 입장이 매우 난처하기도 하거든..\r\n그래서 자네가 나를 좀 도와주겠나?\r\n";
            chat += "\r\n--------------------------------------------------------------------------------\r\n";
            if (cm.getQuestStatus(400) == 0) {
	    chat += "#r[보상]#k #i4310129# #b썸머리밋 코인#k #r30 개#k\r\n#r[보상]#k #i1142681# #b#z1142681##k #r올스탯 200 / 공, 마 200#k\r\n";
            } else {
	    chat += "#r[보상]#k #i4310129# #b썸머리밋 코인#k #r5 개#k";
            }
	    chat += "\r\n--------------------------------------------------------------------------------\r\n";
            chat += "                          #d[요청 아이템 목록]#k\r\n";
            chat += "--------------------------------------------------------------------------------\r\n";
	    chat += "#i4000994# #z4000994#            #d("+vh+"/35)#k\r\n";
	    chat += "#i4000995# #z4000995#                 #d("+zs+"/35)#k\r\n";
	    chat += "#i4000996# #z4000996#                     #d("+hs+"/35)#k\r\n";
	    chat += "#i4000997# #z4000997#                        #d("+pb+"/35)#k\r\n";
	    chat += "--------------------------------------------------------------------------------\r\n";
	    chat += ""+sel+"";
	    chat += "--------------------------------------------------------------------------------\r\n";
            chat += ""+sel2+"";
	    cm.sendSimple(chat);
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r* 플레이 조건#k\r\n\r\n#d- 레벨 200 이하의 캐릭터\r\n- 퀘스트의 전당 또는 엘리넬 로비 에서 플레이 가능#k",9062004);
	cm.dispose();
        }
}
function action(mode, type, selection) {
        cm.dispose();
	if (selection == 0) {
			 cm.sendOk("#fn나눔고딕 Extrabold##r전부 모은 다음 말을 걸게나..#k");
		         cm.dispose();
	} else if (selection == 1) {
			 cm.warp(101072000,0);
		         cm.dispose();
	} else if (selection == 2) {
			 cm.warp(100030301,0);
		         cm.dispose();
	} else if (selection == 3) {
        if (cm.getQuestStatus(400) == 0) {
	    if (cm.haveItem(4000994, 35) && cm.haveItem(4000995, 35) && cm.haveItem(4000996, 35) && cm.haveItem(4000997, 35)) {
		 if (cm.canHold(4310129) && cm.canHold(1142681)) {
			 cm.sendOk("#fn나눔고딕 Extrabold#덕분에 #r유기농 채소#k 를 재배하기가 훨씬 수월해졌군..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310129# #b썸머리밋 코인#k #r30 개#k\r\n#i1142681# #b커플을 지킨 솔로 훈장#k #r(올스탯 200 / 공, 마 200)#k");
			 cm.gainItem(4000994, -35);
			 cm.gainItem(4000995, -35);
			 cm.gainItem(4000996, -35);
			 cm.gainItem(4000997, -35);
			 cm.gainItem(4310129, 30);
			 cm.setAllStat(1142681,200,200,0);
	                 cm.forceStartQuest(400);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn나눔고딕 Extrabold##r기타 또는 장비 창에 빈 공간 이 없습니다.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn나눔고딕 Extrabold##r아직은.. 전부 모으지 못한거 같군..#k");
		 cm.dispose();	
		 }
      } else {
	    if (cm.haveItem(4000994, 35) && cm.haveItem(4000995, 35) && cm.haveItem(4000996, 35) && cm.haveItem(4000997, 35)) {
		 if (cm.canHold(4310129)) {
			 cm.sendOk("#fn나눔고딕 Extrabold#또 다시 날 도와줘서 #b유기농 채소#k 를 재배하기가 훨씬 수월해졌군..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310129# #b썸머리밋 코인#k #r5 개#k");
			 cm.gainItem(4000994, -35);
			 cm.gainItem(4000995, -35);
			 cm.gainItem(4000996, -35);
			 cm.gainItem(4000997, -35);
			 cm.gainItem(4310129, 5);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간 이 없습니다.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn나눔고딕 Extrabold##r아직은.. 전부 모으지 못한거 같군..#k");
		 cm.dispose();	
		 }
      }
	} else {
	cm.dispose();		
}
}