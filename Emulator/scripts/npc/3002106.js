var status = -1;
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"

importPackage(Packages.constants);

function start() { status = -1; action(1, 0, 0); }

function action(��, Ÿ, ��) {
	if (�� == -1) { cm.dispose(); } else {
        if (�� == 0)  { cm.dispose(); return; }
        if (�� == 1)  status++; else status--;

	if (status == 0) {
	////cm.��ų������();
	cm.sendSimple("                #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �������� "+��+"\r\n#fs10##Cgray#                                    ����� ������ �������ּ���.\r\n#k#fs12#\r\n#r�� "+ServerConstants.serverName+"#k �� ���� ���� ȯ���մϴ�.\r\n#b�� #h ##k ���� ������ �������ּ���. \r\n#b"
	+ "#L1##r������ �����ϰڽ��ϴ�.#l");
		if(cm.getPlayer().getJob() == 2004) {
		cm.teachSkill(27000106, 5, 5);
		cm.teachSkill(27000207, 5, 5);
		cm.teachSkill(27001201, 20, 20);
		cm.teachSkill(27001100, 20, 20);
		}

		if(cm.getPlayer().getJob() == 2003) {
		cm.teachSkill(20031207, 1, 1);
		}

		if(cm.getPlayer().getJob() == 2007) {
		cm.teachSkill(25001002, 25, 25);
		cm.teachSkill(25000003, 25, 25);
		}


		if(cm.getPlayer().getJob() == 3001) {
		cm.teachSkill(30010111, 1, 1);
		cm.teachSkill(30010185, 1, 1);
		cm.teachSkill(30010112, 2, 2);
		}

	} else if (status == 1) {

	����(cm.getPlayer().getJob());
	}

	else if (status == 2) {
	�������� = ��;
		if(�� < 1000) { ����(��); } else {
		cm.sendYesNo("#fn������� Extrabold#�ش� �������� ������ �����Ͻðڽ��ϱ�? �� �� ������ �����Ͻø� �� �̻� ������ �ٲ� �� �����ϴ�. \r\n\r\n#r�� �̿� ����� ���� ���ο� ������� �ش� â���� �� ��ư�� �����ø� ���� �̿� ����� ������ ������ ���ֵ˴ϴ�.\r\n\r\n#b�� �̿� ���� �������� �����Ŵٸ�, ��ȭ�� ������ �� ESC�� ���� ������ �����Ͻø� �˴ϴ�.");
		��Ÿ = 1;
		}
//cm.giveAllStatItemwatk(1142282,2000,200);
	} else if (status == 3) {
	���̳�  = ��;
		switch(��Ÿ) {
		case 1:
		for (var i = cm.getPlayer().getLevel(); i < 10; i++) { cm.gainExp(Packages.constants.GameConstants.getExpNeededForLevel(i)); }
		cm.dispose(); cm.warp(410000000, 0); cm.gainMeso(5000000); cm.giveAllStatItemwatk(1142282,300,50); �ڵ�����(); cm.getPlayer().changeJob(��������);/*cm.��ų������();*/ 

		break;

		default:
		cm.sendYesNo("#fn������� Extrabold#�ش� �������� ������ �����Ͻðڽ��ϱ�? �ش� �������� �޼� �Ҹ� ���� ���������� ���� �ٸ� Ŭ������ �ٸ� �������� �ٲ� �� �ֽ��ϴ�.\r\n\r\n#r�� �̿� ����� ���� ���ο� ������� �ش� â���� �� ��ư�� �����ø� ���� �̿� ����� ������ ������ ���ֵ˴ϴ�.\r\n\r\n#b�� �̿� ���� �������� �����Ŵٸ�, ��ȭ�� ������ �� ESC�� ���� ������ �����Ͻø� �˴ϴ�.");
		}

	} else if (status == 4) {
		for (var i = cm.getPlayer().getLevel(); i < 10; i++) { cm.gainExp(Packages.constants.GameConstants.getExpNeededForLevel(i)); }
		cm.dispose(); cm.dispose(); cm.warp(410000000, 0); cm.gainMeso(5000000); cm.giveAllStatItemwatk(1142282,300,50); ���谡�ڵ�����(); //cm.��ų������(); 
 
			if(���̳� == 532) {
			cm.getPlayer().changeJob(501);
			} else {
			cm.getPlayer().changeJob(��������);
			}
	}
}
}






