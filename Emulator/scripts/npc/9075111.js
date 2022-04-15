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
	cm.sendSimple("������ 120 �̻��̰� ���Ǹ� ���� �ڶ�� ������ ���������� ������ �� �� �־��. �׷� ���� �� �� �غ��ô� ���� ���� �� ���׿�.#d\r\n\r\n"
			+ "#fUI/UIWindow2.img/UtilDlgEx/list4#\r\n"
			+ "#L0#(Lv.120) [�������̵�] ���� ���� �����ϱ� (���۰���)#l\r\n\r\n\r\n"
			+ "#fUI/UIWindow2.img/UtilDlgEx/list2#\r\n"
			+ "#L1#���� ���� ���� ������ ������ �����ϱ�#l\r\n"
			+ "#L2#���� ���� ���� �ɷ� ��ŷ Ȯ���ϱ� (�ð���)#l");
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
			case 0: cm.sendSimple("���� ������ �����Ͻðھ��? #b�� #e4#n���� ���� ����#k�� �غ�Ǿ� �ִ�ϴ�. ���Ͻô� ������ ������ ������.\r\n"
				+ "#L0##i3994115##l #L1##i3994116##l #L2##i3994117##l #L3##v03994118##l");
			break;

			case 1: iz = "���� #h #���� #bȰ�� ���� #e"+Comma(cm.getPlayer().getKeyValue2("BossPoint"))+"#n��#k�� ������ ��ó׿�. ��� �������� ������ �̻��� Ȱ�� ������ �ʿ��ϴ�ϴ�.\r\n#b#fs11#"
				for(i = 0; i < goods.length; i++)
				{
					iz += "#L"+ i +"##v"+goods[i][0]+":# #t"+goods[i][0]+"# #e"+Comma(goods[i][1])+"#n�� #r("+Comma(goods[i][2])+"�� �ʿ�)#b\r\n";
				}
				cm.sendSimple(iz);
			break;

			case 2: cm.sendSimple("���� ���� ���� �ɷ��� Ȯ���Ͻðھ��? #b�� #e4#n���� ���� ����#k�� �غ�Ǿ� �ִ�ϴ�. ���Ͻô� ������ ������ ������.\r\n"
				+ "#L0##i3994115##l #L1##i3994116##l #L2##i3994117##l #L3##v03994118##l");
			break;
		}
	}

	else if(St == 1)
	{
		S1 = S;
		switch(S0)
		{
			case 0: setDifficulty = (S == 0) ? "����" : (S == 1) ? "����" : (S == 2) ? "�����" : "�ſ� �����";
				setMinimumHps = (S == 0) ? 1  : (S == 1) ? 4  : (S == 2) ? 8  : 16
				setMaximumHps = (S == 0) ? 16 : (S == 1) ? 32 : (S == 2) ? 64 : 128
				cm.sendGetNumber("#r#e"+setDifficulty+"#n ���̵��� ���� ����#k�� �����ϼ̽��ϴ�. ���� ������ �����ϴ� ������ ü���� �������ּ���. #b�ּ� #e"+setMinimumHps+"#n�� ���� �ִ� #e"+setMaximumHps+"#n��#k���� ������ �����մϴ�.", setMinimumHps, setMinimumHps, setMaximumHps);
			break;

			case 1: cm.sendYesNo("#b#v"+goods[S1][0]+":# #t"+goods[S1][0]+"##k �������� �����Ѱ� �����Ű���? #b#e"+Comma(goods[S1][1])+"#n��#k�� ���� �� �ְ� #bȰ�� ���� #e"+Comma(goods[S1][2])+"#n��#k�� �����˴ϴ�.");
			break;

			case 2: strz = new StringBuilder();
				switch(S1)
				{
					case 0: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '����' ORDER BY time ASC LIMIT 100").executeQuery(); break;
					case 1: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '����' ORDER BY time ASC LIMIT 100").executeQuery(); break;
					case 2: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '�����' ORDER BY time ASC LIMIT 100").executeQuery(); break;
					case 3: rank = MYSQL.getConnection().prepareStatement("SELECT * FROM bossraidtime where diff = '�ſ� �����' ORDER BY time ASC LIMIT 100").executeQuery(); break;
				}
				while(rank.next())
				{
					getRaidRankigByTime();
				}
				cm.sendSimple("���� �����ڵ��� ���� ������ �����ϼ̽��ϴ�. ���� ������ ���������� ����Ǹ� ���� ����� �ڵ����� ��ϵǴ� �� �� Ȯ���� ������.\r\n" + strz.toString());
			break;
		}
	}

	else if(St == 2)
	{
		S2 = S;
		switch(S0)
		{
			case 0: setCustomHP = S2;
				cm.askAcceptDecline("������ #r#e"+setDifficulty+"#n ���̵��� ���� ����#k�� ���� #b�⺻ ü���� #e"+setCustomHP+"#n��#k�� �����Ͽ� �����Ͻðھ��?");
			break;

			case 1: if(!cm.canHold(goods[S1][0]))
				{
					cm.sendOk("�κ��丮�� ���� ������ ������ �� ���׿�. �ƴϸ� �����Ϸ��� �������� ���� �������� �ƴұ��? (�������� �����۰��� �ƹ��� ������ �����ϴ�.");
					cm.dispose();
					return;
				}
				if(cm.getPlayer().getKeyValue2("BossPoint") < goods[S1][2])
				{
					cm.sendOk("Ȱ�� ������ ������ �� ���׿�. ���� ������ �� �� �غ��ô� �͵� ���� ����̶��ϴ�.");
					cm.dispose();
					return;
				}
				cm.gainItem(goods[S1][0], goods[S1][1]);
				cm.getPlayer().setKeyValue2("BossPoint", cm.getPlayer().getKeyValue2("BossPoint") - goods[S1][2]);
				cm.sendOk("���� ������ ������ ����� ���� �翬�� �����Դϴ�. �������� ���� ������ ��ⷯ ���ּ���. �̹��� #bȰ�� ���� #e"+Comma(goods[S1][2])+"#n���� ���#k�ϼż� #r#e"+Comma(cm.getPlayer().getKeyValue2("BossPoint"))+"#n���� ����#k��ϴ�.");
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
					cm.sendOk("���� ������ �����Ϸ��� ��Ƽ�� �����ؾ� �մϴ�.");
					cm.dispose();
					return;
				}
				if(!cm.isLeader())
				{
					cm.sendOk("��Ƽ�常�� ���� ������ ������ �� �ֽ��ϴ�.");
					cm.dispose();
					return;
				}
				if(cm.getParty().getMembers().size() < 1)
				{
					cm.sendOk("���� ������ �� �� �̻����� �̷���� ��Ƽ�θ� ������ �� �ֽ��ϴ�.");
					cm.dispose();
					return;
				}
				if(cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(931050800).getAllPlayer().size() > 0)
				{
					cm.sendOk("�̹� �ٸ� ��Ƽ�� ���� ������ �������Դϴ�. �ٸ� ä�ο��� �ٽ� �õ��ϰų� ��ø� ��ٷ��ּ���.");
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
	
		strz.append("���������������� #e���� ���� �м� ���#n ����������������\r\n\r\n")
		strz.append("������������������������������������ #fs11#��� ��� : #b�� ����#k#fs11#\r\n")
		strz.append("#r< I. ���� �ð� ��� �ڷ� >#k\r\n")
		strz.append(" #e��#n ���� �ð� : ").append(""+bgin[0]+"�� "+bgin[1]+"�� "+bgin[2]+"�� "+bgin[3]+"�� "+bgin[4]+"�� "+bgin[5]+"��\r\n")
		strz.append(" #e��#n ���� �ð� : ").append(""+ends[0]+"�� "+ends[1]+"�� "+ends[2]+"�� "+ends[3]+"�� "+ends[4]+"�� "+ends[5]+"��\r\n")
		strz.append(" #e��#n �ҿ� �ð� : "+mins+"�� "+secs+"��\r\n\r\n")
		strz.append("#r< II. ���� ��Ÿ�� ��� �ڷ� >#k\r\n")
		strz.append(" #e��#n ���� ���̵� : ").append(rank.getString("diff")).append("\r\n")
		strz.append(" #e��#n Ŀ���� ü�� : �ִ� ü���� ").append(rank.getString("rate")).append("00%\r\n\r\n")
		strz.append("#r< III. ���� ������ ��� �ڷ� >#k\r\n")
		strz.append(" #e��#n ��Ƽ�� : ").append(rank.getString("name")).append("\r\n")
		strz.append(" #e��#n ��Ƽ�� : "+list+"\r\n")

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
	strz.append("#fn����ü##fs11#")
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
	strz.append("��#n#k ")

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
	strz.append("("+mins+"�� "+secs+"��) #b#fn����#")
	strz.append(rank.getString("name")).append("#k (#d��Ƽ�� #e").append(Integer(rank.getInt("size"))).append("#n��#k, #rü�� #e").append(Integer(rank.getInt("rate"))).append("#n��#k)\r\n")
}
