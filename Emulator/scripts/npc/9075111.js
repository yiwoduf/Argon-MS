importPackage(Packages.packet.creators);
importPackage(Packages.constants);
importPackage(Packages.database);
importPackage(Packages.provider);
importPackage(java.lang);
importPackage(java.sql);
importPackage(java.io);

goods = [[2000000, 1000, 100000], [2000001, 800, 10000]];

function start()
{
	nums = 0;
	cm.sendSimple("레벨이 120 이상이고 선의를 가진 자라면 누구나 모의전투를 경험해 볼 수 있어요. 그럼 직접 한 번 해보시는 것이 좋을 것 같네요.#d\r\n\r\n"
			+ "#fUI/UIWindow2.img/UtilDlgEx/list4#\r\n"
			+ "#L0#(Lv.120) [보스레이드] 모의 전투 참여하기 (시작가능)#l\r\n\r\n\r\n"
			+ "#fUI/UIWindow2.img/UtilDlgEx/list2#\r\n"
			+ "#L1#모의 전투 누적 점수로 아이템 구매하기#l\r\n"
			+ "#L2#모의 전투 수행 능력 랭킹 확인하기 (시간순)#l");
	St = -2;
	action(1, 0, 0);
}

function Comma(i)
{
	var reg = /(^[+-]?\d+)(\d{3})/;
	i+= '';
	while (reg.test(i))
	i = i.replace(reg, '$1' + ',' + '$2');
	return i;
}

function getNow()
{
	cal = new Date();
	return  zeroAdd(cal.getFullYear(), 4) + '-' +
		zeroAdd(cal.getMonth()+1, 2) + '-' +
		zeroAdd(cal.getDate(), 2) + '-' +
		zeroAdd(cal.getHours(), 2) + '-' +
		zeroAdd(cal.getMinutes(), 2) + '-' +
		zeroAdd(cal.getSeconds(), 2)
}

function zeroAdd(n, digits)
{
	zero = "";
	n = n.toString();

	if(n.length < digits)
	{
		for(i = 0; i < digits - n.length; i++)
		{
			zero += '0';
		}
	}
	return zero + n;
}

