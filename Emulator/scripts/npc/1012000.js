/*
�� ��ũ��Ʈ�� ���۱��� FoxDevelopTeam ���� Fox���� �ֽ��ϴ�.
���� : rinus_alt / fox_devel@nate.com / opharks (skype)
*/
importPackage(java.sql);
importPackage(java.util);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.client);
importPackage(Packages.constants);

var status = 0;
var select = -1;
var number = 5; // ���� �Ϸ� ����Ƚ��
var bossornot = false; 
function start() {
    status = -1;
    action(1, 0, 0);
}
function z(i, z)
{
	switch(z)
	{
		case 1:
		return "#fn����ü#"+i+"  #fn����#";

		case 2:
		return "#fn����ü#"+i+" #fn����#";

		default:
		return "#fn����ü#"+i+"#fn����#";
	}
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
			var warp = "���Ͻô� ������ �����ٵ帮�� �ýö��ϴ�!\r\n";
			warp += "#L2##r#e�������� �����#k#l";
			if (cm.getPlayer().getJob() >= 3300 && cm.getPlayer().getJob() <= 3312) {
				warp += "\r\n#L9##e��Ծ� ������#n�� �����Ѵ�#l\r\n\r\n"
			}
				warp += "\r\n#L5##r���� ������ ��#k���� �̵��ϰ�ͽ��ϴ�#l";
			
			//warp += "\r\n\r\n#e#r*#b ��#g��#r ��#b��#g��#rƮ#b :#g ��#r��";
			cm.sendSimple(warp);

		} else if (status == 1) {
		       if (selection == 1) {
		             cm.dispose();
                             cm.warp(910000001);
				cm.sendSimple(warp);

			} else if (selection == 2) {
				var level = "#r���� "+cm.getPlayer().getLevel()+"#k�� �´� ����͸� ����մϴ�\r\n";
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L101020100#Lv."+z( 10, 2)+" �� �ھƿ���������  �� ����� ����� ��#l\r\n"
					level += "#b#L103010000#Lv."+z( 10, 2)+" �� �����塡������  �� �߶�����#l\r\n"
					level += "#b#L100040000#Lv."+z( 15, 2)+" �� �񷽻��������  �� ���� ��� �Ա�#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L102020000#Lv."+z( 20, 2)+" �� ���ʹ����ꡡ��  �� �丮�� ���ʷ�#l\r\n"
					level += "#b#L101030000#Lv."+z( 26, 2)+" �� ���ʽ���������  �� �Ŵ��� ����#l\r\n"
					level += "#b#L101030200#Lv."+z( 28, 2)+" �� ���ʽ���������  �� ���ʽ�����#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L101070100#Lv."+z( 30, 2)+" �� �ѿ��� ���� ������ ������ ȣ����1#l\r\n"
					level += "#b#L101072200#Lv."+z( 33, 2)+" �� �����п� ������ �� 2�� ����#l\r\n"
					level += "#b#L120040300#Lv."+z( 35, 2)+" �� ����ġ������  �� �غ��� Ǯ��3#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L120041800#Lv."+z( 42, 2)+" �� ����ġ������  �� ��ģ �ĵ�#l\r\n"
					level += "#b#L103020410#Lv."+z( 45, 2)+" �� Ŀ�׽�Ƽ����ö  �� 2ȣ�� 2����#l\r\n"
					level += "#b#L103030200#Lv."+z( 47, 2)+" �� �����롡������  �� ������ ũ����#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L103030400#Lv."+z( 50, 2)+" �� �����롡������  �� ���� ����#l\r\n"
					level += "#b#L102030000#Lv."+z( 55, 2)+" �� ��Ÿ����������  �� ���ϵ庸���� ��#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L102040301#Lv."+z( 62, 2)+" �� �����߱�������  �� ��1����#l\r\n"
					level += "#b#L105010000#Lv."+z( 66, 2)+" �� ��������������  �� ������ ����#l\r\n"
					level += "#b#L105020000#Lv."+z( 67, 2)+" �� �巹��ũ�� ���� �� ���� ���� �ʴ� ��#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L200010200#Lv."+z( 71, 2)+" �� ��ī�̷ε塡��  �� �ϴð��1#l\r\n"
					level += "#b#L200080000#Lv."+z( 76, 2)+" �� ��ī�̷ε塡��  �� ��������6#l\r\n"
					level += "#b#L211040001#Lv."+z( 79, 2)+" �� ���罺Ʈ��Ʈ��  �� �հ��� �ֳ�����#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L211040200#Lv."+z( 81, 2)+" �� ������ ��ơ��� �� ������¥��2#l\r\n"
					level += "#b#L310060120#Lv."+z( 85, 2)+" �� �ָ��޸� ������ �� �ȵ���̵� ������3#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L260020600#Lv."+z( 90, 2)+" �� ���·ε塡����  �� ��������2#l\r\n"
					level += "#b#L261020400#Lv."+z( 95, 2)+" �� ��ī��� ������ �� ������ C-2 ����#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L300030300#Lv."+z(100, 3)+" �� ���� ���������� �� ���� ��2#l\r\n"
					level += "#b#L240010200#Lv."+z(105, 3)+" �� �̳�����������  �� �ɼ������� ��#l\r\n"
					level += "#b#L230040000#Lv."+z(107, 3)+" �� ����Ʒε塡��  �� ���� �ٴ� ����1#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L220011000#Lv."+z(113, 3)+" �� ���긮������  �� �ϴ��׶�<5>#l\r\n"
					level += "#b#L220020000#Lv."+z(114, 3)+" �� ���긮������  �� �峭������<1����>1����#l\r\n"
					level += "#b#L220020600#Lv."+z(114, 3)+" �� ���긮������  �� �峭������<����>#l\r\n"
					level += "#b#L252010000#Lv."+z(118, 3)+" �� Ȳ�ݻ��������  �� �������� ��1#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L211041000#Lv."+z(123, 3)+" �� �󱤡���������  �� �����ǿ���3#l\r\n"
					level += "#b#L250020000#Lv."+z(126, 3)+" �� �������������  �� �ʱ� ������#l\r\n"
					level += "#b#L251010402#Lv."+z(126, 3)+" �� �������������  �� ������ ������ �ұ�2#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L224000100#Lv."+z(130, 3)+" �� �Ʒ�����������  �� ��� �Ա�#l\r\n"
					level += "#b#L224000131#Lv."+z(137, 3)+" �� �Ʒ�����������  �� �� ��#l\r\n"
					level += "#b#L224000141#Lv."+z(139, 3)+" �� �Ʒ�����������  �� ���� �� �䰡#l\r\n"
				}
				if (cm.getPlayer().getLevel() > 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L240030104#Lv."+z(142, 3)+" �� ���罺Ʈ��Ʈ��  �� ������ ���� ����2#l\r\n"
					level += "#b#L240040520#Lv."+z(145, 3)+" �� �̳�����������  �� ������ ���� ����#l\r\n"
					level += "#b#L270010500#Lv."+z(148, 3)+" �� Ÿ�ӷε塡����  �� �߾��� ��5#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L240040521#Lv."+z(150, 3)+" �� �̳�����������  �� ������ ���� ����#l\r\n"
					level += "#b#L270020100#Lv."+z(151, 3)+" �� Ÿ�ӷε塡����  �� ��ȸ�� ��1#l\r\n"
					level += "#b#L240091100#Lv."+z(157, 3)+" �� �ݷμ���������  �� ������ ������ 1#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L270030100#Lv."+z(161, 3)+" �� Ÿ�ӷε塡����  �� ������ ��1#l\r\n"
					level += "#b#L271010100#Lv."+z(162, 3)+" �� �ı��� ��׽ý� �� �ı��� ��׽ý� ����#l\r\n"
					level += "#b#L271020100#Lv."+z(164, 3)+" �� �ı��� ��׽ý� �� ������ ��뷡 ���ֱ�#l\r\n"
					level += "#b#L271010301#Lv."+z(167, 3)+" �� �ı��� �������� �� ������ ���#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L271030100#Lv."+z(170, 3)+" �� ���� ������� �� ���� �� 1����#l\r\n"
					level += "#b#L271030400#Lv."+z(176, 3)+" �� ���� ������� �� ���� �� 4����#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L271030530#Lv."+z(182, 3)+" �� ���� ������� �� ����� ����4#l\r\n"
					level += "#b#L241000218#Lv."+z(188, 3)+" �� ŷ���ε塡����  �� ������ ��2#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L241000211#Lv."+z(190, 3)+" �� ŷ���ε塡����  �� ���۵Ǵ� ����� ��5#l\r\n"
					level += "#b#L273060300#Lv."+z(198, 3)+" �� Ȳȥ�� �丮�¡� �� ������� ������#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L241000201#Lv."+z(200, 3)+" �� ŷ���ε塡����  �� ������� ����� ��5#l\r\n"
					level += "#b#L241000216#Lv."+z(200, 3)+" �� ŷ���ε塡����  �� Ÿ���� ������ ��1#l\r\n"
					level += "#b#L241000206#Lv."+z(205, 3)+" �� ŷ���ε塡����  �� Ÿ���� ������ ��2#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L241000226#Lv."+z(210, 3)+" �� ŷ���ε塡����  �� Ÿ���� ������ ��3#l\r\n"
					level += "#b#L241000221#Lv."+z(210, 3)+" �� ŷ���ε塡����  �� ������ �ʴ� ����� ��5#l\r\n"
					level += "#b#L105300203#Lv."+z(218, 3)+" �� Ÿ���� ������� �� ���ϴ� �ٱ� ������#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L310070200#Lv."+z(222, 3)+" �� ��ī�̶��Ρ���  �� ��ī�̶��� �ö󰡴� ��#l\r\n"
					level += "#b#L310070230#Lv."+z(222, 3)+" �� ��ī�̶��Ρ���  �� ��ī�̶���2#l\r\n"
					level += "#b#L310070400#Lv."+z(226, 3)+" �� ����졡����  �� ����� ������1#l\r\n"
					level += "#b#L105300301#Lv."+z(228, 3)+" �� Ÿ���� ������� �� ��� �ٱ� ������#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L310070470#Lv."+z(230, 3)+" �� ����졡����  �� ����� ������3#l\r\n"
					level += "#b#L310070490#Lv."+z(230, 3)+" �� ����졡����  �� ����� ���� �̷�7#l\r\n"
				}
				if (cm.getPlayer().getLevel() >= 1 && cm.getPlayer().getLevel() < 250) {
					level += "#b#L450002006#Lv."+z(240, 3)+" �� �� ������Ʈ�� �� ���� ���۽�1#l\r\n"
					level += "#b#L450002007#Lv."+z(240, 3)+" �� �� ������Ʈ�� �� ���� ���۽�2#l\r\n"
					level += "#b#L450002008#Lv."+z(240, 3)+" �� �� ������Ʈ�� �� ���� ���۽�1#l\r\n"
					level += "#b#L450002009#Lv."+z(240, 3)+" �� �� ������Ʈ�� �� ���� ���۽�2#l\r\n"
					level += "#b#L450002010#Lv."+z(240, 3)+" �� �� ������Ʈ�� �� ��������Ʈ ���� ��#l\r\n"
				}
				cm.sendSimple(level);
				
			} else if (selection == 4) {
				var boss = "������ ������ �����ðڽ��ϱ�?\r\n";
				//boss += "#L211042300##fUI/UIWindow2.img/UserList/Main/Boss/BossList/1/Icon/normal/0#"
				//boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(211042300)+"#k ]#fs12##l\r\n";

				boss += "#L211042402##fUI/UIWindow2.img/UserList/Main/Boss/BossList/1/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(211042402)+"#k ]#fs12##l\r\n";

				boss += "#L240050400##fUI/UIWindow2.img/UserList/Main/Boss/BossList/2/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(240050400)+"#k ]#fs12##l\r\n";

				boss += "#L270050000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/11/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(270050000)+"#k ]#fs12##l\r\n";

				boss += "#L272020210##fUI/UIWindow2.img/UserList/Main/Boss/BossList/9/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(272020210)+"#k ]#fs12##l\r\n";

				boss += "#L271040000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/12/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(271040000)+"#k ]#fs12##l\r\n";

				boss += "#L401060000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/10/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(401060000)+"#k ]#fs12##l\r\n";

				boss += "#L211070000##fUI/UIWindow2.img/UserList/Main/Boss/BossList/8/Icon/normal/0#"
				boss += "#fs11#[ ���� ���� ���� Ƚ�� : #r "+getRemain(211070000)+"#k ]#fs12##l\r\n";
				bossornot = true;
                cm.sendSimple(boss);
			} else if (selection == 5) {
				picStar = "#fUI/UIWindow2.img/ToolTip/Equip/Star/Star#";
				var star = "#r��Ÿ����#k ����ͷ� �����ðڽ��ϱ�?\r\n";
					star += "#L240010600##rLv."+z(107, 3)+" �� "+picStar+"��"+z(  5, 1)+" �� �ϴ� ����2#l\r\n"
					star += "#L240010520##bLv."+z(107, 3)+" �� "+picStar+"��"+z(  5, 1)+" �� �ϴ� ����3#l\r\n"
					star += "#L240010510##bLv."+z(109, 3)+" �� "+picStar+"��"+z(  5, 1)+" �� ����� ��¥��2#l\r\n"
					star += "#L240020200##bLv."+z(110, 3)+" �� "+picStar+"��"+z( 15, 2)+" �� ���� ��Ÿ��ν��� ����#l\r\n"
					star += "#L240020210##bLv."+z(110, 3)+" �� "+picStar+"��"+z( 15, 2)+" �� ��Ұ� ���� ����#l\r\n"
					star += "#L240020300##bLv."+z(110, 3)+" �� "+picStar+"��"+z( 15, 2)+" �� ���� ����� ����#l\r\n"
					star += "#L220060000##rLv."+z(116, 3)+" �� "+picStar+"��"+z( 25, 2)+" �� ��Ʋ�� �ð��� ��<1>#l\r\n"
					star += "#L220070000##rLv."+z(116, 3)+" �� "+picStar+"��"+z( 25, 2)+" �� ������ �ð��� ��<1>#l\r\n"
					star += "#L220060100##rLv."+z(117, 3)+" �� "+picStar+"��"+z( 25, 2)+" �� ��Ʋ�� �ð��� ��<2>#l\r\n"
					star += "#L220070100##rLv."+z(117, 3)+" �� "+picStar+"��"+z( 25, 2)+" �� ������ �ð��� ��<2>#l\r\n"
					star += "#L220060200##bLv."+z(118, 3)+" �� "+picStar+"��"+z( 26, 2)+" �� ��Ʋ�� �ð��� ��<3>#l\r\n"
					star += "#L220070200##bLv."+z(118, 3)+" �� "+picStar+"��"+z( 26, 2)+" �� ������ �ð��� ��<3>#l\r\n"
					star += "#L220060300##bLv."+z(119, 3)+" �� "+picStar+"��"+z( 27, 2)+" �� ��Ʋ�� �ð��� ��<4>#l\r\n"
					star += "#L220070300##bLv."+z(119, 3)+" �� "+picStar+"��"+z( 27, 2)+" �� ������ �ð��� ��<4>#l\r\n"
					star += "#L220060400##bLv."+z(120, 3)+" �� "+picStar+"��"+z( 28, 2)+" �� ��Ʋ�� ȸ��#l\r\n"
					star += "#L220070400##rLv."+z(122, 3)+" �� "+picStar+"��"+z( 28, 2)+" �� ������ ȸ��#l\r\n"
					star += "#L211041500##bLv."+z(132, 3)+" �� "+picStar+"��"+z( 50, 2)+" �� ��1#l\r\n"
					star += "#L211041600##bLv."+z(132, 3)+" �� "+picStar+"��"+z( 50, 2)+" �� ��2#l\r\n"
					star += "#L211041700##bLv."+z(132, 3)+" �� "+picStar+"��"+z( 50, 2)+" �� ��3#l\r\n"
					star += "#L211041800##bLv."+z(132, 3)+" �� "+picStar+"��"+z( 50, 2)+" �� ��4#l\r\n"
					star += "#L211042000##bLv."+z(132, 3)+" �� "+picStar+"��"+z( 55, 2)+" �� �÷��� ����1#l\r\n"
					star += "#L211042100##bLv."+z(135, 3)+" �� "+picStar+"��"+z( 55, 2)+" �� �÷��� ����2#l\r\n"
					star += "#L211042200##bLv."+z(136, 3)+" �� "+picStar+"��"+z( 55, 2)+" �� �÷��� ����3#l\r\n"
					star += "#L240040300##rLv."+z(141, 3)+" �� "+picStar+"��"+z( 65, 2)+" �� ������ ���ʱ�#l\r\n"
					star += "#L240040320##rLv."+z(141, 3)+" �� "+picStar+"��"+z( 65, 2)+" �� ���� ���̹��� ����#l\r\n"
					star += "#L240040510##rLv."+z(150, 3)+" �� "+picStar+"��"+z( 65, 2)+" �� ���� ���� ����#l\r\n"
					star += "#L240040511##bLv."+z(150, 3)+" �� "+picStar+"��"+z( 70, 2)+" �� ������ ���� ����1#l\r\n"
					star += "#L240040512##bLv."+z(150, 3)+" �� "+picStar+"��"+z( 70, 2)+" �� ������ ���� ����2#l\r\n"
					star += "#L270030600##bLv."+z(160, 3)+" �� "+picStar+"��"+z( 90, 2)+" �� �� �ٸ� ������ ��1#l\r\n"
					star += "#L270030610##bLv."+z(161, 3)+" �� "+picStar+"��"+z( 90, 2)+" �� �� �ٸ� ������ ��2#l\r\n"
					star += "#L270030620##bLv."+z(162, 3)+" �� "+picStar+"��"+z( 90, 2)+" �� �� �ٸ� ������ ��3#l\r\n"
					star += "#L270030630##rLv."+z(164, 3)+" �� "+picStar+"��"+z( 90, 2)+" �� �� �ٸ� ������ ��4#l\r\n"
					star += "#L271030101##bLv."+z(169, 3)+" �� "+picStar+"��"+z(120, 3)+" �� �� 1������#l\r\n"
					star += "#L271030102##bLv."+z(169, 3)+" �� "+picStar+"��"+z(120, 3)+" �� �� 2������#l\r\n"
					star += "#L271030310##bLv."+z(173, 3)+" �� "+picStar+"��"+z(120, 3)+" �� �����1#l\r\n"
					star += "#L271030320##rLv."+z(175, 3)+" �� "+picStar+"��"+z(120, 3)+" �� �����2#l\r\n";
				cm.sendSimple(star);
			} else if (selection == 9) {
				cm.dispose();
				cm.openNpc(2159314);
			}
			
			
		} else if (status == 2) {
			var map = selection;
			if (map >= 100000000) {
				if(bossornot) {
					if(getRemain(map) == 0) {
						cm.sendOk("�����Ͻ� ������ ����Ƚ���� ��� �����Ͽ� ������ �Ұ��մϴ�.");
						cm.dispose();
						return;
					}
					takeRemain(map);
				}
				cm.warp(map,0);
				cm.dispose();
			} else {
				cm.sendOk("�� #b����#k�� ���� �̿��Ͻ� �� �����ϴ�.\r\n\r\n�̿� �Ұ����� ���� : \r\n#r �ݹ� , ���� , ���� �� , ���̾� , �ǿ��� , \r\n ����\r\n #b�� �������� ���� �������Դϴ�.#k#l");
				cm.dispose();
			}
		}
	}
}

