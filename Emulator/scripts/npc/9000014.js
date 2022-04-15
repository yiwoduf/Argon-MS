/*
위 스크립트의 저작권은 FoxDevelopTeam 팀장 Fox에게 있습니다.
문의 : rinus_alt / fox_devel@nate.com / opharks (skype)
*/

importPackage(Packages.client);
importPackage(Packages.constants);

var status = 0;
var select = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			//cm.showWZEffect("UI/SoulUI.img/DungeonEffect/start", 1);
			var raid = "#r#e[컨텐츠 : 보스레이드]\r\n";
			raid += "#n#k주어신 시간 내, 모든 보스를 무찌르는 컨텐츠입니다.\r\n\r\n"
			raid += "#e[난이도 선택]\r\n"
			raid += "#L1##fUI/UIToolTip/Item/Equip/Star/Star0##l"
			raid += "#L2##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##l"
			raid += "#L3##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##l"
			raid += "#L4##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##l"
			cm.sendSimple(raid);
		} else if (status == 1) {
			var easy = "#r#e[보스레이드 : ";
			if (selection == 1) {
				easy += "이지]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star0#(쉬움) 난이도에 도전하시겠습니까?\r\n"
				easy += "보스레이드는 #r난이도에 상관없이 1일 3회#k로 제한됩니다.\r\n"
				easy += "#L1##b도전한다"
				easy += "#L99#도전하지않는다"
			} else if (selection == 2) {
				easy += "노멀]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star#(보통) 난이도에 도전하시겠습니까?\r\n"
				easy += "보스레이드는 #r난이도에 상관없이 1일 3회#k로 제한됩니다.\r\n"
				easy += "#L2##b도전한다"
				easy += "#L99#도전하지않는다"
			} else if (selection == 3){
				easy += "하드]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star##fUI/UIToolTip/Item/Equip/Star/Star#(어려움) 난이도에 도전하시겠습니까?\r\n"
				easy += "보스레이드는 #r난이도에 상관없이 1일 3회#k로 제한됩니다.\r\n"
				easy += "#L3##b도전한다"
				easy += "#L99#도전하지않는다"
			} else if (selection == 4) {
				easy += "나이트메어]#k#n\r\n"
				easy += "#fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1##fUI/UIToolTip/Item/Equip/Star/Star1#(매우 어려움) 난이도에 도전하시겠습니까?\r\n"
				easy += "보스레이드는 #r난이도에 상관없이 1일 3회#k로 제한됩니다.\r\n"
				easy += "#L4##b도전한다"
				easy += "#L99#도전하지않는다"
			}
				cm.sendSimple(easy);
		} else if (status == 2) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				cm.dispose();
			} else if (selection == 3) {
				cm.dispose();
			} else if (selection == 4) {
				cm.dispose();
			} else if (selection == 99) {
				cm.dispose();
			}
		}
	}
}