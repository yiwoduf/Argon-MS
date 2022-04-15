/*

	���� ���¿� �ð� ���߷��� ���ϱ� �̼��� ���� ���� �߰� �ǳ׿� ��.��

	���� �׽�Ʈ �ϴٰ� ������� �״�� �۾��ع��� �͵� �־ �� �����ؿ롦

	�Ͽ���� �� �˾ƺ��ø��� �Ͻ��ϴ� ^-^!

*/

importPackage(Packages.database);
importPackage(Packages.client);
importPackage(java.lang);

var status = -1;

var ave;
var rec;
var cash_exchange = false;

/* �ֱ� �ŷ��� ��Ͽ��� ��� ���ϱ� */
function getAve() {
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE confirm = 1 ORDER BY id DESC LIMIT 5").executeQuery();
	var i = 0;

	if (con.next()) {
		ave = Long.parseLong(con.getString("meso"));
		i++;
		while(con.next()) {
			ave += Long.parseLong(con.getString("meso"));
			i++;
		}
		ave = ave/i;
	} else {
		ave = 0;
	}

	con.close();
	return ave;
}

/* ��� �ŷ� ��ȣ ���ϱ� */
function rec_join_id() {
	var tid = 0;

	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE confirm = 0 ORDER BY id DESC LIMIT 1").executeQuery();
	if (con.next()) tid = con.getInt("id");

	con.close();
	return tid;
}

/* ��� �ŷ� ���� ���ϱ� */
function rec_join_meso(tid) {
	var meso = 0;

	if (tid != 0) {
		var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE id = '"+tid+"'").executeQuery();
		con.next();

		meso = Long.parseLong(con.getString("meso"));
		con.close();
	}

	return meso;
}


/* ���ϴ� �ݾ����� �Խñ� ã�� */
function sc_meso(tmeso) {
	var text = new StringBuilder();

	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE meso <= "+tmeso+" and confirm = 0 ORDER BY id DESC").executeQuery();

	if (!con.next()) {
		text.append("0");

	} else {
		con.previous();
		text.append("#h #���� �Է��ؽ� #r"+tmeso+" �޼�#k�� ��ȸ�Ͽ� �Ʒ��� ���� ����� ������ϴ�.\r\n\r\n");

		while(con.next()) {
			text.append("#L"+con.getInt("id")+"#")
			.append("#b").append(con.getString("chr_name")).append("#k")
			.append(" #fs11#(���� : #r5,000 ĳ�� �� ").append(con.getString("meso")).append(" �޼�#k)#fs12#\r\n");
		}
	}

	con.close();
	return text.toString();
}

/* �޼ҷ� ĳ�� �����ϱ� */
function meso_exchange(tid, cname, tmeso) {
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE id = '"+tid+"'").executeQuery();
	con.next();

	var pcon = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(con.getString("chr_name"));

	if (pcon == null) {
		var ccon = MYSQL.getConnection().prepareStatement("SELECT * FROM characters WHERE name = '"+con.getString("chr_name")+"'").executeQuery();
		ccon.next();

		var rmeso = Long.parseLong(ccon.getString("meso"));
		MYSQL.getConnection().prepareStatement("UPDATE characters SET meso = '"+(rmeso+tmeso)+"' WHERE name = '"+con.getString("chr_name")+"'").executeUpdate();

		ccon.close();
	} else {
		pcon.dropMessage(5, "�޼� ���Ͽ� ����� ĳ�ð� �Ǹ� �Ǿ����ϴ�. "+tmeso+" �޼� �� ���޵˴ϴ�.");
		pcon.gainMeso(tmeso, true);
	}

	con.close();
	MYSQL.getConnection().prepareStatement("UPDATE trade_cm SET from_name = '"+cname+"', confirm = 1 WHERE id = '"+tid+"'").executeUpdate();
	cm.sendOk("�޼� ������ �̿� ���ּż� ���� �����մϴ�. #r"+tmeso+" �޼�#k�� ����Ͽ� #b5000 ĳ��#k�� ���� �Ͽ����ϴ�.");

}

