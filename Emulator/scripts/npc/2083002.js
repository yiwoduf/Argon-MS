importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
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
		cm.sendYesNo("�� ������ �����ڴ°�? �������� ���� ���� ó������ �ٽ� �����ؾ� �Ѵٳ�.");
	}

	else if(St == 1)
	{
		if(!cm.getParty() || !cm.isLeader())
		{
			cm.sendOK("��Ƽ�常�� �� �� �ִٳ�. ��Ƽ��� �� �� �����غ��Գ�.");
			cm.dispose();
			return;
		}
		cm.dispose();
		em = cm.getPlayer().getEventInstance();
		it = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
		if (em != null)
			em.unregisterAll();
		while(it.hasNext())
		{
			chr = it.next();
			if (em == null)
				cm.warp(120043000);
			else
				chr.warp(Number(em.getProperty("Global_ExitMap")));
		}
	}
}