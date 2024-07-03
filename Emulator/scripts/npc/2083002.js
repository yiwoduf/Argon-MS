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
		cm.sendYesNo("이 곳에서 나가겠는가? 다음번에 들어올 때는 처음부터 다시 도전해야 한다네.");
	}

	else if(St == 1)
	{
		if(!cm.getParty() || !cm.isLeader())
		{
			cm.sendOK("파티장만이 할 수 있다네. 파티장과 한 번 상의해보게나.");
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