function ����(i) {
	�� = "#fs11.5##Cgray#(";
	�� = ")#fs12#\r\n";
	
	�� = "#fn������� Extrabold##fs12##h #�� �Ʒ��� ��������Ʈ�� �����ϼ���.\r\n";
	switch(i) {
	case 0:
	�� += "#L100##b���硡  "+��+"�� �����, ��ũ����Ʈ, �ȶ��"+��+"";
	�� += "#L200##b������  "+��+"�� ��ũ������(��, ��), ��ũ������(��, ��), ���"+��+"";
	�� += "#L300##b�ü���  "+��+"�� ���츶����, �ű�"+��+"";
	�� += "#L400##b������  "+��+"�� ����Ʈ�ε�, ������, �����̴�"+��+"";
	�� += "#L500##b������  "+��+"�� ������, ĸƾ, ĳ����"+��+""; break;

	case 1000:
	�� += "#L1100##b�ҿ︶���͡�  "+��+"�� ���� �迭"+��+"";
	�� += "#L1200##b�÷������ڵ�  "+��+"�� ������ �迭"+��+"";
	�� += "#L1300##b����극��Ŀ  "+��+"�� �ü� �迭"+��+"";
	�� += "#L1400##b����Ʈ��Ŀ��  "+��+"�� ���� �迭"+��+"";
	�� += "#L1500##b��Ʈ����Ŀ��  "+��+"�� ���� �迭"+��+""; break;


	case 2000: �� += "#L2100##b�ƶ�"; break;
	case 2001: �� += "#L2200##b����"; break;
	case 2002: �� += "#L2300##b�޸�������"; break;
	case 2003: �� += "#L2400##b����"; break;
	case 2005: �� += "#L2500##b����"; break;
	case 2004: �� += "#L2700##b��̳ʽ�"; break;

	case 3000:
	�� += "#L3200##b��Ʋ������  "+��+"�� ������ �迭"+��+"";
	�� += "#L3300##b���ϵ�����  "+��+"�� �ü� �迭"+��+"";
	�� += "#L3500##b��ī�С���  "+��+"�� ���� �迭"+��+""; break;

	case 3001:
	�� += "#L3100##b���󽽷��̾�  "+��+"�� ���ݷ� �迭"+��+"";
	�� += "#L3101##b��������  "+��+"�� MaxHP �迭"+��+""; break;

	case 3002: �� += "#L3600##b����"; break;


	case 5000: �� += "#L5100##b������"; break;
	case 6000: �� += "#L6100##bī����"; break;
	case 6001: �� += "#L6500##b������������"; break;
        case 14000: �� += "#L14200##bŰ�׽ý�"; break;
	}
	cm.sendSimple(��);
}


function ����(i) {
	��Ÿ = 0;
	�� = i == 100 ? "����" : i == 200 ? "������" : i == 300 ? "�ü�" : i == 400 ? "����" : "����"
	�� = "#fn������� Extrabold##e"+��+" ����#n�� ���̽��ϴ�.���� #h #���� #b���� ����#k�� ����ּ���.#k ���� ������ 30, 60, 100�� �޼��ϸ� #r�ڵ����� ����#k�� �˴ϴ�.\r\n";

	switch(i) {
	case 100:
	�� += "#L112##b����Ρ���  "+��+"������ �� ũ�缼�̴� �� �����"+��+"";
	�� += "#L122##b�ȶ�򡡡�  "+��+"������ �� ����Ʈ �� �ȶ��"+��+"";
	�� += "#L132##b��ũ����Ʈ  "+��+"���Ǿ�� �� ����Ŀ �� ��ũ����Ʈ"+��+"";
	break;

	case 200:
	�� += "#L212##b��ũ������(��, ��)  "+��+"���ڵ� �� ������ �� ��ũ������"+��+"";
	�� += "#L222##b��ũ������(��, ��)  "+��+"���ڵ� �� ������ �� ��ũ������"+��+"";
	�� += "#L232##b���#e����#n����������"+��+"Ŭ���� �� ������Ʈ �� ���"+��+"";
	break;

	case 300:
	�� += "#L312##b���츶����  "+��+"���� �� ������ �� ���츶����"+��+"";
	�� += "#L322##b�űá�����  "+��+"��� �� ���ݼ� �� �ű�"+��+"";
	break;

	case 400:
	�� += "#L412##b����Ʈ�ε塡  "+��+"��ؽ� �� ��� �� ����Ʈ�ε�"+��+"";
	�� += "#L422##b���������  "+��+"���� �� ���������� �� ������"+��+"";
	�� += "#L434##b�����̴�  "+��+"�� �� ������ �� �����̴�"+��+"";
	break;

	case 500:
	�� += "#L512##b�����ۡ���  "+��+"�������� �� ��Ŀ�Ͼ� �� ������"+��+"";
	�� += "#L522##bĸƾ������  "+��+"�ǽ����� �� ��Ű�� �� ĸƾ"+��+"";
	�� += "#L532##bĳ������  "+��+"ĳ���� �� ĳ������� �� ĳ������"+��+"";
	break;
	}

	cm.sendSimple(��);

}


