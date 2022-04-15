function start() {
    coupon = [5,6,7,8,9];
    status = cm.getMapId() % 1000 == 100 ? -1 : cm.getMapId() % 1000 == 200 ? 1 : cm.getMapId() % 1000 == 300 ? 2 : cm.getMapId() % 1000 == 400 ? 4 : 5;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
	cm.dispose();
        return;
    } else 
	status++;
    if (status == 0) {
	if (cm.getPlayer().getKeyValue("KerningPQ_Stage_1") == null) {
	    if (cm.isLeader() == true) {
		cm.getPlayer().setKeyValue("KerningPQ_Stage_1","0");
		cm.sendNext("�ȳ��ϼ���. ù��° ���������� ���� ���� ȯ���մϴ�. �ֺ��� �ѷ����� �������Ͱ� ���ƴٴϰ� �ִ� ���� �� �� ���� �̴ϴ�. �������ʹ� �����߸��� �� �� ���� #b����#k�� ����߸��ϴ�. ��Ƽ���� ������ ��Ƽ�� ������ ���� ������ ���� �ɾ� ������ �ް� ������ �信 �ش��ϴ� �� ��ŭ �������Ͱ� �ִ� #b����#k�� ��ƿ;� �մϴ�.\r\n�丸ŭ #b����#k�� ��ƿ��� �̼��� �Ϸ��ϰ� �˴ϴ�. ��Ƽ���� ������ ��� ��Ƽ���� #b���� �̼��� Ŭ����#k �ϸ� ���������� Ŭ���� �ϰ� �˴ϴ�. �ǵ��� ���� �ذ��ؾ� �� ���� ���������� ������ �� �����Ƿ� ���ѷ� �ּ���. �׷� ����� ���ϴ�.");
		cm.dispose();
	    } else {
		cm.sendNext("�̰������� ���κ��� ���� ���� �̼��� �����ؾ� �մϴ�. �̼��� �����ϸ� �� ���� ����� �� �ִ� ������� ���� �� �ֽ��ϴ�.");
	    }
	} else {
	    if (cm.isLeader() == true) {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 0) {
		    if (cm.checkPQItem(4001008)) {
			cm.removePartyItemAll(4001007);
			cm.removePartyItemAll(4001008);
		 	cm.environmentChange(true,"gate");
			cm.getEventInstance().setProperty("KerningPQ_Gate","1");
			cm.sendNext("�̹� ���������� Ŭ���� �� ���� ���ϵ帳�ϴ�! ���� ���������� ���ϴ� ��Ż�� ����� �帮�ڽ��ϴ�. ���� �ð��� ������ ���ѷ� �ּ���. �׷� ����� ���ϴ�!");
		    } else {
			cm.sendNext("�˼��մϴٸ� ���� �̼��� �Ϸ����� ���� ��Ƽ���� �ֽ��ϴ�. ��Ƽ���� ������ ��Ƽ�� ��� ���� �̼��� �Ϸ��ϼž� �� ���������� Ŭ���� �Ͻ� �� �ֽ��ϴ�.");
		    }	
		} else {
		    cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
		}
	    } else {
		if (cm.getPlayer().getKeyValue("KerningPQ_Stage_1") == 0) {
		    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 0) {
			if (cm.haveItem(4001007,cm.getPlayer().getKeyValue("KerningPQ_Coupon"))) {
			    cm.gainItem(4001008,1);
			    cm.getPlayer().setKeyValue("KerningPQ_Stage_1","1");
			    cm.gainItem(4001007,-cm.getPlayer().getKeyValue("KerningPQ_Coupon"));
			    cm.sendNext("�̼��� �����ϼ̽��ϴ�. ���� �̼��� �������� ���� �ٸ� ��Ƽ���� �ִٸ� �׵��� �̼��� �����ּ���.");
			} else {
			    cm.sendNext("�̼��Դϴ�. #r���� " + cm.getPlayer().getKeyValue("KerningPQ_Coupon") + "��#k�� ��ƿ�����. ������ �̰��� #r�������͸� ����ġ��#k ���� �� �ֽ��ϴ�.");
			}
		    } else {
			cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
		    }
		} else {
		    cm.sendNext("#rText Error Code : 1#k");
		}
	    }
	    cm.dispose();
	}
    } else if (status == 1) {
	var rudy = Math.floor(Math.random() * coupon.length);
	cm.getPlayer().setKeyValue("KerningPQ_Stage_1","0");
	cm.getPlayer().setKeyValue("KerningPQ_Coupon",coupon[rudy] + "");
	cm.sendNextPrev("�̼��Դϴ�. #r���� " + coupon[rudy] + "��#k�� ��ƿ�����. ������ �̰��� #r�������͸� ����ġ��#k ���� �� �ֽ��ϴ�.");
	cm.dispose();
    } else if (status == 2) {
	if (cm.getPlayer().getKeyValue("KerningPQ_Stage_2") == null) {
	    if (cm.isLeader() == true) {
		cm.getEventInstance().clearFootholds();
		cm.getEventInstance().addFootholds(3);
		cm.getEventInstance().addFootholds(11);
		cm.getEventInstance().addFootholds(12);
		cm.getEventInstance().addFootholds(13);
		cm.getEventInstance().shuffleFootholds(3);
		cm.getPlayer().setKeyValue("KerningPQ_Stage_2","0");
		cm.sendNext("�ȳ��ϼ���. �ι�° ���������� ���� ���� ȯ���մϴ�. �� ���� ���� ���� ���� ���� ���Դϴ�. �� �� �߿��� #b3���� ���� ���������� ���ϴ� ��Ż#k�� ���� �ֽ��ϴ�. ��Ƽ�� �߿��� #b3 ���� �������� ã�� �Ŵ޸���#k �˴ϴ�.\r\n��, ���� �ʹ� �Ʒ� ������ ��� �Ŵ޸��� �������� �������� �����Ƿ� ���� ��� ����� ���� �ö� �ֽñ� �ٶ��ϴ�. �׸��� �ݵ�� 3 �� ���� ��� �־�� �մϴ�. ��Ƽ���� �ٿ� �Ŵ޸��� ��Ƽ���� #b���� ����Ŭ���Ͽ� �������� �ƴ��� Ȯ��#k�ϼ���. �׷� �������� ã�� �ּ���~!");
	    } else {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 1) {
		    cm.sendNext("#rText Error Code : 2#k");
		} else {
		    cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
		}
	    }
	} else {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 2) {
		if (cm.getEventInstance().resultFootholds(3) == 0) {
		    cm.environmentChange(true,"gate");
		    cm.playSound(true,"Party1/Clear");
		    cm.showEffect(true,"quest/party/clear");
		    cm.getEventInstance().setProperty("KerningPQ_Gate","3");
		} else {
		    cm.playSound(true,"Party1/Failed");
		    cm.showEffect(true,"quest/party/wrong_kor");
		}
	    } else {
		cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
	    }
	}
	cm.dispose();
    } else if (status == 3) {
	if (cm.getPlayer().getKeyValue("KerningPQ_Stage_3") == null) {
	    if (cm.isLeader() == true) {
		cm.getEventInstance().clearFootholds();
		cm.getEventInstance().addFootholds(5);
		cm.getEventInstance().addFootholds(10);
		cm.getEventInstance().addFootholds(15);
		cm.getEventInstance().addFootholds(19);
		cm.getEventInstance().addFootholds(27);
		cm.getEventInstance().shuffleFootholds(3);
		cm.getPlayer().setKeyValue("KerningPQ_Stage_3","0");
		cm.sendNext("�ȳ��ϼ���. ����° ���������� ���� ���� ȯ���մϴ�. ���� ����̰� ����ִ� ���� ���� ���ǵ��� ���� ���Դϴ�. �� ���� �߿��� #b3���� ���� ���������� ���ϴ� ��Ż#k�� ���� �ֽ��ϴ�. ��Ƽ�� �߿��� #b3 ���� ��������� ã�� ���� �ö󼭸�#k �˴ϴ�.\r\n��, ���� ���� �ƽ��ƽ��ϰ� ���ļ� ���� ���� ���� �߰��� ���� �������� �����Ǵ� ���� ������ �ֽñ� �ٶ��ϴ�. �׸��� �ݵ�� 3 �� ���� ���� �ö� �־�� �մϴ�.");
	    } else {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 4) {
		    cm.sendNext("#rText Error Code : 3#k");
		} else {
		    cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
		    cm.dispose();
		}
	    }
	} else {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 4) {
		if (cm.getEventInstance().resultFootholds(3) == 0) {
		    cm.environmentChange(true,"gate");
		    cm.playSound(true,"Party1/Clear");
		    cm.showEffect(true,"quest/party/clear");
		    cm.getEventInstance().setProperty("KerningPQ_Gate","5");
		} else {
		    cm.playSound(true,"Party1/Failed");
		    cm.showEffect(true,"quest/party/wrong_kor");
		}
	    } else {
		cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
	    }
	    cm.dispose();
	}
    } else if (status == 4) {
	cm.sendNextPrev("���� ���� �ö� ����� �����ϸ� ���ϸ��ƿ��� ���� ����#i4001454#�� �����ؼ� ���� ���� ���� �÷��ּ���. ������ ���� �÷��� ���� ������ 1���� ĳ���ͷ� �ν��Ѵ�ϴ�.");
	cm.dispose();
    } else if (status == 5) {
	if (cm.isLeader() == true) {
	    if (cm.getEventInstance().getProperty("Kerning_Eyes") == 1) {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 6) {
		    cm.environmentChange(true,"gate");
		    cm.getEventInstance().setProperty("KerningPQ_Gate","7");
		    cm.sendNext("�����е��� �� ���������� ����Ʈ�� �Ǹ��� Ŭ�����ϼ̽��ϴ�. ���̴� ��Ż�� ���Ͽ� ���� ���������� �̵��� �ּ���..");
		} else {
		    cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
		}
	    } else {
		cm.sendNext("�׹�° ���������� ���� ������ �帮�ڽ��ϴ�. �� ���� �ִ� #b20������ Ŀ�����#k�� ��� ����ġ�� �˴ϴ�. �׷� �����ּ���.");
	    }
	} else {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 3) {
		cm.sendNext("#rText Error Code : 4#k");
	    } else {
		cm.sendNext("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�. ���ѷ� �ּ���.");
	    }
	}
	cm.dispose();
    } else if (status == 6) {
	if (cm.getMonsterCount(cm.getMapId()) == 0) {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 9) {
		cm.sendSimple("���ϵ帳�ϴ�. ��� ���������� Ŭ���� �ϼ̽��ϴ�. ���� �� ������ �� �̻� �� ���� �����ø� ������ �����帮�ڽ��ϴ�.\r\n\r\n#b#L0#���� �����ڽ��ϴ�.");
	    } else {
		cm.getEventInstance().setProperty("KerningPQ_Gate","9");
		cm.sendNext("���ϵ帳�ϴ�. ��� ���������� Ŭ�����Ͽ����ϴ�. ���� �� ������ �� �̻� ������ �����ø� ������ ���� �ɾ��ּ���. ������ �����帮�ڽ��ϴ�.");
		cm.dispose();
	    }
	} else {
	    cm.sendNext("#rText Error Code : 5#k");
	    cm.dispose();
	}
    } else if (status == 7) {
	cm.getEventInstance().unregisterPlayer(cm.getPlayer());
	cm.warp(910340000,0);
    }
}