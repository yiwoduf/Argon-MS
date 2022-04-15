/*

	서버 오픈에 시간 맞추려다 보니까 미숙한 점이 많이 발견 되네요 ㅠ.ㅠ

	제가 테스트 하다가 안지우고 그대로 작업해버린 것도 있어서 좀 복잡해용…

	하요님이 잘 알아보시리라 믿습니다 ^-^!

*/

importPackage(Packages.database);
importPackage(Packages.client);
importPackage(java.lang);

var status = -1;

var ave;
var rec;
var cash_exchange = false;

/* 최근 거래된 목록에서 평균 구하기 */
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

/* 즉시 거래 번호 구하기 */
function rec_join_id() {
	var tid = 0;

	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE confirm = 0 ORDER BY id DESC LIMIT 1").executeQuery();
	if (con.next()) tid = con.getInt("id");

	con.close();
	return tid;
}

/* 즉시 거래 가격 구하기 */
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


/* 원하는 금액으로 게시글 찾기 */
function sc_meso(tmeso) {
	var text = new StringBuilder();

	var con = MYSQL.getConnection().prepareStatement("SELECT * FROM trade_cm WHERE meso <= "+tmeso+" and confirm = 0 ORDER BY id DESC").executeQuery();

	if (!con.next()) {
		text.append("0");

	} else {
		con.previous();
		text.append("#h #님이 입력해신 #r"+tmeso+" 메소#k로 조회하여 아래와 같은 결과를 얻었습니다.\r\n\r\n");

		while(con.next()) {
			text.append("#L"+con.getInt("id")+"#")
			.append("#b").append(con.getString("chr_name")).append("#k")
			.append(" #fs11#(가격 : #r5,000 캐시 당 ").append(con.getString("meso")).append(" 메소#k)#fs12#\r\n");
		}
	}

	con.close();
	return text.toString();
}