function action(M, T, S)
{
	if(M != 1)
	{
		cm.dispose();
		return;
	}

	if(M == 1)
	St++;
	else
	St--;

	if(St == 0)
	{
		S0 = S;
		switch(S0)
		{
			case 0: cm.sendSimple("모의 전투에 참여하시겠어요? #b총 #e4#n개의 모의 전투#k가 준비되어 있답니다. 원하시는 것으로 선택해 보세요.\r\n"
				+ "#L0##i3994115##l #L1##i3994116##l #L2##i3994117##l #L3##v03994118##l");
			break;

			case 1: iz = "지금 #h #님은 #b활동 점수 #e"+Comma(cm.getPlayer().getKeyValue2("BossPoint"))+"#n점#k을 가지고 계시네요. 모든 아이템은 일정량 이상의 활동 점수가 필요하답니다.\r\n#b#fs11#"
				for(i = 0; i < goods.length; i++)
				{
					iz += "#L"+ i +"##v"+goods[i][0]+":# #t"+goods[i][0]+"# #e"+Comma(goods[i][1])+"#n개 #r("+Comma(goods[i][2])+"점 필요)#b\r\n";
				}
				cm.sendSimple(iz);
			break;

			case 2: cm.sendSimple("모의 전투 수행 능력을 확인하시겠어요? #b총 #e4#n개의 모의 전투#k가 준비되어 있답니다. 원하시는 것으로 선택해 보세요.\r\n"
				+ "#L0##i3994115##l #L1##i3994116##l #L2##i3994117##l #L3##v03994118##l");
			break;
		}
	}

	else if(St == 1)
	{
		S1 = S;
		switch(S0)
		{
			case 0: setDifficulty = (S == 0) ? "쉬움" : (S == 1) ? "보통" : (S == 2) ? "어려움" : "매우 어려움";
				setMinimumHps = (S == 0) ? 1  : (S == 1) ? 4  : (S == 2) ? 8  : 16
				setMaximumHps = (S == 0) ? 16 : (S == 1) ? 32 : (S == 2) ? 64 : 128
				cm.sendGetNumber("#r#e"+setDifficulty+"#n 난이도의 모의 전투#k를 선택하셨습니다. 모의 전투에 등장하는 몬스터의 체력을 설정해주세요. #b최소 #e"+setMinimumHps+"#n배 에서 최대 #e"+setMaximumHps+"#n배#k까지 설정이 가능합니다.", setMinimumHps, setMinimumHps, setMaximumHps);
			break;

			case 1: cm.sendYesNo("#b#v"+goods[S1][0]+":# #t"+goods[S1][0]+"##k 아이템을 선택한게 맞으신가요? #b#e"+Comma(goods[S1][1])+"#n개#k를 얻을 수 있고 #b활동 점수 #e"+Comma(goods[S1][2])+"#n점#k이 차감됩니다.");
			break;

			case 2: strz = new StringBuilder();
				switch(S1)
				{
					case 0: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '쉬움' ORDER BY time ASC LIMIT 100").executeQuery(); break;
					case 1: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '보통' ORDER BY time ASC LIMIT 100").executeQuery(); break;
					case 2: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '어려움' ORDER BY time ASC LIMIT 100").executeQuery(); break;
					case 3: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '매우 어려움' ORDER BY time ASC LIMIT 100").executeQuery(); break;
				}
				while(rank.next())
				{
					getRaidRankigByTime();
				}
				cm.sendSimple("많은 참여자들이 모의 전투에 참여하셨습니다. 모의 전투가 성공적으료 종료되면 전투 기록이 자동으로 기록되니 한 번 확인해 보세요.\r\n" + strz.toString());
			break;
		}
	}

	else if(St == 2)
	{
		S2 = S;
		switch(S0)
		{
			case 0: setCustomHP = S2;
				cm.askAcceptDecline("정말로 #r#e"+setDifficulty+"#n 난이도의 모의 전투#k를 몬스터 #b기본 체력의 #e"+setCustomHP+"#n배#k로 설정하여 진행하시겠어요?");
			break;

			case 1: if(!cm.canHold(goods[S1][0]))
				{
					cm.sendOk("인벤토리에 여유 공간이 부족한 것 같네요. 아니면 구매하려는 아이템이 고유 아이템이 아닐까요? (고유장착 아이템과는 아무런 연관이 없습니다.");
					cm.dispose();
					return;
				}
				if(cm.getPlayer().getKeyValue2("BossPoint") < goods[S1][2])
				{
					cm.sendOk("활동 점수가 부족한 것 같네요. 모의 전투를 좀 더 해보시는 것도 좋은 방법이랍니다.");
					cm.dispose();
					return;
				}
				cm.gainItem(goods[S1][0], goods[S1][1]);
				cm.getPlayer().setKeyValue2("BossPoint", cm.getPlayer().getKeyValue2("BossPoint") - goods[S1][2]);
				cm.sendOk("모의 전투에 참여한 당신을 위한 당연한 보상입니다. 언제든지 모의 전투를 즐기러 와주세요. 이번에 #b활동 점수 #e"+Comma(goods[S1][2])+"#n점을 사용#k하셔서 #r#e"+Comma(cm.getPlayer().getKeyValue2("BossPoint"))+"#n점이 남았#k답니다.");
				cm.dispose();
			break;

			case 2: infomationRaidRanks(S2); rank.close(); cm.dispose();
			break;

		}
	}

	else if(St == 3)
	{
		S3 = S;
		switch(S0)
		{
			case 0: if(!cm.getParty())
				{
					cm.sendOk("모의 전투를 진행하려면 파티를 구성해야 합니다.");
					cm.dispose();
					return;
				}
				if(!cm.isLeader())
				{
					cm.sendOk("파티장만에 모의 전투를 진행할 수 있습니다.");
					cm.dispose();
					return;
				}
				if(cm.getParty().getMembers().size() < 1)
				{
					cm.sendOk("모의 전투는 두 명 이상으로 이루어진 파티로만 진행할 수 있습니다.");
					cm.dispose();
					return;
				}
				if(cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(931050800).getAllPlayer().size() > 0)
				{
					cm.sendOk("이미 다른 파티가 모의 전투에 도전중입니다. 다른 채널에서 다시 시도하거나 잠시만 기다려주세요.");
					cm.dispose();
					return;
				}
				em  = cm.getEventManager("Boss");
				eim = em.readyInstance();
				eim.setProperty("Global_StartMap", 931050800 + "");
				eim.setProperty("Global_ExitMap",  180000100 + "");
				eim.setProperty("Global_Stage",    "0");
				eim.setProperty("Global_Level",    setDifficulty);
				eim.setProperty("Global_Bossraid", 1 + "");
				eim.setProperty("Global_Customed", setCustomHP);
				eim.setProperty("Global_mobCount", "0")
				eim.setProperty("Global_Bosstime", System.currentTimeMillis());
				eim.setProperty("Global_checkStr", getNow());
				eim.setProperty("Global_checkEnd", 0);
				eim.registerParty(cm.getParty(), cm.getMap());
				cm.dispose();
			break;

			case 1:
			break;
		}
	}
}


