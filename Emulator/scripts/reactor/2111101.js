function act()
{
	rm.changeMusic("Bgm06/FinalFight");
	for (i = 8800103; i < 8800111; i++)
	{
		rm.spawnMonster(i);
	}
	rm.spawnMonster(8800102);
	rm.mapMessage("������ ������ ī���� ������ ��ȯ�˴ϴ�.");
	var em = rm.getPlayer().getEventInstance();
}