function getMesos(tid) {
	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE id = '"+tid+"'").executeQuery();
	con.next();
//	con.close();

	return Long.parseLong(con.getString("meso"));
}

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) { status++; }
	if (mode == 0) { cm.dispose(); return; }
	if (mode == -1) { status--; }

	/* ���� */
	if (status == 0) {
		if (cm.getPlayer().getLevel() < 100) {
			cm.sendOk("���� 100���� ���� ������ ã�ƿ� �ְԳ�. ������ ���� �����ٰ� ���� ���δٳ�");
			cm.dispose();
			return;
		}
		/* ĳ�� �� �޼� */
		var text = "������ �޼� ���Ͽ� ���� ���� ȯ���մϴ�. ���� �Ϸ� ���� ã�ƿ��̳���?";
//		text += "\r\n\r\n#fUI/UIAuction.img/mesoMarket/button:Buy/normal/0#";

		if(cm.getPlayer().getNX() < 5000) {
		text += "\r\n#L0##Cgray#�޼� ���� ��û ����ϱ� (ĳ�� �� �޼�)#k#l";
		} else {
		text += "\r\n#L0##b#e�޼� ���� ��û ����ϱ�#k#n (ĳ�� �� �޼�)#l";
		}
		/* �޼� �� ĳ�� */
//		text += "\r\n\r\n\r\n#fUI/UIAuction.img/mesoMarket/button:Sell/normal/0#";
		text += "\r\n#L1##b#e�޼� �Ǹ� ��û ����ϱ�#k#n (�޼� �� ĳ��)#l";
//		text += "\r\n\r\n#L2##eĳ�ü� �ٷΰ���#n";
		text += "\r\n#L3#(����) �޼� ���Ͽ� ���� �˰� �;��.";
		text += "\r\n#L4##e#r������";


		cm.sendSimple(text);

	} else if (status == 1) {
		switch(selection) {
			/* ĳ�� �� �޼� */
			case 0: {
			     var text = "#fs12#5,000 ĳ�� �� ��� �ŷ� ������ #r"+getAve()+" �޼�#k�Դϴ�.#k\r\n\r\n";
				text += "#fs12#�� #k#n#b5,000 ĳ��#k�� #r���� �޼�#k�� �Ǹ��Ͻðڽ��ϱ�?";
//				var text = "#e#fs13#����, #r5,000 ĳ��#k �� ��� �ŷ� ������ "+getAve()+" �޼� �Դϴ�.\r\n\r\n#fn����##fs12##k#n#b5000 ĳ��#k�� #r���� �޼�#k�� �Ǹ��Ͻðڽ��ϱ�?";
				cm.sendGetNumber(text, 1, 1, 2100000000);
				cash_exchange = true;
				break;
			}

			/* �޼� �� ĳ�� */
			case 1: {
			     var text = "�� #fs13#��� �ŷ� ���� �� #r"+getAve()+" �޼�#k\r\n";
			  	text += "�� #fs13#��� �ŷ� ���� �� #r"+rec_join_meso(rec_join_id())+" �޼�#k\r\n";
				text += "�� #fs13##Cgray#(�ŷ� ������ 5,000 ĳ�� �� �����Դϴ�!)#k\r\n";
				text += "\r\n#L0##fUI/UIAuction.img/mesoMarket/button:Collect/normal/0#";
				if (rec_join_id() != 0) text += "\r\n#L"+rec_join_id()+"##fUI/UIAuction.img/mesoMarket/BuyMain/button:Auto/normal/0#";
				cm.sendSimple(text);
				break;
			}

			case 2: {
				cm.safeDispose();
				cm.enterCS();
				break;
			}

			case 3: {
				var text = " ������ �޼� ������ ���Ե� ���� ĳ�� �� �޼� �ŷ��� ���� ������ �����Դϴ�.";
				text += "\r\n\r\n �� �������� #b�޼Ҹ� ����#Cgray##fs11#(ĳ�ø� �Ǹ�)#fs12##k�ϰų� #b�޼Ҹ� �Ǹ�#Cgray##fs11#(ĳ�ø� ����)#k#fs12#�� �� �ֽ��ϴ�."
				text += "\r\n\r\n #e#r�� #b�޼� ���� ��û ����ϱ� #k(ĳ�� �� �޼�)#n\r\n";
				text += " #fs11#5,000 ĳ�� ������ ���ϴ� �޼Ҹ� ����� �� �ֽ��ϴ�. �� �� ����� ĳ�ô� ȸ���� �Ұ����Ͽ��� ������ �������ֽñ� �ٶ��ϴ�.\r\n";
				text += "\r\n#fs12# #e#r�� #b�޼� �Ǹ� ��û ����ϱ� #k(�޼� �� ĳ��)#n\r\n";
				text += " #e�� #fs11#�޼� & ������ ����Ʈ ã��#n�� �����ø� �ǸŸ� ���ϴ� �޼�#Cgray#(���Ÿ� ���ϴ� ĳ��)#k ������ �˻����ּ���. �˻� ����� �ִٸ� ���� ��ϵ� ������ \"#b�Ǹ��� ���̵�#k �� #r(����)#k\"�� ��µ˴ϴ�. ���Ͻô� ������ �����Ͻø� �˴ϴ�.";
				text += "\r\n#fs12# #e�� #fs11#��� �ŷ����� ����#n�� �����ø� ���� �ֱٿ� ��ϵ� ������ �ŷ��� �����մϴ�. ���� �ֱٿ� ��ϵ� ������ ���� ���� Ȯ���� �����մϴ�~ #r������ ���� �ŷ��� �ٷ� ����#k�ǹǷ� ������ �������ּ���!!";
				text += "\r\n\r\n#fs12# �޼� ���� ��û�� �� �� ������ ������ ���� �������� ���Ÿ� �Ͽ��� ���������� �޼Ұ� ���Ű� �ǿ��� �Ƚ��ϰ� ���� ���Ḧ ���ּŵ� �˴ϴ�.";
				text += "\r\n\r\n#fs12# #e#r �޼� ������ �̿��� �ü� ���� �� ���� ������ ������ ��ġ�� �ൿ�� �� ��� ���� ���� ��ġ �� Ȩ������ ���� ���� ���� �ſ� ������ ���簡 ������ �����̹Ƿ� �������ֽñ� �ٶ��ϴ�.";
				text += "\r\n\r\n#fs12# #b#n �޼� ������ �̿��� �������� �� ������ �а� �޼� ���� �̿� �ȳ��� ������ ������ ���ֵ˴ϴ�. �̰� �����ôٸ� �����ڿ��� ������ öȸ�� �� �ֽ��ϴ�. (���� ����)";

				cm.sendNext(text);
				cm.dispose();
				break;
			}

			case 4: {
				cm.dispose();
				break;
				}
		}

	} else if (status == 2) {
		/* ĳ�� �� �޼� */
		if (cash_exchange) {
			if (cm.getPlayer().getNX() >= 5000) {
				var insert = MYSQL.getConnection().prepareStatement("INSERT INTO trade_cm(chr_name, cash, meso, confirm, date) VALUES(?, 5000, ?, 0, now())");
				insert.setString(1, cm.getPlayer().getName());
				insert.setString(2, selection);
				insert.executeUpdate();
				cm.getPlayer().modifyCSPoints(1, -5000, false);
				cm.getPlayer().dropMessage(1, "��û�Ͻ� �ŷ��� �Ϸ�Ǿ����ϴ�.");
//				cm.sendOk("�޼� ���Ͽ� ���Ͻô� #r�޼�#k�� �Խù��� ��� �Ǿ����ϴ�.");

			} else {
				cm.sendOk("ĳ�ð� ������� ���� �� �����ϴ�. #rĳ�ü�#n���� Ȯ�� ���ּ���.");
			}
			cm.dispose();

		/* �޼� �� ĳ�� */
		} else {
			switch(selection) {
				/* ������ ���ϴ� �ݾ��� �Է� */
				case 0: {
					cm.sendGetNumber("��� ������ �������� ĳ�ø� ���� �Ͻðڽ��ϱ�?", 1, 1, 2100000000);
					break;
				}

				/* ��� ���� */
				default: {
					if (cm.getPlayer().getMeso() >= rec_join_meso(selection)) {
						cm.getPlayer().modifyCSPoints(1, 5000, true);
						cm.gainMeso(-rec_join_meso(selection));
						meso_exchange(selection, cm.getPlayer().getName(), rec_join_meso(selection));

					} else {
						cm.sendOk("�޼Ұ� ������ �� �����ϴ�. �ѹ�, ���â�� Ȯ�� ���ּ���.");
					}
					cm.dispose();
					break;
				}
			}
		}

	/* ���ϴ� �ݾ��� �Է� �� �� ��ȸ */
	} else if (status == 3) {
		if (!sc_meso(selection).equals("0")) {
			cm.sendSimple(sc_meso(selection));

		} else {
			cm.sendOk("�÷��̾���� �Է��Ͻ� #r"+selection+" �޼�#k�� ��ȸ �Ͽ�����, �ƹ� ����� ���� �� �������ϴ�.");
			cm.dispose();
		}

	/* ���ϴ� �ݾ����� ���� */
	} else if (status == 4) {
		if (cm.getPlayer().getMeso() >= getMesos(selection)) {
			cm.getPlayer().modifyCSPoints(1, 5000, true);
			cm.gainMeso(-getMesos(selection));
			meso_exchange(selection, cm.getPlayer().getName(), getMesos(selection));

		} else {
			cm.sendOk("�޼Ұ� ������ �� �����ϴ�. �ѹ�, ���â�� Ȯ�� ���ּ���.");
		}

		cm.dispose();
	}
}