function act()
{
	rm.changeMusic("Bgm06/FinalFight");
	for (i = 8800003; i < 8800011; i++)
	{
		rm.spawnMonster(i);
	}
	rm.spawnMonster(8800002);
	rm.mapMessage("������ ������ ������ ��ȯ�˴ϴ�.");
}



