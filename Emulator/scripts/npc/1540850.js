var status = 0;

var mySelection = 0;

var Stats = new Array(4); // 0 = ���� HP, 1 = ���� ATK, 2 = ���̾� HP, 3 = ���̾� ATK
var SpicalRage = 20;

var FinalHP1 = 0;
var FinalHP2 = 0;

var Victory = 0;
var justice = 0;

function start() {
	cm.sendSimple("�þƽ�Ÿ�� #b����#k vs #b���̾�#k �ý��� �Դϴ�.\r\n#Cgray#���¸��� �� ���� ������ ���� ���ּ���.\r\n\r\n#b#L01#����#l\r\n#L02#���̾�#l");
}

function action(mode, type, selection) {
	if (mode == 1) status++;
	else {
		cm.dispose();
		return;
	}

	if (status == 1) {
		mySelection = selection;
		cm.sendGetText("#b#z4310038# #k�� �󸶳� ���� �Ͻ� �ǰ��� ?\r\n");
	} else if (status == 2) {
		justice = cm.getText();

		if (isNaN(justice) || justice < 100) {
			cm.sendOk("�ּ� 100�� ���� ������ �����մϴ�.");
			cm.dispose();
			return;
		} else if (justice > 500) {
			cm.sendOk("�ִ� 500�� ������ ������ �����մϴ�.");
			cm.dispose();
			return;
		} else {
			if (!cm.haveItem(4310038, justice)) {
				cm.sendOk("�Է��� ��ŭ�� #v4310038##b#z4310038# #k�������� �����ϴ�.");
				cm.dispose();
				return;
			}
		}

		for(i=0; i<Stats.length; i++) {
			if(i % 2 == 0) {
				// hp
				Stats[i] = Math.floor(Math.random() * 30000) + 80000;
				if (i == 0) { finalHP1 = Stats[i] } else { finalHP2 = Stats[i] }
			} else {
				// atk
				Stats[i] = Math.floor(Math.random() * 10000) + 10000;
			}
		}
		cm.gainItem(4310038, -justice);
		cm.sendNext("                    ������ ������ ���� ��ġ�Դϴ�\r\n\r\n" + "���� #rHP #k: #b" + Stats[0] + "\r\n#k���� #rATK #k: #b" + Stats[1] + "#k\r\n\\r\n���̾� #rHP #k: #b" + Stats[2] + "\r\n#k���̾� #rATK #k: #b" + Stats[3]);
	} else if (status == 3) {
		var Text = "";
		var SpicalRanVal = 0;
		var firstAttack = Math.floor(Math.random() * 100);

		var Damage = 0;
		// 1 = ���� , 2 = ���̾�
		if (firstAttack > 45) {
			firstAttack = mySelection;
		} else {
			if (mySelection == 1) { firstAttack = 2 } else { firstAttack = 1 }
		}


		if (firstAttack == 1) {
			Text += "                     �� �����ڴ� #b����#k �Դϴ�!\r\n\r\n";
		} else {
			Text += "                     �� �����ڴ� #b���̾�#k �Դϴ�!\r\n\r\n";
		}

		while(true) {
			if (firstAttack == 1) {
				SpicalRanVal = Math.floor(Math.random() * 100);
				if (SpicalRanVal < SpicalRage) {
					Damage = (Stats[1] * 2);
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d������ ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Text += "#e������ ���� : #r" + Damage + "#k [ġ��Ÿ]#n\r\n";
					}
				} else {
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d������ ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Damage = Stats[1];
						Text += "#d������ ���� : #b" + Damage + "#k [��Ÿ]\r\n";
					}
				}

				Stats[2] = Stats[2] - Damage;
				

				Text += "#Cgray#���̾��� ���� HP : #B" + Stats[2] / finalHP2 * 100 + "##k\r\n";
				Text += "������������������������������������������������������\r\n";

				if (Stats[2] < 0) {
					Text += "#b����#k�� �¸�!\r\n";
					Victory = 1;
					break;
				}


				SpicalRanVal = Math.floor(Math.random() * 100);
				if (SpicalRanVal < SpicalRage) {
					Damage = (Stats[3] * 2);
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d���̾��� ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Text += "#e���̾��� ���� : #r" + Damage + "#k [ġ��Ÿ]#n\r\n";
					}
				} else {
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d���̾��� ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Damage = Stats[3];
						Text += "#d���̾��� ���� : #b" + Damage + "#k [��Ÿ]\r\n";
					}
				}

				Stats[0] = Stats[0] - Damage;
				

				Text += "#Cgray#������ ���� HP : #B" + Stats[0] / finalHP1 * 100 + "##k\r\n";
				Text += "������������������������������������������������������\r\n";

				if (Stats[0] < 0) {
					Text += "#b���̾�#k�� �¸�!\r\n";
					Victory = 2;
					break;
				}
			} else {
				SpicalRanVal = Math.floor(Math.random() * 100);
				if (SpicalRanVal < SpicalRage) {
					Damage = (Stats[3] * 2);
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d���̾��� ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Text += "#e���̾��� ���� : #r" + Damage + "#k [ġ��Ÿ]#n\r\n";
					}
				} else {
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d���̾��� ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Damage = Stats[3];
						Text += "#d���̾��� ���� : #b" + Damage + "#k [��Ÿ]\r\n";
					}
				}

				Stats[0] = Stats[0] - Damage;
				

				Text += "#Cgray#������ ���� HP : #B" + Stats[0] / finalHP1 * 100 + "##k\r\n";
				Text += "������������������������������������������������������\r\n";

				if (Stats[0] < 0) {
					Text += "#b���̾�#k�� �¸�!\r\n";
					Victory = 2;
					break;
				}


				SpicalRanVal = Math.floor(Math.random() * 100);
				if (SpicalRanVal < SpicalRage) {
					Damage = (Stats[1] * 2);
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d������ ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Text += "#e������ ���� : #r" + Damage + "#k [ġ��Ÿ]#n\r\n";
					}
				} else {
					SpicalRanVal = Math.floor(Math.random() * 100);
					if (SpicalRanVal < SpicalRage) {
						Damage = 0;
						Text += "#d������ ���� : #Cgray#" + Damage + "#k [ȸ��]\r\n";
					} else {
						Damage = Stats[1];
						Text += "#d������ ���� : #b" + Damage + "#k [��Ÿ]\r\n";
					}
				}

				Stats[2] = Stats[2] - Damage;
				

				Text += "#Cgray#���̾��� ���� HP : #B" + Stats[2] / finalHP2 * 100 + "##k\r\n";
				Text += "������������������������������������������������������\r\n";

				if (Stats[2] < 0) {
					Text += "#b����#k�� �¸�!\r\n";
					Victory = 1;
					break;
				}
			}
		}

		cm.sendOk(Text);
	} else if (status == 4) {
		if (mySelection == Victory) {
			cm.gainItem(4310038, justice * 2);
			cm.sendOk("����� �� ���� �¸� �Ͽ���� ! ���ϵ���� !\r\n\r\n#b#v4310038##z4310038# " + justice * 2 + "#k ȹ�� !");
			cm.dispose();
			return;
		} else {
			cm.sendOk("�ƽ����� ����� �� ���� �й� �ϼ̾��.. ������ �ٽ� ���� ���ּ��� !");
			cm.dispose();
			return;
		}
	}
}