/* 메소로 캐시 구매하기 */
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
		pcon.dropMessage(5, "메소 마켓에 등록한 캐시가 판매 되었습니다. "+tmeso+" 메소 가 지급됩니다.");
		pcon.gainMeso(tmeso, true);
	}

	con.close();
	MYSQL.getConnection().prepareStatement("UPDATE trade_cm SET from_name = '"+cname+"', confirm = 1 WHERE id = '"+tid+"'").executeUpdate();
	cm.sendOk("메소 마켓을 이용 해주셔서 정말 감사합니다. #r"+tmeso+" 메소#k를 사용하여 #b5000 캐시#k를 구매 하였습니다.");

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

	/* 메인 */
	if (status == 0) {
		if (cm.getPlayer().getLevel() < 100) {
			cm.sendOk("레벨 100이후 부터 나에게 찾아와 주게나. 지금은 내가 도와줄건 없어 보인다네");
			cm.dispose();
			return;
		}
		/* 캐시 → 메소 */
		var text = "메이플 메소 마켓에 오신 것을 환영합니다. 무슨 일로 저를 찾아오셨나요?";
//		text += "\r\n\r\n#fUI/UIAuction.img/mesoMarket/button:Buy/normal/0#";

		if(cm.getPlayer().getNX() < 5000) {
		text += "\r\n#L0##Cgray#메소 구매 신청 등록하기 (캐시 → 메소)#k#l";
		} else {
		text += "\r\n#L0##b#e메소 구매 신청 등록하기#k#n (캐시 → 메소)#l";
		}
		/* 메소 → 캐시 */
//		text += "\r\n\r\n\r\n#fUI/UIAuction.img/mesoMarket/button:Sell/normal/0#";
		text += "\r\n#L1##b#e메소 판매 신청 등록하기#k#n (메소 → 캐시)#l";
//		text += "\r\n\r\n#L2##e캐시샵 바로가기#n";
		text += "\r\n#L3#(도움말) 메소 마켓에 대해 알고 싶어요.";
		text += "\r\n#L4##e#r나가기";


		cm.sendSimple(text);

	} else if (status == 1) {
		switch(selection) {
			/* 캐시 → 메소 */
			case 0: {
			     var text = "#fs12#5,000 캐시 당 평균 거래 가격은 #r"+getAve()+" 메소#k입니다.#k\r\n\r\n";
				text += "#fs12#◈ #k#n#b5,000 캐시#k를 #r얼마의 메소#k로 판매하시겠습니까?";
//				var text = "#e#fs13#현재, #r5,000 캐시#k 당 평균 거래 가격은 "+getAve()+" 메소 입니다.\r\n\r\n#fn돋움##fs12##k#n#b5000 캐시#k를 #r얼마의 메소#k로 판매하시겠습니까?";
				cm.sendGetNumber(text, 1, 1, 2100000000);
				cash_exchange = true;
				break;
			}

			/* 메소 → 캐시 */
			case 1: {
			     var text = "　 #fs13#평균 거래 가격 │ #r"+getAve()+" 메소#k\r\n";
			  	text += "　 #fs13#즉시 거래 가격 │ #r"+rec_join_meso(rec_join_id())+" 메소#k\r\n";
				text += "　 #fs13##Cgray#(거래 가격은 5,000 캐시 당 비율입니다!)#k\r\n";
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
				var text = " 메이플 메소 마켓은 용사님들 간의 캐시 및 메소 거래를 위한 일종의 시장입니다.";
				text += "\r\n\r\n 이 곳에서는 #b메소를 구매#Cgray##fs11#(캐시를 판매)#fs12##k하거나 #b메소를 판매#Cgray##fs11#(캐시를 구매)#k#fs12#할 수 있습니다."
				text += "\r\n\r\n #e#rⓞ #b메소 구매 신청 등록하기 #k(캐시 → 메소)#n\r\n";
				text += " #fs11#5,000 캐시 비율로 원하는 메소를 등록할 수 있습니다. 한 번 등록한 캐시는 회수가 불가능하오니 신중히 결정해주시기 바랍니다.\r\n";
				text += "\r\n#fs12# #e#rⓞ #b메소 판매 신청 등록하기 #k(메소 → 캐시)#n\r\n";
				text += " #e① #fs11#메소 & 메이플 포인트 찾기#n를 누르시면 판매를 원하는 메소#Cgray#(구매를 원하는 캐시)#k 가격을 검색해주세요. 검색 결과가 있다면 먼저 등록되 순으로 \"#b판매자 아이디#k │ #r(가격)#k\"이 출력됩니다. 원하시는 것으로 선택하시면 됩니다.";
				text += "\r\n#fs12# #e② #fs11#즉시 거래가격 적용#n를 누르시면 가장 최근에 등록된 비율로 거래가 가능합니다. 가장 최근에 등록된 가격은 저를 통해 확인이 가능합니다~ #r누르눈 순간 거래가 바로 종료#k되므로 신중히 결정해주세요!!";
				text += "\r\n\r\n#fs12# 메소 구매 신청을 한 뒤 접속을 종료한 사이 누군가가 구매를 하여도 정상적으로 메소가 구매가 되오니 안심하고 접속 종료를 해주셔도 됩니다.";
				text += "\r\n\r\n#fs12# #e#r 메소 마켓을 이용한 시세 조작 등 서버 경제에 영향을 끼치는 행동을 할 경우 계정 삭제 조치 및 홈페이지 접속 차단 등의 매우 강력한 제재가 가해질 예정이므로 유의해주시기 바랍니다.";
				text += "\r\n\r\n#fs12# #b#n 메소 마켓을 이용한 순간부터 이 도움말을 읽고 메소 마켓 이용 안내에 동의한 것으로 간주됩니다. 이가 싫으시다면 관리자에게 문의해 철회할 수 있습니다. (계정 삭제)";

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
		/* 캐시 → 메소 */
		if (cash_exchange) {
			if (cm.getPlayer().getNX() >= 5000) {
				var insert = MYSQL.getConnection().prepareStatement("INSERT INTO trade_cm(chr_name, cash, meso, confirm, date) VALUES(?, 5000, ?, 0, now())");
				insert.setString(1, cm.getPlayer().getName());
				insert.setString(2, selection);
				insert.executeUpdate();
				cm.getPlayer().modifyCSPoints(1, -5000, false);
				cm.getPlayer().dropMessage(1, "신청하신 거래가 완료되었습니다.");
//				cm.sendOk("메소 마켓에 원하시는 #r메소#k로 게시물이 등록 되었습니다.");

			} else {
				cm.sendOk("캐시가 충분하지 않은 것 같습니다. #r캐시샵#n에서 확인 해주세요.");
			}
			cm.dispose();

		/* 메소 → 캐시 */
		} else {
			switch(selection) {
				/* 구입을 원하는 금액을 입력 */
				case 0: {
					cm.sendGetNumber("어느 정도의 가격으로 캐시를 구매 하시겠습니까?", 1, 1, 2100000000);
					break;
				}

				/* 즉시 구입 */
				default: {
					if (cm.getPlayer().getMeso() >= rec_join_meso(selection)) {
						cm.getPlayer().modifyCSPoints(1, 5000, true);
						cm.gainMeso(-rec_join_meso(selection));
						meso_exchange(selection, cm.getPlayer().getName(), rec_join_meso(selection));

					} else {
						cm.sendOk("메소가 부족한 것 같습니다. 한번, 장비창을 확인 해주세요.");
					}
					cm.dispose();
					break;
				}
			}
		}

	/* 원하는 금액을 입력 한 후 조회 */
	} else if (status == 3) {
		if (!sc_meso(selection).equals("0")) {
			cm.sendSimple(sc_meso(selection));

		} else {
			cm.sendOk("플레이어님이 입력하신 #r"+selection+" 메소#k로 조회 하였지만, 아무 결과도 얻을 수 없었습니다.");
			cm.dispose();
		}

	/* 원하는 금액으로 구매 */
	} else if (status == 4) {
		if (cm.getPlayer().getMeso() >= getMesos(selection)) {
			cm.getPlayer().modifyCSPoints(1, 5000, true);
			cm.gainMeso(-getMesos(selection));
			meso_exchange(selection, cm.getPlayer().getName(), getMesos(selection));

		} else {
			cm.sendOk("메소가 부족한 것 같습니다. 한번, 장비창을 확인 해주세요.");
		}

		cm.dispose();
	}
}