function infomationRaidRanks(i)
{
	rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime WHERE id = ?")
	rank.setString(1, i);
	rank = rank.executeQuery();
	strz = new StringBuilder();
	trys = false;
	while(rank.next())
	{
		trys = true;
		bgin = rank.getString("bgin").split("-");
		ends = rank.getString("ends").split("-");
		mems = rank.getString("pmem").split(":");
		list = "";
		for(i = 1; i < mems.length; i++)
		{
			if(i == 1)
			{
				list += mems[1];
			}
			else
			{
				list += "," + mems[i];
			}
		}

		inzz = rank.getInt("time");
		mins = new Number(inzz/60);
		mins = mins.toFixed(0);
		secs = new Number(inzz%60);
		secs = secs.toFixed(0);	
	
		if(mins < 10)
		{
			mins = 0 + mins;
		}
	
		if(secs < 10)
		{
			secs = 0 + secs;
		}
	
		strz.append("　　　　　　　　 #e모의 전투 분석 기록#n 　　　　　　　　\r\n\r\n")
		strz.append("　　　　　　　　　　　　　　　　　　 #fs11#기록 담당 : #b문 교수#k#fs11#\r\n")
		strz.append("#r< I. 전투 시각 기록 자료 >#k\r\n")
		strz.append(" #e·#n 시작 시각 : ").append(""+bgin[0]+"년 "+bgin[1]+"월 "+bgin[2]+"일 "+bgin[3]+"시 "+bgin[4]+"분 "+bgin[5]+"초\r\n")
		strz.append(" #e·#n 종료 시각 : ").append(""+ends[0]+"년 "+ends[1]+"월 "+ends[2]+"일 "+ends[3]+"시 "+ends[4]+"분 "+ends[5]+"초\r\n")
		strz.append(" #e·#n 소요 시간 : "+mins+"분 "+secs+"초\r\n\r\n")
		strz.append("#r< II. 전투 스타일 기록 자료 >#k\r\n")
		strz.append(" #e·#n 선택 난이도 : ").append(rank.getString("diff")).append("\r\n")
		strz.append(" #e·#n 커스텀 체력 : 최대 체력의 ").append(rank.getString("rate")).append("00%\r\n\r\n")
		strz.append("#r< III. 전투 참여자 기록 자료 >#k\r\n")
		strz.append(" #e·#n 파티장 : ").append(rank.getString("name")).append("\r\n")
		strz.append(" #e·#n 파티원 : "+list+"\r\n")

	}
	if(trys)
	{
		cm.sendOk(strz.toString());
	}
	else
	{
		cm.dispose();
	}
}

function getRaidRankigByTime()
{
	nums++;
	strz.append("#fn돋움체##fs11#")
	strz.append("#L"+rank.getInt("id")+"#")
	if(nums == 1)
	{
	}
	if(nums < 10)
	{
		strz.append("#Cgray#").append(Integer(0)+0).append("#b#e").append(Integer(nums))
	}
	else if(nums >= 10 && nums < 100)
	{
		strz.append("#Cgray#").append(Integer(0)).append("#b#e").append(Integer(nums))
	}
	else
	{
		strz.append("#b#e").append(Integer(nums))
	}
	strz.append("위#n#k ")

	inzz = rank.getInt("time");
	mins = new Number(inzz/60);
	mins = Math.floor(mins);
	secs = new Number(inzz%60);
	secs = secs.toFixed(0);

	if(mins < 10)
	{
		mins = 0 + mins;
	}

	if(secs < 10)
	{
		secs = 0 + secs;
	}
	strz.append("("+mins+"분 "+secs+"초) #b#fn돋움#")
	strz.append(rank.getString("name")).append("#k (#d파티원 #e").append(Integer(rank.getInt("size"))).append("#n명#k, #r체력 #e").append(Integer(rank.getInt("rate"))).append("#n배#k)\r\n")
}