function �ڵ�����() {
	switch(��������) {
	case 570:  cm.getPlayer().setKeyValue("AutoJob", "571"); break;
	case 1100: cm.getPlayer().setKeyValue("AutoJob", "1110"); break;
	case 1200: cm.getPlayer().setKeyValue("AutoJob", "1210"); break;
	case 1300: cm.getPlayer().setKeyValue("AutoJob", "1310"); break;
	case 1400: cm.getPlayer().setKeyValue("AutoJob", "1410"); break;
	case 1500: cm.getPlayer().setKeyValue("AutoJob", "1510"); break;

	case 2100: cm.getPlayer().setKeyValue("AutoJob", "2110"); break;
	case 2200: cm.getPlayer().setKeyValue("AutoJob", "2210"); break;
	case 2300: cm.getPlayer().setKeyValue("AutoJob", "2310"); break;
	case 2400: cm.getPlayer().setKeyValue("AutoJob", "2410"); break;
	case 2500: cm.getPlayer().setKeyValue("AutoJob", "2510"); break;
	case 2700: cm.getPlayer().setKeyValue("AutoJob", "2710"); break;

	case 3100: cm.getPlayer().setKeyValue("AutoJob", "3110"); break;
	case 3101: cm.getPlayer().setKeyValue("AutoJob", "3120"); break;
	case 3200: cm.getPlayer().setKeyValue("AutoJob", "3210"); break;
	case 3300: cm.getPlayer().setKeyValue("AutoJob", "3310"); break;
	case 3500: cm.getPlayer().setKeyValue("AutoJob", "3510"); break;
	case 3600: cm.getPlayer().setKeyValue("AutoJob", "3610"); break;
	case 4100: cm.getPlayer().setKeyValue("AutoJob", "4110"); break;
	case 4200: cm.getPlayer().setKeyValue("AutoJob", "4210"); break;


	case 5100: cm.getPlayer().setKeyValue("AutoJob", "5110"); break;

	case 6100: cm.getPlayer().setKeyValue("AutoJob", "6110"); break;
	case 6500: cm.getPlayer().setKeyValue("AutoJob", "6510"); break;
	case 14200: cm.getPlayer().setKeyValue("AutoJob", "14200"); break;

	}
}


function ���谡�ڵ�����() {
	switch(���̳�) {
	case 112: cm.getPlayer().setKeyValue("AutoJob", "110"); break;
	case 122: cm.getPlayer().setKeyValue("AutoJob", "120"); break;
	case 132: cm.getPlayer().setKeyValue("AutoJob", "130"); break;
	case 212: cm.getPlayer().setKeyValue("AutoJob", "210"); break;
	case 222: cm.getPlayer().setKeyValue("AutoJob", "220"); break;
	case 232: cm.getPlayer().setKeyValue("AutoJob", "230"); break;
	case 312: cm.getPlayer().setKeyValue("AutoJob", "310"); break;
	case 322: cm.getPlayer().setKeyValue("AutoJob", "320"); break;
	case 412: cm.getPlayer().setKeyValue("AutoJob", "410"); break;
	case 422: cm.getPlayer().setKeyValue("AutoJob", "420"); break;
	case 434: cm.getPlayer().setKeyValue("AutoJob", "430"); break;
	case 512: cm.getPlayer().setKeyValue("AutoJob", "510"); break;
	case 522: cm.getPlayer().setKeyValue("AutoJob", "520"); break;
	case 532: cm.getPlayer().setKeyValue("AutoJob", "530"); break;
	}
}