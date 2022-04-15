/*

 * 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

 * (Pure Online Development Source Script)

메르세데스 에 의해 만들어 졌습니다.

엔피시아이디 : 9000174

엔피시 이름 : 무르무르

엔피시가 있는 맵 :

엔피시 설명 : 영혼연구가

QS2 += "\r\n#fUI/UIWindow2.img/MapleStyle/RewardPopup/backgrnd2#\r\n"

 */

var status = 0;
importPackage(Packages.server);
importPackage(Packages.constants);
importPackage(java.util);
importPackage(Packages.tools);
importPackage(Packages.server.quest);
importPackage(java.awt);
importPackage(java.lang);
importPackage(Packages.client.inventory);
importPackage(Packages.client.skills);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(Packages.client);
importPackage(Packages.tools.RandomStream);

var selected = 0;
var check = 0;
var sel = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			//if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var str = "사람들은 말합니다. 인간이란 자유를 빼앗겨봐야 \r\n자신의 본모습을 안다고. 재미있지않습니까?\r\n저 또한 여기에 자유를 뺏긴것같아요.#b\r\n";
			str += "\r\n#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n"

			   str += "#L81#모험가타이틀을 획득하고싶습니다.#l\r\n";
			str += "#L84#시그너스타이틀을 획득하고싶습니다.#l\r\n";
			str += "#L85#영웅타이틀을 획득하고싶습니다.#l\r\n\r\n";
			cm.sendSimple(str);
		} else if (status == 1) {
			if (selection == 82) {
				var QS7 = "보스들의 증거를 가지고계신가요?";
				QS7 += "\r\n가지고 계신다면 저하고 거레를 하지않으실레요?\r\n"
				if (cm.haveItem(4000659, 1) && cm.haveItem(4033311, 1) && cm.haveItem(4033312, 1) && cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1)) {
					QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS7 += "\r\n보스들의 증거를 모으고 있으신가봐요.\r\n"
					QS7 += "이렇게 많은 보스들의 증거는 처음보는것같아요!\r\n"
				} else {
					QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k\r\n"
				}
				QS7 += "#k\#r#L60##b#v4000659#1개#k,#b#v4033311#1개#k,#b#v4033312#1개#k\r\n,#b#v4033302#1개#k,#b#v4033303#1개#k,#b#v4033304#1개#k\r\n #r(보상 : 스칼렛 랜덤아이템 )#k#l\r\n"
				cm.sendSimple(QS7);
			} else if (selection == 81) {
				var QS4 = "\r\n어리석은 자여 모험가 타이틀이 뭔지는 아는가?";
				QS4 += "\r\n그것은 바로 스스로가 인정받는예요. 바로 자신의 힘으로\r\n혹시 도전하고 싶은신가요?\r\n";
				QS4 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
				//QS4 += "\r\n\r\n#v1142009##v1142010##v1142011##fUI/UIWindow2.img/Title/main/icon1# #v1142012##v1142013##v3700148#"
				//QS4 += "\r\n\r\n타이틀을 획득하시면 다양한 혜택이 적용됩니다."
				//QS4 += "\r\n자신 스스로가 인정받을곳을 선택해주세요. \r\n제가 거기로 보내드릴게요.\r\n[한정반복퀘스트입니다.]";
				QS4 += "\r\n #k\#L210# #v1142009# 투신\r\n#l\r\n"
				QS4 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n전사계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 전사계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
				QS4 += "\r\n #k\#L211# #v1142010# 현자\r\n"
				QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n마법사계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 마법사계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
				QS4 += "\r\n #k\#L212# #v1142011# 스나이퍼 로드\r\n"
				QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n궁수계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 궁수계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
				QS4 += "\r\n #k\#L213# #v1142012# 레전더리 시프\r\n"
				QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n도적계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 도적계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
				QS4 += "\r\n #k\#L214# #v1142013# 해적왕\r\n"
				QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS4 += "\r\n\r\n해적계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 해적계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
				//QS4 += "\r\n #k\#L215# #v3700148# 스토리 all 완료자\r\n#l"
				//QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				//QS4 += "\r\n\r\n스토리퀘스트 올 클리어 타이틀입니다\r\n이것은  스토리퀘스트 올 클리어 증표입니다\r\n[한정퀘스트입니다.]";
				cm.sendSimple(QS4);
			} else if (selection == 84) {
				var QS8 = "어리석은 자여 시그너스 타이틀이 뭔지는 아는가?";
				QS8 += "\r\n바로 나한테 인정받는거지 바로 그대의 힘으로\r\n준비는 되었는가?\r\n";
				QS8 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
				//QS8 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [타이틀을 획득하시면 다양한 혜택이 적용됩니다.]"
				//QS8 += "\r\n\r\n선택하라 나한테 인정받을 곳을 \r\n나의 힘으로 그곳으로 보내주마\r\n[한정반복퀘스트입니다.]";
				QS8 += "\r\n #k\#L300# #v1142597# 시그너스의 여섯 별\r\n#l\r\n"
				QS8 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS8 += "\r\n\r\n시그너스의 최고의 타이틀입니다.\r\n이것을 획득한자는 시그너스에게 인정을 받게 됩니다.\r\n[한정반복퀘스트입니다.]";

				QS8 += "\r\n #k\#L301# #v1142403# 진정한 빛의 기사\r\n#l\r\n"
				QS8 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS8 += "\r\n\r\n미하일의 최고의 타이틀입니다.\r\n이것을 획득한자는 빛의 기사가 됩니다.\r\n[한정반복퀘스트입니다.]";
				cm.sendSimple(QS8);
			} else if (selection == 85) {
				var QS9 = "어리석은 자여 영웅타이틀이 뭔지는 아는가?";
				QS9 += "\r\n바로 나한테 인정받는거지 바로 그대의 힘으로\r\n준비는 되었는가?\r\n";
				QS9 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
				//QS9 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [타이틀을 획득하시면 다양한 혜택이 적용됩니다.]"
				//QS9 += "\r\n\r\n선택하라 나한테 인정받을 곳을 \r\n나의 힘으로 그곳으로 보내주마\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L400# #v1142379# 괴도 팬텀\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n팬텀들의 최고의 타이틀입니다.\r\n이것을 획득한자는 팬텀들 중에서 괴도 팬텀이 됩니다.\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L401# #v1142158# 영웅의 후계자\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n에반들의 최고의 타이틀입니다.\r\n이것을 획득한자는 에반들 중에서 후계자가 됩니다.\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L402# #v1142483# 운명의 대적자\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n루미너스들의 최고의 타이틀입니다.\r\n이것을 획득한자는 루미너스들 중에서 전설이 됩니다.\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L403# #v1142488# 극의에 도달한 자\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n카이저들의 최고의 타이틀입니다.\r\n이것을 획득한자는 카이저들 중에서 전설이 됩니다.\r\n[한정반복퀘스트입니다.]";

				QS9 += "\r\n #k\#L404# #v1142499# 슈퍼스타★\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n엔젤릭버스터들의 최고의 타이틀입니다.\r\n이것을 획득한자는 엔젤릭버스터들 중에서 슈퍼스타가 됩니다.\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L405# #v1142345# 복수의 화신\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n데몬들의 최고의 타이틀입니다.\r\n이것을 획득한자는 데몬들 중에서 전설이 됩니다.\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L406# #v1142340# 엘프의 왕\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n메르세데스들의 최고의 타이틀입니다.\r\n이것을 획득한자는 메르세데스들 중에서 여왕이 됩니다.\r\n[한정반복퀘스트입니다.]";
				QS9 += "\r\n #k\#L407# #v1142133# 영웅 아란\r\n#l\r\n"
				QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
				QS9 += "\r\n\r\n아란들의 최고의 타이틀입니다.\r\n이것을 획득한자는 아란들 중에서 영웅이 됩니다.\r\n[한정반복퀘스트입니다.]";
				cm.sendSimple(QS9);
			} else if (selection == 79) {
				var QS2 = "세상에는 다양한 보물들이 존재하지만 공짜란 없습니다..#b\r\n";
				QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k"
				QS2 += "\r\n 무엇을 선택하시겠습니까? 거레는 다양합니다.\r\n 특별히 필요한곳으로 보내주도록해드리지요.#b\r\n"
				//QS2 += "\r\n#fUI/UIWindow2.img/EvolvingSystem/BtStart/normal/0#\r\n"
				QS2 += "#k\#r#L1##b#v4000171#500개#k를 모아오겠습니다.(보상 : #v1152009# )#l"
				QS2 += "\r\n #k\#r#L5##b#v4000458#300개#k를 모아오겠습니다.(보상 : #v1112594# )#l"
				QS2 += "\r\n #k\#r#L3##b#v4000440#550개#k를 모아오겠습니다.(보상 : #v1032101# )#l"
				QS2 += "\r\n #k\#r#L4##b#v4000180#,#v4000181#550개#k를 모아오겠습니다.(보상 : #v1022123# )#l"
				QS2 += "\r\n #k\#r#L2##b#v4000364#,#v4000365#550개#k를 모아오겠습니다.(보상 : #v1122118# )#l\r\n"
				if (cm.haveItem(4000171, 500)) {
					QS2 += "\r\n\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L20##r#b#v4000171#500개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1152009#아이템의 퀘스트를 종료하겠습니다.#l";
				}
				if (cm.haveItem(4000458, 300)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L16##r#b#v4000458#300개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1112594#아이템의 퀘스트를 종료하겠습니다.#l";
				}
				if (cm.haveItem(4000440, 550)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L18##r#b#v4000440#550개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1032101#아이템의 퀘스트를 종료하겠습니다.#l";
				}
				if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L17##r#b#v4000180#550개,#v4000181#550개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1022123#아이템의 퀘스트를 종료하겠습니다.#l";
				}
				if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
					QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
					QS2 += "#k\r\n#L19##r#b#v4000364#550개,#v4000365#550개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1122118#아이템의 퀘스트를 종료하겠습니다.#l";
				}
				cm.sendSimple(QS2);
			}
		} else if (status == 2) {
			if (selection == 210) {
				if (cm.haveItem(4000653, 550)) {
					if (!cm.haveItem(1142009, 1)) {
						if (cm.canHold(1142009)) {
							cm.gainSponserItem(1142009, "명예의 칭호", 10, 10, 4);
							//cm.특별아이템레전드리(1142009);
							cm.gainItem(4000653, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000653# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
				cm.dispose();
			} else if (selection == 211) {
				if (cm.haveItem(4000650, 550)) {
					if (!cm.haveItem(1142010, 1)) {
						if (cm.canHold(1142010)) {
							cm.gainSponserItem(1142010, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000650, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000650# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
				cm.dispose();
			} else if (selection == 212) {
				if (cm.haveItem(4000652, 550)) {
					if (!cm.haveItem(1142011, 1)) {
						if (cm.canHold(1142011)) {
							cm.gainSponserItem(1142011, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000652, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000652# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
				cm.dispose();
			} else if (selection == 213) {
				if (cm.haveItem(4000649, 550)) {
					if (!cm.haveItem(1142012, 1)) {
						if (cm.canHold(1142012)) {
							cm.gainSponserItem(1142012, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000649, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000649# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
				cm.dispose();
			} else if (selection == 214) {
				if (cm.haveItem(4000651, 550)) {
					if (!cm.haveItem(1142013, 1)) {
						if (cm.canHold(1142013)) {
							cm.gainSponserItem(1142013, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000651, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000651# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
				cm.dispose();
			}
			/* else if (selection == 215) {
			if (cm.getQuestStatus(31229) == 2 && cm.getQuestStatus(3872) == 2 && cm.getQuestStatus(31328) == 2 && cm.getQuestStatus(3782) == 2 && cm.getQuestStatus(31259) == 2 && cm.getQuestStatus(31352) == 2 && cm.getPlayer().getKeyValue("QUEST7") == null) {
			cm.gainhorong(3700148);
			cm.getPlayer().setKeyValue("QUEST7", "1");
			cm.dispose();
			} else {
			cm.sendOk("모든 스토리퀘스트를 완료하지않았어!");
			cm.dispose();
			}
			}*/
			else if (selection == 300) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142597, 1)) {
						if (cm.canHold(1142597)) {
							cm.gainSponserItem(1142597, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 301) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142403, 1)) {
						if (cm.canHold(1142403)) {
							cm.gainSponserItem(1142403, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 400) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142379, 1)) {
						if (cm.canHold(1142379)) {
							cm.gainSponserItem(1142379, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 401) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142158, 1)) {
						if (cm.canHold(1142158)) {
							cm.gainSponserItem(1142158, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}

			} else if (selection == 402) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142483, 1)) {
						if (cm.canHold(1142483)) {
							cm.gainSponserItem(1142483, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}

			} else if (selection == 403) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142488, 1)) {
						if (cm.canHold(1142488)) {
							cm.gainSponserItem(1142488, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 404) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142499, 1)) {
						if (cm.canHold(1142499)) {
							cm.gainSponserItem(1142499, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 405) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142345, 1)) {
						if (cm.canHold(1142345)) {
							cm.gainSponserItem(1142345, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 406) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(114234, 1)) {
						if (cm.canHold(114234)) {
							cm.gainSponserItem(114234, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 407) {
				if (cm.haveItem(4000654, 550)) {
					if (!cm.haveItem(1142133, 1)) {
						if (cm.canHold(1142133)) {
							cm.gainSponserItem(1142133, "명예의 칭호", 10, 10, 4);
							cm.gainItem(4000654, -550);
							cm.sendOk("칭호를 지급해드렸습니다.\r\n해당 칭호는 주문서를 #r5번#k 사용할 수 있습니다");
						} else {
							cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.\r\n또는 이미 보유중입니다.");
						}
					} else {
						cm.sendOk("이미 해당 칭호를 보유중입니다.");
					}
				} else {
					cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
				}
			} else if (selection == 1) {
				//cm.warp(222010200);
				cm.sendOk("퀘스트에 필요한 재료를 모아오시기 바랍니다.");
				cm.dispose();
			} else if (selection == 2) {
				//cm.warp(261020400);
				cm.sendOk("퀘스트에 필요한 재료를 모아오시기 바랍니다.");
				cm.dispose();
			} else if (selection == 3) {
				//cm.warp(300010400);
				cm.sendOk("퀘스트에 필요한 재료를 모아오시기 바랍니다.");
				cm.dispose();
			} else if (selection == 4) {
				//cm.warp(230040400);
				cm.sendOk("퀘스트에 필요한 재료를 모아오시기 바랍니다.");
				cm.dispose();
			} else if (selection == 5) {
				//cm.warp(270030500);
				cm.sendOk("퀘스트에 필요한 재료를 모아오시기 바랍니다.");
				cm.dispose();
			} else if (selection == 20) {
				if (cm.haveItem(4000171, 500)) {
					if (cm.canHold(1152009)) {
						cm.gainItem(1152009, 1, true); //다크 호랑이 발톱
						cm.gainItem(4000171, -500);
						cm.sendOk("원하시던 물건이 맞으신가요?");
					} else {
						cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.");
					}
				} else {
					cm.sendOk("#b#v 4000171##k 아직 재료가 부족해요");
				}
				cm.dispose();
			} else if (selection == 19) {
				if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
					if (cm.canHold(1122118)) {
						cm.gainItem(1122118, 1, true); //영원한 사랑의 증표
						cm.gainItem(4000364, -550);
						cm.gainItem(4000365, -550);
						cm.sendOk("원하시던 물건이 맞으신가요?");
					} else {
						cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.");
					}
				} else {
					cm.sendOk("#b#v 4000364# #v 4000365##k 아직 재료가 부족해요");
				}
				cm.dispose();
			} else if (selection == 60) {
				if (cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1) && cm.haveItem(4033311, 1) && cm.haveItem(4033312, 1) && cm.haveItem(4000659, 1)) {
					var scroll = new Array(1482169, 1532099, 1522095, 1492180, 1302276, 1472215, 1452206, 1462194, 1442224, 1432168, 1422141, 1412136, 1402197, 1382209, 1372178, 1362091, 1342083, 1332226, 1322204, 1312154, 1242063, 1212065, 1222060, 1232058, 1242062);
					var itemid = scroll[Math.floor(Math.random() * scroll.length)];
					if (cm.canHold(scroll)) {
						cm.gainItem(itemid, 1, true);
						cm.gainItem(4033302, -1);
						cm.gainItem(4033303, -1);
						cm.gainItem(4033304, -1);
						cm.gainItem(4033311, -1);
						cm.gainItem(4033312, -1);
						cm.gainItem(4000659, -1);
						cm.sendOk("원하시던 물건이 맞으신가요?");
					} else {
						cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.");
					}
				} else {
					cm.sendOk("재료가 부족합니다.");
				}
				cm.dispose();
			} else if (selection == 18) {
				if (cm.haveItem(4000440, 550)) {
					if (cm.canHold(1032101)) {
						cm.gainItem(1032101, 1, true); //눈부신 알테어 이어링
						cm.gainItem(4000440, -550);
						cm.sendOk("원하시던 물건이 맞으신가요?");
					} else {
						cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.");
					}
				} else {
					cm.sendOk("#b#v 4000440##k 아직 재료가 부족해요");
				}
				cm.dispose();
			} else if (selection == 17) {
				if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
					if (cm.canHold(1022123)) {
						//cm.gainhorong(1022123);
						cm.gainItem(1022123, 1, true); //켄타의 물안경
						cm.gainItem(4000180, -550);
						cm.gainItem(4000181, -550);
						cm.sendOk("원하시던 물건이 맞으신가요?");
					} else {
						cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.");
					}
				} else {
					cm.sendOk("#b#v 4000180# #v 4000181##k 아직 재료가 부족해요");
				}
				cm.dispose();
			} else if (selection == 16) {
				if (cm.haveItem(4000458, 300)) {
					if (cm.canHold(1112594)) {
						cm.gainItem(1112594, 1); //눈꽃 엔젤릭 블레스
						cm.gainItem(4000458, -300);
						cm.sendOk("원하시던 물건이 맞으신가요?");
					} else {
						cm.sendOk("죄송하지만 인벤토리 공간이 충분하지 않으신 것 같네요. 인벤토리 공간을 비워주세요.");
					}
				} else {
					cm.sendOk("#b#v 4000458##k 아직 재료가 부족해요");
				}
				cm.dispose();
			}
		}
	}
}