function getRemain(boss) { //���� ����Ƚ�� �����ֱ�
	var remain = number;
	var con = MYSQL.getConnection();
	var ps = con.prepareStatement("SELECT * FROM bossremain WHERE charid = "+cm.getPlayer().getId()+" AND bossid = "+boss);
	var rs = ps.executeQuery();
		if(rs.next()) {
			remain = rs.getByte("remain");
		}
		con.close();
		ps.close();
		rs.close();
	return remain;	
}

function takeRemain(boss) {
	var con = MYSQL.getConnection();
	var ps = con.prepareStatement("SELECT * FROM bossremain WHERE charid = "+cm.getPlayer().getId()+" AND bossid = "+boss);
	var rs = ps.executeQuery();
		if(rs.next()) {
			var take = con.prepareStatement("UPDATE bossremain SET remain = ? WHERE charid = ? AND bossid = ?");
			take.setByte(1, (getRemain(boss) - 1));
			take.setInt(2, cm.getPlayer().getId());
			take.setInt(3, boss);
			take.executeUpdate();
			take.close();
		} else {
			var insert = con.prepareStatement("INSERT INTO bossremain(charid, bossid, remain) VALUES(?, ?, ?)");
			insert.setInt(1, cm.getPlayer().getId());
			insert.setInt(2, boss);
			insert.setByte(3, number-1);
			insert.executeUpdate();
			insert.close();
		}
	con.close();
	ps.close();
	rs.close();
}
