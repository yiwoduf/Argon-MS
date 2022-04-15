function start()
{
	St = -1;
	action(1, 0, 0);
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
		cm.sendSimple("#e<����: ����>#n\r\n ���� óġ�ϰ�, �ƽ����� ������ �ع��� �̷ﳾ �غ�� �Ǽ̽��ϱ�? �ٸ� ������ �ִ� ��Ƽ���� �ִٸ�, ��� ���ּ���.\r\n\r\n#b"
			+ "#L0#<����: ����> ������ ��û�Ѵ�.#l");
	}

	else if(St == 1)
	{
		cm.sendSimple("#e<����: ����>#n\r\n���Ͻô� ��带 �������ּ���.\r\n\r\n"
			+ "#L0#�븻 ��� (���� 120 �̻�)#l\r\n"
			+ "#L1#�ϵ� ��� (���� 170 �̻�)#l\r\n");
	}

	else if(St == 2)
	{
		levelType = S;
		partyPass = true;
		partyMany = 0;
		switch(levelType)
		{
			case 1:
			setMap = 262031100;
			setLevel = 170;
			break;

			default:
			setMap = 262030100;
			setLevel = 120;
			break;
		}

		if(cm.getParty() == null)
		{
			cm.sendOk("��Ƽ�� ������ �� ������ �ּ���.");
			cm.dispose();
			return;
		}

		if(cm.getPlayerCount(setMap) != 0 || cm.getPlayerCount(Number(setMap + 100)) != 0 || cm.getPlayerCount(Number(setMap + 200)) != 0)
		{
			cm.sendOk("�̹� �������� ���� �����ϰ� �ֽ��ϴ�.\r\n�ٸ� ä���� �̿��� �ּ���.");
			cm.dispose();
			return;
		}

		if(!cm.isLeader())
		{
			cm.sendOk("��Ƽ�常�� ������ ��û�� �� �ֽ��ϴ�.");
			cm.dispose();
			return;
		}

		if(partyPass)
		{
			selStr = "��Ƽ�� �� #b#e";
			for(i = 0; i < cm.getPartyMembers().size(); i++)
			{
				if(cm.getPlayer().getParty().getMembers().get(i).getLevel() < setLevel)
				{
					partyPass = false;
					partyMany++;
					selStr += cm.getPlayer().getParty().getMembers().get(i).getName();
					if(partyMany != cm.getPartyMembers().size())
					{
						selStr += ", ";
					}
				}
			}
			selStr += "#n#k(��)�� ������ �������� �ʾƼ� ������ �� �� �����ϴ�.";
		}

		if(!partyPass)
		{
			cm.sendOk(selStr);
			cm.dispose();
			return;
		}

		em  = cm.getEventManager("BossHillah");
		eim = em.readyInstance();
		eim.setProperty("Global_StartMap", setMap+ "");
		eim.setProperty("Global_ExitMap", 262030000 + "");
		eim.setProperty("Global_RewardMap", 262030000 + "");
		eim.setProperty("Global_Status", 1 + "");
		eim.setProperty("Global_MinPerson", 1 + "");
		eim.setProperty("Global_checkStr", 0);
		eim.setProperty("Global_checkEnd", 0);
		eim.setProperty("Global_Bosstime", 0);
		eim.registerParty(cm.getParty(), cm.getMap());
		cm.dispose();
	}
}