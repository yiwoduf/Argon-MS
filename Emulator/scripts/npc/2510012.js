importPackage(Packages.client.skills);
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
		selStr = "����� ���� ����ִ� ũ����Ż�� ����� ������ ������ ���� ���ѵ帮�ڽ��ϴ�.\r\n";
		for(i = 80000400; i < 80000417; i++)
		{
			selStr += "#L"+ i + "##b#e#q" + i + "##k#n (" + cm.getPlayer().getSkillLevel(i) + " / #r"+SkillFactory.getSkill(i).getMaxLevel()+"#k)\r\n";
		}
		cm.sendSimple(selStr);
	}

	else if(St == 1)
	{
		itemCrs = 4310129;
		needCrs = [1, 2, 4, 8, 10, 15, 20, 25, 30, 35];
		selType = S;

		cm.sendSimple("��- ������ ������ ���� : #e#r#q"+selType+"##k#n\r\n"
			    + "��- Ȱ���� ������ ���� : #e#r"+cm.getPlayer().getSkillLevel(selType)+"#k#n (�ִ� "+SkillFactory.getSkill(selType).getMaxLevel()+" ����)\r\n"
			    + "��- Ȱ���� �ʿ��� ��� : #t"+itemCrs+"# "+needCrs[cm.getPlayer().getSkillLevel(selType)]+"��\r\n\r\n"
			    + "������ؼ� ������ �۾��� �����ϼ���. �ƹ��͵� ������ ������ ESC�� ���� ������ ���� �й踦 �����մϴ�.\r\n"
			    + "#L1##b������ �����۽��� �ø���#l\r\n"
			    + "#L2##e#r�� ������ ���� �ʱ�ȭ�ϱ� (10,000,000 �޼� �ʿ�)#l\r\n");
	}

	else if(St == 2)
	{
            if (S == 1) {
		if(!checkMaster(selType))
		{
			cm.sendOk("������ ���ȿ��� #e#r�� �̻� ������ �� �����ϴ�.#k#n �� ������ #e#r�ִ� "+SkillFactory.getSkill(selType).getMaxLevel()+"���� ����#k#n�� �� �ֽ��ϴ�.");
			cm.dispose();
			return;
		}
		if(!cm.haveItem(itemCrs, needCrs[cm.getPlayer().getSkillLevel(selType)]))
		{
			cm.sendOk("#t"+itemCrs+"#�� #e#r�����մϴ�.#k#n �� ���ȿ� �����Ϸ��� ��� #e#r#t"+itemCrs+"# "+needCrs[cm.getPlayer().getSkillLevel(selType)]+"���� �ʿ�#k#n�մϴ�.");
			cm.dispose();
			return;
		}
                cm.gainItem(itemCrs, -needCrs[cm.getPlayer().getSkillLevel(selType)]);
		cm.teachSkill(selType, cm.getPlayer().getSkillLevel(selType) + 1, SkillFactory.getSkill(selType).getMaxLevel());
		cm.dispose();
		cm.openNpc(2510012);
		return;
            } else if (S == 2) {
                cm.sendOk("�غ����Դϴ�.");
                cm.dispose();
            }
	}
}

function checkMaster(i)
{
	if(cm.getPlayer().getSkillLevel(i) == SkillFactory.getSkill(i).getMaxLevel())
	{
		return false;
	}
	return true;
}
