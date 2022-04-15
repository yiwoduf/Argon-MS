importPackage (Packages.server.quest);

var status = -1;

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
	var chat = "�� ���� �̾߱⿡�� ��û�� ������ ������ �ֽ��ϴ�. ������ �̾߱⿡ �����غ����䡦\r\n\r\n";
	chat += "#fUI/UIWindow2.img/UtilDlgEx/list4#\r\n"
	chat += "#L1##r��#d ���丮 : ���� ��#l\r\n";
	chat += "#L2##r��#d ���丮 : Ȳ�ݻ��#l\r\n";
	chat += "#L3##r��#d ���丮 : ��Ÿ��ƽ �׸���ũ#l\r\n";
	chat += "#L4##r��#d ���丮 : �ð��� ����#l\r\n";
	chat += "#L5##r��#d ���丮 : ��Ÿ��#l\r\n";
	chat += "#L6##r��#d ���丮 : Ȳȥ�� �丮��#l\r\n";
	chat += "#L7##r��#d ���丮 : ũ��Ƽ�ƽ�#l\r\n\r\n\r\n";
	chat += "#fUI/UIWindow2.img/UtilDlgEx/list2#\r\n"
	chat += "#L8##r��#d ���� ȸ�������� �����ּ���.\r\n";
	chat += "#L9##r��#d ���丮 Ŭ���� ������ �ް�;��.";

	cm.sendSimple(chat);

	} else if (status == 1) {
	sL = selection;
	StoryN = sL == 1 ? "���� ��" : sL == 2 ? "Ȳ�ݻ��" : sL == 3 ? "��Ÿ��ƽ �׸���ũ" : sL == 4 ? "�ð��� ����" : sL == 5 ? "��Ÿ��" : sL == 6 ? "Ȳȥ�� �丮��" : sL == 7 ? "ũ��Ƽ�ƽ�" : "";
	QstVal = sL == 1 ? 100       : sL == 2 ? 200        : sL == 3 ? 300                 : sL == 4 ? 400           : sL == 5 ? 500        : sL == 6 ? 600             : sL == 7 ? 700 : 1;
	QstInf = sL == 1 ? 31200     : sL == 2 ? 3853       : sL == 3 ? 31300               : sL == 4 ? 3500          : sL == 5 ? 0          : sL == 6 ? 0               : sL == 7 ? 32490 : 0;
	QstMap = sL == 1 ? 222020400 : sL == 2 ? 252000000  : sL == 3 ? 223000000           : sL == 4 ? 270000000     : sL == 5 ? 0          : sL == 6 ? 0               : sL == 7 ? 241020220 : 0;
		if(sL < 8) {
		cm.askAcceptDecline("#b"+StoryN+"#k ���丮�� �����Ͻðڽ��ϱ�? ��� ���丮�� �Ϸ��Ͻ� ��� �߰� ������ ���� �� �ֽ��ϴ�. �� �� ���丮�� �����ϸ� ����� �� �����ϴ�. �׷��� �����Ͻðڽ��ϱ�?\r\n\r\n#r#e���丮 ���࿡ ������ ����� NPC ����Ƽ�� ���� ������ �������ֽñ� �ٶ��ϴ�.");
		} else {
			if(sL == 8) {
				if (cm.getQuestStatus(31902) != 0) {
				cm.dispose();
				cm.warp(913050010, 1);
				} else {
				cm.dispose();
				cm.getPlayer().dropMessage(5, "[Ȳȥ�� �丮��] �丮���� �ұ��� �� ����Ʈ�� �����ϱ� ������ �̵��� �� �����ϴ�.")
				}
			} else if(sL == 9) {
				var text = "�Ϸ��� ���丮�� ����Դϴ�. ù ȸ�� ���ؼ� Ư�� ������ ���� �� �ֽ��ϴ�. �̹� ������ ���� ���丮�� ��Ͽ��� ���ܵ˴ϴ�.#b"
				if(cm.getQuestStatus(31232) == 2 && cm.getPlayer().getKeyValue("31232") != 2) {
				text += "\r\n#L31232##r��#d ���丮 : ���� ��#l";
				}
				if(cm.getQuestStatus(3872) == 2 && cm.getPlayer().getKeyValue("3872") != 2) {
				text += "\r\n#L3872##r��#d ���丮 : Ȳ�ݻ��#l";
				}
				if(cm.getQuestStatus(31328) == 2 && cm.getPlayer().getKeyValue("31328") != 2) {
				text += "\r\n#L31328##r��#d ���丮 : ��Ÿ��ƽ �׸���ũ#l";
				}
				if(cm.getQuestStatus(3521) == 2 && cm.getPlayer().getKeyValue("3521") != 2) {
				text += "\r\n#L3521##r��#d ���丮 : �ð��� ����#l";
				}
				if(cm.getQuestStatus(32524) == 2 && cm.getPlayer().getKeyValue("32524") != 2) {
				text += "\r\n#L32524##r��#d ���丮 : ũ��Ƽ�ƽ�#l";
				}
				cm.sendSimple(text);
			}
		}

	} else if (status == 2) {
		if(QstVal != 1) {
			if(QstVal != 500 && QstVal != 600 && QstVal != 700) {
				if(cm.getQuestStatus(QstInf) != 2) {
				cm.forceCompleteQuest(QstInf);
				cm.getPlayer().dropMessage(5, ""+StoryN+" ���丮�� ��Ȱ�� ������ ���� ���� ����Ʈ�� ��� �Ϸ��ص�Ƚ��ϴ�.")
				} else {
				cm.warp(QstMap, 0);
				cm.getPlayer().dropMessage(5, "���丮 ���࿡ ������ ����� NPC ����Ƽ�� ���� ������ �������ֽñ� �ٶ��ϴ�.")
				cm.dispose();
				}
			}
			else if (QstVal == 500) {
				if(cm.getPlayer().getLevel() >= 125) {
					if(cm.getPlayer().getKeyValue("luta") == null) {
					cm.getPlayer().setKeyValue("luta","start");
					}
				cm.dispose();
				cm.openNpc(1103005);
				}
				else {
				cm.sendNext("��Ÿ�� ���丮�� 125 ���� �̻���� ������ �����մϴ�.");
				}
			}
			else if (QstVal == 600) {
				if(cm.getQuestStatus(31900) != 2) {
				cm.forceCompleteQuest(31900);
				cm.getPlayer().dropMessage(5, ""+StoryN+" ���丮�� ��Ȱ�� ������ ���� ���� ����Ʈ�� ��� �Ϸ��ص�Ƚ��ϴ�.")
				}
				if (cm.getQuestStatus(31901) != 2) {
				cm.warp(102000003, 1);
				cm.startQuest(31901);
				cm.getPlayer().dropMessage(5, "����Ʈ �Ϸ� ��, NPC ũ������ ���� ���� ȸ�������� �� �� �ֽ��ϴ�.")
				} else {
				cm.dispose();
				cm.warp(273000000, 1);
				cm.getPlayer().dropMessage(5, "���丮 ���࿡ ������ ����� NPC ����Ƽ�� ���� ������ �������ֽñ� �ٶ��ϴ�.")
				}
			} else if (QstVal == 700) {
				if(cm.getQuestStatus(QstInf) != 2) {
				cm.forceCompleteQuest(QstInf);
				cm.getPlayer().dropMessage(5, ""+StoryN+" ���丮�� ��Ȱ�� ������ ���� ���� ����Ʈ�� ��� �Ϸ��ص�Ƚ��ϴ�.")
				} else {					
					if(cm.getPlayer().getQuestStatus(32524) != 2) {
					cm.warp(241020220, 0);
					cm.getPlayer().dropMessage(5, "���丮 ���࿡ ������ ����� NPC ����Ƽ�� ���� ������ �������ֽñ� �ٶ��ϴ�.")
					} else {
					cm.warp(241000220, 0);
					}
				cm.getPlayer().dropMessage(5, "ũ��Ƽ�ƽ� ���丮�� �Ϸ��ϼż� ����ġ�� ������ ��ǥ ��� Ȯ���� ����մϴ�.")
				cm.dispose();
				}
			}
		} else {
			switch(selection) {
				case 31232 :
				if(cm.getPlayer().getKeyValue("31232") == null) {
				cm.getPlayer().setKeyValue("31232", "1")
				cm.sendNext("������ ���������� ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				} else {
				cm.sendNext("�̹� ������ ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				}
				cm.dispose();
				rbreak;

				case 3872 :
				if(cm.getPlayer().getKeyValue("3872") == null) {
				cm.getPlayer().setKeyValue("3872", "1")
				cm.sendNext("������ ���������� ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				} else {
				cm.sendNext("�̹� ������ ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				}
				cm.dispose();
				rbreak;

			case 31328 :
				if(cm.getPlayer().getKeyValue("31328") == null) {
				cm.getPlayer().setKeyValue("31328", "1")
				cm.sendNext("������ ���������� ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				} else {
				cm.sendNext("�̹� ������ ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				}
				cm.dispose();
				rbreak;

			case 3521:
				if(cm.getPlayer().getKeyValue("3521") == null) {
				cm.getPlayer().setKeyValue("3521", "1")
				cm.sendNext("������ ���������� ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				} else {
				cm.sendNext("�̹� ������ ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				}
				cm.dispose();
				break;

			case 32524:
				if(cm.getPlayer().getKeyValue("32524") == null) {
				cm.getPlayer().setKeyValue("32524", "1")
				cm.sendNext("������ ���������� ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				} else {
				cm.sendNext("�̹� ������ ���޵Ǿ����ϴ�. #bNPC ���ù���#k�� ���� ���ɹ��� �� �ֽ��ϴ�.");
				}
				cm.dispose();
				break;

			}
		}

	} else if (status == 3) {

	} else if (status == 4) {

	} else if (status == 5) {

	} else if (status == 6) {
	}
}
}