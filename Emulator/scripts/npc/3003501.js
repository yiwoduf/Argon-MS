/*
	������� ����� ��ũ��Ʈ
	�����(guibe66_harang@nate.com)

*/
var status = 0;

var Star = "#fUI/FarmUI.img/objectStatus/star/whole#";

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
           var chat = "#fn������� Extrabold##fs15##d                   " +Star+ " #k ESFERA FIELD  " +Star+ "#d \r\n\r\n";
		   chat += "                       #fs12##k  ��ſ� ����ϼ���#r��\r\n\r\n"
		   chat += "#L1##fs11##k[#r��#k] #n#k(Lv.250~)#b ������� ������ ���۵Ǵ� ��2\r\n"
			chat += "#L2##n#k[#r��#k] #n#k(Lv.250~)#b ������� ������ ���۵Ǵ� ��3\r\n"
			chat += "#L3##n#k[#r��#k] #n#k(Lv.250~)#b ������� ������ ���۵Ǵ� ��4\r\n"
			chat += "#L4##n#k[#r��#k] #n#k(Lv.250~)#b ������� ������ ���۵Ǵ� ��5\r\n"
			chat += "#L5##n#k[#r��#k] #n#k(Lv.250~)#b ������� ������ ���۵Ǵ� ��6\r\n"
			chat += "#L6##n#k[#r��#k] #n#k(Lv.250~)#b ������� ������ ���۵Ǵ� ��7\r\n"
			chat += "#L7##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ￡ ��ģ ���� ����2\r\n"
			chat += "#L8##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ￡ ��ģ ���� ����3\r\n"
			chat += "#L9##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ￡ ��ģ ���� ����4\r\n"
			chat += "#L10##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ���� ���� �ٴ�2\r\n"
			chat += "#L11##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ���� ���� �ٴ�3\r\n"
			chat += "#L12##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ���� ���� �ٴ�4\r\n"
			chat += "#L13##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ���� ���� �ٴ�5\r\n"
			chat += "#L14##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ���� ���� �ٴ�6\r\n"
			chat += "#L15##n#k[#r��#k] #n#k(Lv.250~)#b ������� �ſ���� ���� �ٴ�7\r\n"
	cm.sendSimple(chat);

	} else if (status == 1) {

	if (selection == 1) { //������ ���۵Ǵ� ��2
	cm.dispose();
	cm.warp(450007010);
	
	} else if (selection == 2) { //������ ���۵Ǵ� ��3
	cm.dispose();
	cm.warp(450007020);
	
	} else if (selection == 3) { //������ ���۵Ǵ� ��4
		cm.dispose();
		cm.warp(450007030);
	
	} else if (selection == 4) { //������ ���۵Ǵ� ��5
		cm.dispose();
		cm.warp(450007050);
	
	} else if (selection == 5) { //������ ���۵Ǵ� ��6
		cm.dispose();
		cm.warp(450007060);
	
	} else if (selection == 6) { //������ ���۵Ǵ� ��7
		cm.dispose();
		cm.warp(450007070);
		
	} else if (selection == 7) { //�ſ￡ ��ģ ���� ����2
		cm.dispose();
		cm.warp(45007210);
		
	} else if (selection == 8) { //�ſ￡ ��ģ ���� ����3
		cm.dispose();
		cm.warp(450007220);
	
	} else if (selection == 9) { //�ſ￡ ��ģ ���� ����4
		cm.dispose();
		cm.warp(450007230);
	
	} else if (selection == 10) { //�ſ���� ���� �ٴ�2
		cm.dispose();
		cm.warp(450007110);
	
	} else if (selection == 11) { //�ſ���� ���� �ٴ�3
		cm.dispose();
		cm.warp(450007120);
		
	} else if (selection == 12) { //�ſ���� ���� �ٴ�4
		cm.dispose();
		cm.warp(45007130);
	
	} else if (selection == 13) { //�ſ���� ���� �ٴ�5
		cm.dispose();
		cm.warp(450007140);
	
	} else if (selection == 14) { //�ſ���� ���� �ٴ�6
		cm.dispose();
		cm.warp(450007150);
	
	} else if (selection == 15) { //�ſ���� ���� �ٴ�7
		cm.dispose();
		cm.warp(450007160);
	
 			}
		}
	}
}